# ADR 0001: Architecture Baseline

## Context
- Current prototype mixes build tooling and runtime logic and hardcodes secrets.

## Decision
- Use Next.js 15 App Router for full-stack capabilities with server components and edge functions.
- Use TanStack Query for server state and Zustand for UI state.
- Use typed API routes for TMDB and AI operations with environment-based configuration.
- Use Tailwind CSS and documented design system for consistent UI.

## Consequences
- Clear separation of client, server, and edge runtime.
- Type-safe data flow and predictable state management.
- Improved performance and accessibility.