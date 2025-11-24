# Movie Night Rebuild — Executive Strategy

## 1. Situation Overview
Movie Night currently operates as a solid prototype but ships with hardcoded secrets, brittle client-only AI features, monolithic styling, no shared state strategy, and zero production controls. The next iteration must be treated as a greenfield rebuild that preserves the product vision (AI-assisted movie discovery) while replacing the stack, delivery pipelines, and operating model with production-grade foundations.

## 2. Vision & Success Criteria
- **AI-first discovery platform** that provides deeply personalized movie journeys, not just lists.
- **Composable architecture** that separates experience, orchestration, data, and AI layers for independent evolution.
- **Enterprise-ready delivery** with automated testing, security guardrails, and continuous deployment to a global edge.
- **Observability + learning loop** so every interaction feeds the personalization engine and product roadmap.
Success is measured by <2s P95 interactive latency worldwide, <0.1% error budget burn, weekly experiment velocity, and provable security/compliance posture.

## 3. Guiding Principles
1. **AI-native workflows**: treat LLM orchestration, embeddings, and feedback loops as first-class product code.
2. **Server-first React**: render critical paths on the server (Next.js App Router + React Server Components) and hydrate only what the client needs.
3. **Typed contracts everywhere**: shared types from DB → API → UI via tRPC/GraphQL + Zod validation.
4. **Event-driven core**: every meaningful action emits events to Kafka/PubSub for analytics, personalization, and auditing.
5. **Security by default**: zero plaintext secrets, mandatory auth, automated scanning, SAST/DAST in CI.

## 4. Target Architecture (Layered)
1. **Experience Layer**
   - Next.js 15 App Router on Vercel/Cloudflare, leveraging Server Components, Route Handlers, Edge Functions.
   - UI kit built with Tailwind CSS + Radix UI + Framer Motion; design tokens managed through Style Dictionary.
   - Localization via next-intl; theming + accessibility baked into tokens and components.
2. **Experience Orchestration / BFF**
   - tRPC or GraphQL Mesh acting as typed gateway, federating TMDB, internal watchlist service, and AI inference APIs.
   - React Query + Zustand on the client hydrate from this gateway with Suspense-friendly hooks.
3. **Domain Services**
   - **Content Service** (NestJS/Fastify) for TMDB ingestion, caching (Redis/Upstash), and enrichment metadata.
   - **Watchlist & Profiles Service** on Postgres (Neon) via Prisma; supports multi-device sync and collaborative lists.
   - **Recommendation/Audience Service** powered by LangGraph pipelines, orchestrating rerankers (Gemini, GPT-4.1, Cohere) with vector retrieval (Pinecone/Weaviate) and feature store (Feast).
4. **Data & Intelligence Layer**
   - Analytical warehouse (BigQuery or Snowflake) fed through Segment/EventBridge.
   - dbt for transformations, Feature form for ML features, Vertex AI or AWS Bedrock for managed training.
   - Real-time stream via Kafka/Redpanda for watch events, thumbs, completion signals.
5. **Edge & Delivery**
   - CDN (Vercel Edge / Cloudflare) for static assets + image optimization.
   - API Gateway with WAF, rate limiting, JWT validation, and canary deployments (Envoy/Gloo or Vercel Edge Config).

