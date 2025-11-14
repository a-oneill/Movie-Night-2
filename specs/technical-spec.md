# Movie Night Rebuild Technical Specification

## Summary
- Rebuild the application as a production-grade, secure, scalable platform.
- Address security, architecture, state management, testing, performance, and styling.

## Key Pain Points
- Security: Hardcoded TMDB API key in `Application/services/tmdbService.ts:3`.
- AI architecture: Rerank endpoint embedded in build tooling (`Application/vite.config.ts:15-101`).
- State management: Excessive local state and prop drilling in `Application/App.tsx:32-56` with duplicated logic.
- File structure: Flat components, single large CSS file, no feature-based organization.
- Testing: No unit, integration, or E2E tests; no CI/CD.
- API layer: Mixed concerns, inconsistent error handling, no abstraction, no retries/caching.
- Type system: Overuse of optional fields, no runtime validation.
- Performance: No code splitting, no lazy routes, no image optimization, heavy global CSS.
- DX: Missing linting, formatting, strict TS config, and storybook.

## Improvement Opportunities
- Secrets management via environment variables; server-side API proxy.
- Full-stack framework with server/runtime separation for AI and data fetching.
- Layered, feature-based architecture with shared libraries.
- Global state via lightweight store and server state via query library.
- Comprehensive testing stack and CI/CD gates.
- API client abstraction with caching, retries, and rate limiting.
- Stronger TypeScript contracts and runtime validation.
- Performance budget, code splitting, lazy loading, image optimization.
- Modern design system and modular styles.

## Architecture Approach
- Framework: Next.js 15 App Router with React Server Components and Streaming.
- State: TanStack Query for server state; Zustand for UI and preferences.
- API: tRPC or typed REST routes in Next.js API; edge function for AI reranking.
- Data: PostgreSQL for user data; Redis for cache; TMDB API for movie data.
- Security: Zero-trust model, environment variables, rate limiting, input validation, CSP.
- Styling: Tailwind CSS with accessible primitives and a documented design system.
- Testing: Vitest + Testing Library, Playwright, MSW; coverage gates in CI.
- Observability: Sentry, analytics events, performance metrics.

## Backward Compatibility
- Migrate `localStorage` keys `movieNight.watchlist` and `movieNight.lastSearch` into new stores.
- Preserve watchlist semantics and previous search contexts.
- Provide data import utilities for existing users.

## Deliverables in This Initiation
- Initial Next.js app scaffold in `new-build/apps/web`.
- Edge API route for reranking placeholder.
- Secure TMDB client using environment variables.
- LocalStorage migration utilities.
- Test setup and smoke tests.
- CI pipeline configuration.
- Initial ADRs and documentation structure.
- Style guide aligned with minimal, calm design principles.

## Milestones
- Foundation: App scaffold, secure clients, tests, CI, ADRs.
- Integration: TMDB browse and detail routes, AI rerank at edge.
- Optimization: Performance budgets, analytics, monitoring.

## Acceptance Criteria
- No hardcoded secrets.
- AI rerank runs in a runtime server context, not build tooling.
- Tests execute locally with coverage targets.
- CI runs type check, lint, tests, and build.
- Style guide documents tokens, components, and usage.