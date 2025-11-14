const BASE_URL = 'https://api.themoviedb.org/3'

type Params = Record<string, string | number | boolean | undefined>

class LRUCache<T> {
  private max: number
  private map: Map<string, { value: T; expiresAt: number }>
  constructor(max = 100) {
    this.max = max
    this.map = new Map()
  }
  get(key: string) {
    const entry = this.map.get(key)
    if (!entry) return undefined
    if (entry.expiresAt < Date.now()) {
      this.map.delete(key)
      return undefined
    }
    this.map.delete(key)
    this.map.set(key, entry)
    return entry.value
  }
  set(key: string, value: T, ttlMs: number) {
    if (this.map.size >= this.max) {
      const first = this.map.keys().next().value
      if (first) this.map.delete(first)
    }
    this.map.set(key, { value, expiresAt: Date.now() + ttlMs })
  }
}

class RateLimiter {
  private intervalMs: number
  private maxRequests: number
  private timestamps: number[]
  constructor(maxRequests: number, intervalMs: number) {
    this.maxRequests = maxRequests
    this.intervalMs = intervalMs
    this.timestamps = []
  }
  async acquire() {
    const now = Date.now()
    this.timestamps = this.timestamps.filter(t => now - t < this.intervalMs)
    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now)
      return
    }
    const waitMs = this.intervalMs - (now - this.timestamps[0])
    await new Promise(r => setTimeout(r, Math.max(waitMs, 0)))
    this.timestamps = this.timestamps.filter(t => Date.now() - t < this.intervalMs)
    this.timestamps.push(Date.now())
  }
}

const cache = new LRUCache<any>(200)
const limiter = new RateLimiter(20, 1000)

function buildUrl(path: string, params: Params, key: string) {
  const url = new URL(`${BASE_URL}/${path}`)
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  })
  url.searchParams.set('api_key', key)
  return url.toString()
}

async function fetchWithRetry(url: string, init: RequestInit, attempts = 3) {
  let lastErr: any
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, init)
      if (res.status === 429 || (res.status >= 500 && res.status <= 599)) {
        const backoff = Math.min(1000 * Math.pow(2, i), 4000) + Math.floor(Math.random() * 250)
        await new Promise(r => setTimeout(r, backoff))
        continue
      }
      return res
    } catch (e) {
      lastErr = e
      const backoff = Math.min(500 * Math.pow(2, i), 3000) + Math.floor(Math.random() * 250)
      await new Promise(r => setTimeout(r, backoff))
    }
  }
  if (lastErr) throw lastErr
  const res = await fetch(url, init)
  return res
}

export async function tmdbGet<T = any>(path: string, params: Params = {}, opts?: { ttlMs?: number }) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') throw new Error('Server-only TMDB client')
  const { TMDB_API_KEY } = await import('@/lib/config/env').then(m => m.getEnv())
  const cacheKey = `${path}?${JSON.stringify(params)}`
  if (opts?.ttlMs) {
    const cached = cache.get(cacheKey)
    if (cached !== undefined) return cached as T
  }
  await limiter.acquire()
  const url = buildUrl(path, params, TMDB_API_KEY)
  const res = await fetchWithRetry(url, { headers: { accept: 'application/json' } })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`TMDB ${res.status} ${res.statusText} ${text}`.trim())
  }
  const data = await res.json()
  if (opts?.ttlMs) cache.set(cacheKey, data, opts.ttlMs)
  return data as T
}