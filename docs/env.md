# Environment Variables

## Required
- `TMDB_API_KEY`: Server-side key used to fetch TMDB data.

## Optional
- `NEXT_PUBLIC_SENTRY_DSN`: Enables Sentry monitoring in client and server.
- `NEXT_PUBLIC_APP_URL`: Base client URL for links; defaults to `http://localhost:3000` in dev.

## Validation
- `lib/config/env.ts` validates required variables and provides typed accessors.