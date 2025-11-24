# Troubleshooting

- Hydration mismatch warnings in dev:
  - Use a clean browser session (incognito) to avoid extensions injecting HTML.
  - We suppress harmless `<body>` mismatches using `suppressHydrationWarning`.
- Module not found errors:
  - Ensure path aliases use `@/components/...` and `@/lib/...`.
- Empty grids:
  - Check `.env.local` has a valid `TMDB_API_KEY`.
- E2E failing to start server:
  - Build with `npm run build` and start with `npm run start` before running `npx playwright test`.