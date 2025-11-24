# Movie Night New Build

## TMDB API Integration
- Server-only TMDB client reads `TMDB_API_KEY` from environment and never exposes it to the browser.
- Endpoints used: `movie/popular`, `movie/top_rated`, `movie/{id}` with `append_to_response=credits,images,videos,releases`.
- Features:
  - Authentication via `api_key` query param injected on the server
  - Error handling with informative messages
  - Retries with exponential backoff for `429` and `5xx`
  - In-memory LRU caching with TTL
  - Basic rate limiting for outbound requests

## Environment
- Create `new-build/apps/web/.env.local`:
```
TMDB_API_KEY=YOUR_TMDB_API_KEY
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development
- Install: `npm i`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Format: `npm run format`
- Prepare hooks: `npm run prepare`

## Testing
- Unit: `npm run test`
- Coverage: `npm run test:coverage`
- E2E: `npx playwright install --with-deps && npx playwright test`

## Security
- Do not commit secrets. Keep `TMDB_API_KEY` only in env variables.
- Verify the key does not appear in client bundles.