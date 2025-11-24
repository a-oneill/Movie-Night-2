import { describe, it, expect } from 'vitest'
import { getPopular, getTopRated, getDetails } from '@/lib/api/tmdb'

describe('tmdb client', () => {
  it('rejects when TMDB_API_KEY is missing for popular', async () => {
    const original = process.env.TMDB_API_KEY
    delete process.env.TMDB_API_KEY
    await expect(getPopular(1)).rejects.toBeTruthy()
    process.env.TMDB_API_KEY = original
  })

  it('rejects when TMDB_API_KEY is missing for top rated', async () => {
    const original = process.env.TMDB_API_KEY
    delete process.env.TMDB_API_KEY
    await expect(getTopRated(1)).rejects.toBeTruthy()
    process.env.TMDB_API_KEY = original
  })

  it('rejects for details when TMDB_API_KEY is missing', async () => {
    const original = process.env.TMDB_API_KEY
    delete process.env.TMDB_API_KEY
    await expect(getDetails(1)).rejects.toBeTruthy()
    process.env.TMDB_API_KEY = original
  })
})