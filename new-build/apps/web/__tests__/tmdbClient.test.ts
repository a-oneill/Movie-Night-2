import { describe, it, expect, vi, beforeEach } from 'vitest'
import { tmdbGet } from '@/lib/api/tmdbClient'

const originalFetch = global.fetch

describe('tmdbClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    process.env.TMDB_API_KEY = 'test_key'
  })

  it('retries on 429 and succeeds', async () => {
    const responses = [
      new Response('', { status: 429 }),
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ]
    let i = 0
    vi.spyOn(global, 'fetch').mockImplementation(async (): Promise<Response> => responses[i++]!)
    const data = await tmdbGet('movie/popular', { language: 'en-US', page: 1 })
    expect((data as any).ok).toBe(true)
    expect((global.fetch as any).mock.calls.length).toBeGreaterThan(1)
  })

  it('caches responses when ttl is set', async () => {
    const res = new Response(JSON.stringify({ value: Math.random() }), { status: 200 })
    const spy = vi.spyOn(global, 'fetch').mockResolvedValue(res)
    const first = await tmdbGet('movie/top_rated', { language: 'en-US', page: 1 }, { ttlMs: 10_000 })
    const second = await tmdbGet('movie/top_rated', { language: 'en-US', page: 1 }, { ttlMs: 10_000 })
    expect(first).toEqual(second)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})