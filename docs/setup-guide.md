# Local Development Setup Guide

## Overview
This guide mirrors production specifications to ensure parity across environments.

## 1. Local Server Configuration
- Runtime: Node.js 20+
- Install dependencies: `cd new-build/apps/web && npm i`
- Start dev server with hot-reload: `npm run dev` (serves `http://localhost:3000`)
- Ports/Base URLs:
  - Dev: `http://localhost:3000`
  - Configure `NEXT_PUBLIC_APP_URL=http://localhost:3000` for client links consistent with production.

## 2. Database Setup (Optional for current frontend-only scope)
- Docker Compose: `new-build/dev/docker-compose.yml` provisions Postgres and Adminer.
- Start DB: `docker compose -f new-build/dev/docker-compose.yml up -d`
- Create schema and seed test data:
  - `psql -h localhost -U dev -d movienight -f new-build/dev/db/schema.sql`
  - `psql -h localhost -U dev -d movienight -f new-build/dev/db/seed.sql`
- Connection string pattern: `postgresql://dev:dev@localhost:5432/movienight` (matches production patterns with env substitution).

## 3. Development Tools and Libraries
- Lint/Format:
  - ESLint: `npm run lint`
  - Prettier: `npm run format`
  - Pre-commit hooks: Husky + lint-staged (auto runs on staged files)
- Debugging/IDE:
  - VS Code: `.vscode/launch.json` for Next.js debugging and `.vscode/extensions.json` for recommended extensions.
- Testing:
  - Unit/Integration: Vitest + Testing Library
  - E2E: Playwright (Chromium/Firefox/WebKit)

## 4. Environment Configuration
- Create `.env.local` in `new-build/apps/web` with:
  - `TMDB_API_KEY=<your_tmdb_key>`
  - `NEXT_PUBLIC_SENTRY_DSN=<optional_sentry_dsn>`
  - `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- Validation: Startup modules validate required env (see `lib/config/env.ts`).
- Sample env: `new-build/.env.example`.

## 5. Testing Capabilities
- Run unit tests: `npm run test`
- Run E2E: `npx playwright install --with-deps && npx playwright test`
- Coverage: `npm run test:coverage` (see Vitest config)

## Start Application Locally
1. `cd new-build/apps/web`
2. `npm i`
3. Create `.env.local`
4. `npm run dev`
5. Open `http://localhost:3000/` and `http://localhost:3000/api/health`

## Verification Checklist
- Dev server shows Ready; health endpoint returns 200 JSON.
- Home page renders; Popular/Top Rated render when TMDB key is set.
- Playwright tests pass across Chromium/Firefox/WebKit.
- Lint passes and pre-commit hook runs on staged changes.

## Troubleshooting
- Blank screen or hydration warning: try external browser/incognito, hard refresh, restart dev server.
- Empty lists: set `TMDB_API_KEY` in `.env.local`.
- Port conflict: change port via `PORT=3000 npm run dev` and update `NEXT_PUBLIC_APP_URL`.

## Version Compatibility Matrix
- Node.js: 20+
- Next.js: 15.5.6
- React: 19.x
- TypeScript: 5.8.x
- Vitest: 2.1.x
- Playwright: 1.48.x