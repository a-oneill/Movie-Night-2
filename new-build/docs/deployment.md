# Deployment Process

## Environments
- Staging: `develop` branch → alias to `${VERCEL_STAGING_DOMAIN}`.
- Production: `main` branch → alias to `${VERCEL_PROD_DOMAIN}` after health check.

## Zero-Downtime (Blue-Green)
1. Deploy preview build.
2. Run health checks on `/api/health`.
3. Alias to production domain only if healthy.
4. Rollback: re-alias to last healthy deployment via Vercel UI or redeploy previous commit.

## Health Checks
- Endpoint: `/api/health` responds with 200 and timestamp.

## Monitoring
- Sentry initialized via `NEXT_PUBLIC_SENTRY_DSN` with traces sample rate.
- Add dashboards for performance, errors, and release tracking.

## Post-Launch Verification
- Open homepage; verify assets load.
- Hit `/api/health` returns 200.
- Browse Popular/Top Rated; confirm data fetches.
- Run Lighthouse; confirm 95+ scores.
- Check Sentry for errors and performance traces.

## Browser Support
- Playwright tests run across Chromium, Firefox, and WebKit in CI to validate compatibility.