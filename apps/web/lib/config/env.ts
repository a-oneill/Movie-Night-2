export type Env = {
  TMDB_API_KEY: string
  NEXT_PUBLIC_SENTRY_DSN: string | undefined
  NEXT_PUBLIC_APP_URL: string
}

export function getEnv(): Env {
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is required in environment')
  }
  return {
    TMDB_API_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }
}