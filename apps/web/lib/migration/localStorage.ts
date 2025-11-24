export type LegacyWatchlistItem = {
  id?: number
  title: string
}

export function readLegacyWatchlist(): LegacyWatchlistItem[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem('movieNight.watchlist')
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    return []
  }
}

export function readLegacyLastSearch(): any {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem('movieNight.lastSearch')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}