## 5. Recommended Tech Stack
| Layer | Tech Choices | Rationale |
| --- | --- | --- |
| Frontend | Next.js 15, React 19, TypeScript 5.x, Tailwind, Radix UI, Framer Motion, next-intl, Storybook 8, Playwright | Modern SSR/ISR + edge-ready, accessible component primitives, design systems + visual regression |
| Client Data | React Query, Zustand, TanStack Router (if needed), SWR for read-mostly widgets | Declarative caching and lightweight global state without prop drilling |
| API/BFF | tRPC (full-stack TS) or GraphQL Yoga w/ codegen, OpenAPI for external exposure, Zod for validation | Typed contracts + interoperability |
| Services | NestJS or Fastify w/ Elysia, Prisma ORM, Redis, Neon/Postgres, Kafka, Temporal for workflows | Battle-tested Node backend with workflows/retries |
| AI/ML | LangGraph/LangChain, OpenAI GPT-4.1, Gemini 2.0, Cohere, Pinecone vector DB, Weights & Biases for experiment tracking, OpenAI Realtime API for co-pilot features | Multi-model resilience + observability |
| Infra/Ops | Vercel + AWS (EKS or Lambda), Terraform + OpenTofu, GitHub Actions, TurboRepo/Nx, Snyk, Trivy, OpenTelemetry, Sentry, Grafana Cloud | Automated, observable, secure cloud footprint |
| Quality | Vitest, Testing Library, Contract tests (Pact), Playwright E2E, Lighthouse CI, Locust for load | Guarantees regression safety + perf budgets |

## 6. AI-First Feature Strategy
1. **Personalized Discovery Graph**
   - Ingest TMDB + streaming availability + social trends into a knowledge graph (Neo4j) with embeddings updated nightly.
   - User actions emit events that update preference vectors in real time.
2. **Contextual Reranking Pipeline**
   - Base catalog fetch → vector similarity via Pinecone → rerank with Gemini 2.0 + LLM caching → fairness/bias filters.
   - LangGraph orchestrates multi-step reasoning with guardrails (Guardrails AI) and evaluation harness (DeepEval).
3. **Co-pilot Conversational Layer**
   - Streaming assistant using OpenAI Realtime or Vertex Live API, grounded by RAG chunks (TMDB summaries, watchlist, social data).
   - Voice mode via Web Speech API + ElevenLabs/Cartesia for TTS.
4. **Feedback & Experimentation**
   - Thompson Sampling / contextual bandits for hero modules.
   - Automatic labeling of success metrics (completion, add-to-watchlist, dwell) fed back into model training.

## 7. DevEx, Security, and Compliance
- **Monorepo** with TurboRepo/Nx, enforcing module boundaries, shared ESLint/Prettier configs, and code owners.
- **Secure supply chain**: npm provenance, Dependabot, Sigstore signing, SLSA level objectives.
- **Secrets & Config**: Vault or Doppler, per-environment service accounts, short-lived tokens via OIDC.
- **AuthN/Z**: Clerk/Auth0 for user auth, JWT + RLS policies in Postgres, ABAC for admin tooling.
- **Compliance Ready**: Privacy impact assessments, data retention policies, SOC2-ready logging, DPIA automation.

## 8. Delivery Roadmap
1. **Phase 0 – Foundation (Weeks 0-2)**: Define domain model, set up repo, CI/CD, IaC, shared UI tokens, and BFF contracts.
2. **Phase 1 – Core Experience (Weeks 3-8)**: Ship SSR browse/search, watchlist sync, global state, TMDB ingestion w/ caching, baseline analytics.
3. **Phase 2 – AI Orchestration (Weeks 9-14)**: Deploy LangGraph pipelines, personalization graph, conversational assistant MVP, experimentation framework.
4. **Phase 3 – Scale & Hardening (Weeks 15-20)**: Performance budgets, multi-region deploy, chaos testing, accessibility/SEO audits, launch gating w/ feature flags.
5. **Phase 4 – Continuous Evolution (20+ weeks)**: ML retraining cadence, marketplace integrations, native/mobile surfaces, data products.

## 9. Expected Outcomes
- **Resilient platform** ready for millions of requests/day with observability and automated recoveries.
- **AI differentiation** through multi-modal assistants and real-time personalization loops.
- **Faster iteration**: feature flagging, experiment automation, and contract testing shrink release cycles.
- **Security/compliance posture** suitable for enterprise partnerships and future monetization streams.

This blueprint positions Movie Night to evolve from a promising prototype into a flagship AI-native entertainment discovery platform built on modern, composable, and secure foundations.
