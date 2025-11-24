# Movie Night Platform: Comprehensive Rebuild Strategy
## Executive Summary & Architectural Blueprint

**Document Version**: 2.0
**Date**: November 13, 2025
**Prepared By**: Claude AI Analysis
**Status**: Strategic Planning Document

---

## Executive Summary

This document outlines a comprehensive strategy for rebuilding the Movie Night application from the ground up as a production-grade, bleeding-edge modern web platform. While the current prototype demonstrates solid UX design and functional capabilities, it suffers from critical architectural flaws that prevent production deployment, including hardcoded API keys, AI middleware embedded in build tooling, and lack of proper state management infrastructure.

The proposed rebuild strategy leverages modern full-stack frameworks, AI-native development patterns, edge computing, and a design-first philosophy centered on minimalism, white space, and calm user experiences. This approach will transform Movie Night from a functional prototype into a scalable, secure, and professionally architected platform capable of supporting thousands of concurrent users while maintaining sub-second response times.

### Key Objectives

1. **Production-Ready Architecture**: Migrate from prototype-grade client-only architecture to enterprise-grade full-stack platform
2. **AI-First Development**: Integrate AI capabilities at every layer - from development workflow to user-facing features
3. **Design Excellence**: Create a best-in-class UI/UX experience emphasizing minimalism, white space, and calm aesthetics
4. **Performance & Scalability**: Achieve <100ms time-to-first-byte (TTFB), score 95+ on Lighthouse, support 10,000+ concurrent users
5. **Security & Compliance**: Implement zero-trust security model, encrypt all sensitive data, achieve SOC 2 compliance readiness

### Strategic Approach

**Phase 1 (Weeks 1-4)**: Foundation - Next.js 15 migration, authentication, database setup, core API layer
**Phase 2 (Weeks 5-8)**: AI Integration - AI-powered search, recommendations, edge function optimization
**Phase 3 (Weeks 9-12)**: Advanced Features - Social features, personalization, analytics, mobile optimization
**Phase 4 (Weeks 13-16)**: Production Hardening - Testing, monitoring, performance optimization, deployment

### Expected Outcomes

- **Performance**: 95+ Lighthouse score across all metrics, <2s page load on 3G networks
- **Scalability**: Support 10,000+ concurrent users with auto-scaling infrastructure
- **Developer Experience**: 10x faster feature development with AI-assisted workflows
- **User Engagement**: 3x increase in session duration through improved UX and personalization
- **Operational Excellence**: 99.9% uptime SLA, <5 minute incident response time

---

## Current State Assessment

### What We're Building From

The existing Movie Night application represents a functional prototype with several notable strengths:

**Strengths**:
- Clean, modern dark theme UI reminiscent of premium streaming platforms
- Functional integration with TMDB API for comprehensive movie data
- AI-powered search ranking using Google Gemini (development environment only)
- Responsive design supporting mobile, tablet, and desktop viewports
- Intuitive user interactions with loading states and toast notifications
- React 19 adoption showing commitment to modern practices

**Critical Flaws Preventing Production Deployment**:

1. **Security Vulnerability** (Application/services/tmdbService.ts:3)
   - TMDB API key hardcoded in source code and committed to version control
   - Immediate key rotation required; compromised key can be extracted from built bundle

2. **Architectural Failure** (Application/vite.config.ts:15-101)
   - AI reranking endpoint implemented as Vite development middleware
   - Core feature non-functional in production builds
   - Demonstrates fundamental misunderstanding of build vs. runtime environments

3. **State Management Chaos** (Application/App.tsx:32-56)
   - 20+ useState declarations in root component
   - Extensive prop drilling across component hierarchy
   - Duplicate watchlist logic in multiple components

4. **No Testing Infrastructure**
   - Zero unit tests, integration tests, or E2E tests
   - No CI/CD pipeline or automated quality gates
   - Manual testing only, high regression risk

5. **Performance Optimization Gaps**
   - No code splitting or lazy loading
   - No image optimization or CDN integration
   - 31KB monolithic CSS file loaded upfront
   - No bundle size analysis or optimization

6. **Production Infrastructure Absent**
   - No backend server or API layer
   - No database for user data or caching
   - No authentication or user management
   - No error tracking or monitoring

### Technical Debt Quantification

Based on static analysis and architectural review:

- **Estimated Refactor Effort**: 320-400 development hours
- **Code Reusability**: ~30% (UI components, type definitions, some business logic)
- **Breaking Changes Required**: Fundamental architecture, state management, API layer, styling system
- **Risk of Incremental Refactor**: HIGH - foundational issues require ground-up rebuild

**Recommendation**: Clean slate rebuild with selective component migration offers better ROI than incremental refactor.

---

## Vision for the Rebuild

### Design Philosophy: Calm Technology

The rebuilt Movie Night platform will embody principles of **calm technology** - computing that informs without overwhelming, enhances without demanding attention. This philosophy manifests through:

**Visual Minimalism**
- Generous white space (or dark space in dark mode) creating breathing room
- Maximum 2-3 accent colors beyond grayscale palette
- Typography-first hierarchy reducing reliance on decorative elements
- Progressive disclosure - show complexity only when needed

**Interaction Design**
- Zero-latency feedback through optimistic updates
- Smooth, physics-based animations (60fps minimum)
- Keyboard-first navigation for power users
- Predictive loading of likely next actions

**Content Strategy**
- Focus-mode reading with distraction-free movie details
- Curated, not overwhelming - smart defaults, progressive options
- Contextual recommendations based on user intent, not just viewing history
- Respectful notifications - important updates only, never promotional

### User Experience Principles

1. **Speed as a Feature**: Every interaction feels instantaneous through prefetching, optimistic updates, and edge caching
2. **Intelligent Defaults**: AI-powered personalization that requires zero explicit configuration
3. **Progressive Enhancement**: Core functionality works without JavaScript; enhanced experience with it
4. **Accessibility First**: WCAG 2.2 AAA compliance, screen reader optimized, keyboard navigable
5. **Responsive Reality**: Not just adapting to screen sizes, but to connection speed, device capability, user context

### Competitive Differentiation

**vs. IMDB**: Cleaner UI, AI-powered discovery, no ads, privacy-first
**vs. Letterboxd**: Simpler onboarding, better search, real-time recommendations
**vs. Netflix/Streaming Apps**: Cross-platform discovery, unbiased recommendations, user data ownership

**Unique Value Propositions**:
- **AI Curator**: Gemini-powered search that understands context and mood, not just keywords
- **Privacy-First**: No tracking, no ads, user data encrypted and exportable
- **Universal Discovery**: Works across all streaming platforms, not siloed to one service
- **Social Done Right**: Opt-in sharing, no algorithmic feed, meaningful connections

---

## Modern Architecture Strategy

### Architecture Overview

The rebuild will adopt a **modern edge-first, full-stack architecture** leveraging:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  Next.js 15 App Router + React Server Components + Streaming    │
│  Tailwind CSS + Framer Motion + Radix UI Primitives             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Edge Function Layer                         │
│  Vercel Edge Functions / Cloudflare Workers                      │
│  AI Inference + Caching + Request Routing                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        Backend Services                          │
│  Next.js API Routes (Node.js runtime)                            │
│  tRPC for type-safe API layer                                    │
│  Redis caching + Rate limiting                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         Data Layer                               │
│  PostgreSQL (Neon/Supabase) - User data, watchlists, metadata   │
│  Redis (Upstash) - Session cache, API response cache            │
│  Cloudflare R2/S3 - User-generated content, image cache         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│  TMDB API - Movie data, images, metadata                        │
│  Google Gemini API - AI-powered ranking and recommendations     │
│  Resend/SendGrid - Transactional email                          │
│  Sentry - Error tracking and performance monitoring             │
└─────────────────────────────────────────────────────────────────┘
```

### Framework Selection: Next.js 15 App Router

**Rationale for Next.js 15**:

1. **React Server Components (RSC)**: Reduce client-side JavaScript by 40-60% through server-side rendering
2. **Streaming SSR**: Progressive page rendering for perceived performance improvements
3. **Edge Runtime Support**: Deploy serverless functions globally for <50ms response times
4. **Built-in Optimization**: Image optimization, font optimization, script optimization out-of-box
5. **Type-Safe Routing**: File-system based routing with TypeScript integration
6. **API Routes**: Integrated backend without separate server infrastructure
7. **Production-Ready**: Battle-tested at scale (Netflix, Hulu, Notion, Linear)

**Alternative Frameworks Considered**:
- **Remix**: Excellent web fundamentals, but smaller ecosystem and less mature edge support
- **Astro**: Great for content-heavy sites, less optimal for dynamic applications
- **SvelteKit**: Impressive performance, smaller ecosystem and talent pool
- **Vite + React Router**: Requires manual backend setup, loses integrated optimizations

**Decision**: Next.js 15 offers the best balance of performance, developer experience, and production readiness.

### Component Architecture

**Layered Component Structure**:

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (platform)/               # Authenticated platform routes
│   │   ├── discover/
│   │   ├── watchlist/
│   │   ├── movie/[id]/
│   │   └── layout.tsx            # Platform shell with nav
│   ├── api/                      # API routes
│   │   ├── trpc/[trpc]/
│   │   └── webhooks/
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/
│   ├── ui/                       # Primitive UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   └── [30+ components]
│   ├── features/                 # Feature-specific components
│   │   ├── movies/
│   │   │   ├── movie-card.tsx
│   │   │   ├── movie-detail.tsx
│   │   │   ├── movie-grid.tsx
│   │   │   └── movie-hero.tsx
│   │   ├── search/
│   │   │   ├── search-bar.tsx
│   │   │   ├── search-filters.tsx
│   │   │   └── search-results.tsx
│   │   ├── watchlist/
│   │   │   ├── watchlist-drawer.tsx
│   │   │   ├── watchlist-item.tsx
│   │   │   └── watchlist-empty-state.tsx
│   │   └── recommendations/
│   │       ├── ai-recommendations.tsx
│   │       └── similar-movies.tsx
│   └── layout/                   # Layout components
│       ├── navbar.tsx
│       ├── footer.tsx
│       └── sidebar.tsx
│
├── lib/                          # Shared utilities
│   ├── api/                      # API clients
│   │   ├── tmdb.ts
│   │   ├── gemini.ts
│   │   └── trpc.ts
│   ├── db/                       # Database
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   └── migrations/
│   ├── auth/                     # Authentication
│   │   ├── config.ts
│   │   ├── session.ts
│   │   └── middleware.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-watchlist.ts
│   │   ├── use-movie-search.ts
│   │   └── use-infinite-scroll.ts
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── validators.ts
│   └── stores/                   # Global state (Zustand)
│       ├── user-store.ts
│       ├── ui-store.ts
│       └── preferences-store.ts
│
└── types/                        # TypeScript definitions
    ├── movie.ts
    ├── user.ts
    ├── api.ts
    └── index.ts
```

### Data Flow & State Management

**State Management Strategy**:

1. **Server State** (React Query / tRPC):
   - Movie data, search results, recommendations
   - Automatic caching, refetching, invalidation
   - Optimistic updates for watchlist operations

2. **Client State** (Zustand):
   - UI state (modal open/closed, sidebar collapsed)
   - User preferences (theme, language, display density)
   - Temporary form state

3. **URL State** (Next.js Router):
   - Search queries, filters, pagination
   - Shareable, bookmarkable states
   - Browser back/forward navigation

4. **Server Components** (RSC):
   - Initial page data fetched server-side
   - No client-side state for static content
   - Streaming for progressive enhancement

**Data Flow Example - Search**:

```typescript
// app/(platform)/discover/page.tsx (Server Component)
export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: { q?: string; genre?: string; year?: string };
}) {
  // Server-side data fetching (no client JavaScript needed)
  const initialMovies = await getMovies(searchParams);

  return (
    <div>
      {/* Client component for interactive search */}
      <SearchBar defaultValue={searchParams.q} />

      {/* Server component streams results */}
      <Suspense fallback={<MovieGridSkeleton />}>
        <MovieGrid initialMovies={initialMovies} filters={searchParams} />
      </Suspense>
    </div>
  );
}

// components/features/search/movie-grid.tsx (Client Component)
'use client';

export function MovieGrid({ initialMovies, filters }) {
  // Client-side state management with React Query
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['movies', filters],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ ...filters, page: pageParam }),
    initialData: { pages: [initialMovies], pageParams: [1] },
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // AI-powered reranking happens client-side for instant feedback
  const rankedMovies = useAIRanking(data.pages.flat(), filters);

  return <div>{/* Render movies with infinite scroll */}</div>;
}
```

### Security Architecture

**Zero-Trust Security Model**:

1. **Authentication** (Clerk or Auth.js):
   - Magic link + OAuth (Google, Apple)
   - JWT tokens with refresh rotation
   - Session management with HTTP-only cookies
   - Rate limiting on auth endpoints

2. **Authorization**:
   - Row-level security (RLS) in database
   - API route protection with middleware
   - Scope-based permissions for future admin features

3. **Data Protection**:
   - All API keys stored in environment variables
   - Secrets encrypted at rest (Vercel/AWS Secrets Manager)
   - Database connections over SSL/TLS
   - HTTPS enforced (HSTS headers)

4. **API Security**:
   - Rate limiting (100 req/min per user, 1000 req/min global)
   - Request validation with Zod schemas
   - CORS configuration for allowed origins
   - CSRF protection on mutating operations

5. **Content Security**:
   - Content Security Policy (CSP) headers
   - XSS prevention through React's JSX escaping
   - SQL injection prevention through parameterized queries
   - Input sanitization for user-generated content

**Security Compliance Roadmap**:
- **Month 1**: SOC 2 Type I preparation
- **Month 3**: GDPR compliance implementation
- **Month 6**: SOC 2 Type II audit
- **Month 12**: ISO 27001 certification consideration

---

## AI-First Development Workflows

### Development Acceleration Through AI

The rebuild process will integrate AI at every stage of development, not just as a user-facing feature:

**1. Code Generation & Scaffolding**

- **AI-Powered Boilerplate**: Use Claude or GPT-4 to generate component templates, API routes, database schemas
- **Type Generation**: Automatic TypeScript type generation from API responses and database schemas
- **Test Generation**: AI-generated unit tests based on component implementation
- **Documentation**: Auto-generated JSDoc comments and README sections

**Example Workflow**:
```bash
# Generate new feature with AI assistant
$ npm run ai:generate feature search-filters

AI: Generating search filters feature...
✓ Created components/features/search/search-filters.tsx
✓ Created components/features/search/search-filters.test.tsx
✓ Created lib/hooks/use-search-filters.ts
✓ Added type definitions to types/search.ts
✓ Generated Storybook story at search-filters.stories.tsx
✓ Updated API route at app/api/search/route.ts
```

**2. Code Review & Quality Assurance**

- **AI Code Review**: Automated PR reviews checking for security vulnerabilities, performance issues, accessibility problems
- **Intelligent Linting**: Context-aware linting rules that understand project architecture
- **Refactoring Suggestions**: AI-powered recommendations for code improvements
- **Bug Detection**: Pattern recognition for common bugs before they reach production

**3. AI-Assisted Testing**

- **Test Case Generation**: AI generates edge cases and test scenarios developers might miss
- **Visual Regression**: AI-powered visual diff detection for UI changes
- **Accessibility Testing**: Automated a11y audits with AI-generated fix suggestions
- **Performance Testing**: AI analyzes performance profiles and suggests optimizations

**4. Documentation & Knowledge Management**

- **Living Documentation**: AI-maintained docs that update automatically with code changes
- **Contextual Help**: In-IDE AI assistant that understands project context
- **Onboarding Automation**: AI-generated onboarding guides for new developers
- **Architecture Decision Records**: AI helps document architectural decisions and trade-offs

### AI-Powered User Features

**1. Intelligent Search & Discovery**

**Current Implementation Problem**: Basic keyword matching, no understanding of user intent

**AI-Enhanced Approach**:
```typescript
// Edge function for sub-100ms AI-powered search
export async function POST(req: Request) {
  const { query, userContext } = await req.json();

  // Step 1: Semantic search expansion (10-20ms)
  // "funny action movies" → ["action", "comedy", "buddy cop", "heist"]
  const expandedQuery = await gemini.expandQuery(query, {
    model: 'gemini-2.5-flash',
    temperature: 0.3,
  });

  // Step 2: Parallel TMDB queries (100-200ms)
  const [genreResults, keywordResults, castResults] = await Promise.all([
    tmdb.discover({ genres: expandedQuery.genres }),
    tmdb.search({ keywords: expandedQuery.keywords }),
    tmdb.search({ people: expandedQuery.people }),
  ]);

  // Step 3: AI reranking based on user preferences (30-50ms)
  const rankedResults = await gemini.rerank({
    candidates: [...genreResults, ...keywordResults, ...castResults],
    userProfile: userContext.watchHistory,
    query: query,
  });

  // Total: ~150-300ms end-to-end
  return Response.json({ results: rankedResults });
}
```

**Advanced Features**:
- **Mood-Based Search**: "I want something that will make me cry" → emotional analysis
- **Contextual Recommendations**: Time of day, weather, recent viewing patterns
- **Natural Language Filters**: "90s sci-fi under 2 hours" → structured query
- **Conversational Search**: Multi-turn dialogue for refining results

**2. Personalized Recommendations**

**Recommendation Engine Architecture**:

```typescript
// lib/ai/recommendation-engine.ts
class RecommendationEngine {
  // Collaborative filtering (user-based)
  async getCollaborativeRecommendations(userId: string): Promise<Movie[]> {
    // Find similar users based on watch history
    const similarUsers = await db.findSimilarUsers(userId, { limit: 50 });

    // Get movies they watched that current user hasn't
    const candidateMovies = await db.getUnwatchedMovies(userId, similarUsers);

    // AI reranking based on user preferences
    return await gemini.rankMovies(candidateMovies, {
      userProfile: await this.getUserProfile(userId),
      strategy: 'collaborative',
    });
  }

  // Content-based filtering (movie attributes)
  async getContentRecommendations(movieId: number): Promise<Movie[]> {
    const movie = await tmdb.getMovieDetails(movieId);

    // Find similar movies by genre, director, cast, themes
    const similar = await tmdb.discover({
      genres: movie.genres,
      people: [movie.director, ...movie.mainCast.slice(0, 3)],
    });

    // AI-powered semantic similarity
    return await gemini.findSimilar(movie, similar, {
      attributes: ['theme', 'tone', 'pacing', 'visual_style'],
    });
  }

  // Hybrid approach with AI orchestration
  async getSmartRecommendations(userId: string): Promise<Movie[]> {
    const [collaborative, trending, seasonal] = await Promise.all([
      this.getCollaborativeRecommendations(userId),
      this.getTrendingRecommendations(),
      this.getSeasonalRecommendations(),
    ]);

    // AI decides optimal mix based on user engagement patterns
    return await gemini.hybridRanking({
      sources: { collaborative, trending, seasonal },
      userId,
      strategy: 'engagement_optimized',
    });
  }
}
```

**3. Smart Notifications & Insights**

- **New Release Alerts**: AI predicts which new releases user will enjoy based on preferences
- **Watch Reminders**: Smart timing based on user's typical viewing patterns
- **Mood Insights**: "You tend to watch comedies on Fridays" with recommendations
- **Collection Suggestions**: "You've watched 8/10 Nolan films - complete the collection?"

**4. AI-Powered Content Generation**

- **Personalized Summaries**: AI-generated movie summaries tailored to user preferences
- **Spoiler-Free Reviews**: AI curates reviews removing spoilers while preserving sentiment
- **Watch Party Recommendations**: AI finds movies that match group preferences
- **Custom Collections**: AI-generated themed collections ("Cozy rainy day movies")

### Edge Computing Strategy

**Why Edge Functions**:

Traditional server architecture:
```
User (Sydney) → Origin Server (US-East) → AI API (US-West) → Response
Latency: ~300ms + ~200ms + ~150ms + ~300ms = ~950ms
```

Edge-first architecture:
```
User (Sydney) → Edge (Sydney) → AI API (Sydney region) → Response
Latency: ~20ms + ~50ms + ~20ms = ~90ms
```

**Edge Function Use Cases**:

1. **AI Inference**: Run lightweight Gemini models at the edge for <50ms responses
2. **Personalization**: User-specific content rendering without round-trip to origin
3. **A/B Testing**: Feature flags and experiments evaluated at edge
4. **Image Optimization**: On-demand image resizing and format conversion
5. **Geo-Specific Content**: Content variations based on user location

**Implementation with Vercel Edge Functions**:

```typescript
// app/api/ai/quick-rank/route.ts
import { gemini } from '@/lib/ai/gemini';

export const runtime = 'edge'; // Deploy to edge network

export async function POST(req: Request) {
  const { movies, query } = await req.json();

  // Runs on Vercel's edge network (300+ locations globally)
  const ranked = await gemini.quickRank(movies, query, {
    maxLatency: 100, // Fail fast if >100ms
    model: 'gemini-2.5-flash-lite', // Lightweight model
  });

  return Response.json({ ranked });
}
```

---

## UI/UX Design Philosophy

### Design System: Calm & Minimalist

**Core Design Principles**:

1. **White Space as First-Class Citizen**
   - Minimum 24px padding on all interactive elements
   - 48px+ spacing between major sections
   - Generous line height (1.6-1.8) for readability
   - Maximum content width: 1400px (eyes shouldn't travel far)

2. **Typography-Driven Hierarchy**
   - Font scaling: 12px, 14px, 16px (body), 20px, 24px, 32px, 48px
   - Maximum 3 font weights: Regular (400), Medium (500), Semibold (600)
   - System font stack for performance: `Inter, -apple-system, BlinkMacSystemFont, ...`

3. **Restrained Color Palette**
   ```css
   /* Light Mode */
   --background: 0 0% 100%;        /* Pure white */
   --foreground: 0 0% 10%;         /* Near black */
   --primary: 210 100% 50%;        /* Vibrant blue */
   --muted: 0 0% 96%;              /* Subtle gray */
   --border: 0 0% 90%;             /* Light border */

   /* Dark Mode */
   --background: 0 0% 8%;          /* Deep charcoal */
   --foreground: 0 0% 98%;         /* Off white */
   --primary: 210 100% 60%;        /* Lighter blue */
   --muted: 0 0% 15%;              /* Dark gray */
   --border: 0 0% 20%;             /* Subtle border */
   ```

4. **Motion with Purpose**
   - All transitions <300ms (perceived as instant)
   - Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural feel
   - Reduce motion for users with `prefers-reduced-motion`
   - Physics-based animations for drag/swipe interactions

5. **Progressive Disclosure**
   - Hide complexity until needed
   - Advanced filters collapsed by default
   - Keyboard shortcuts revealed on ⌘K
   - Settings organized in collapsible sections

### Component Design Strategy

**Radix UI + Tailwind CSS + Framer Motion**:

- **Radix UI**: Unstyled, accessible component primitives (Dialog, Dropdown, Tooltip)
- **Tailwind CSS**: Utility-first styling for rapid, consistent design
- **Framer Motion**: Production-ready animations and gestures
- **shadcn/ui**: Pre-built components combining above libraries

**Example - Movie Card Component**:

```tsx
// components/features/movies/movie-card.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, Play } from 'lucide-react';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movie: Movie) => void;
  priority?: boolean; // For above-fold images
}

export function MovieCard({ movie, onAddToWatchlist, priority = false }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group relative overflow-hidden border-0 bg-muted/50 backdrop-blur">
        {/* Aspect ratio container - prevents layout shift */}
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Action buttons - visible on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Play className="mr-2 h-4 w-4" />
                Watch Now
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onAddToWatchlist(movie)}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title with truncation */}
          <h3 className="font-semibold text-base leading-tight mb-2 line-clamp-1">
            {movie.title}
          </h3>

          {/* Metadata - subtle and compact */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{movie.year}</span>
            <span>•</span>
            <Badge variant="outline" className="font-normal">
              {movie.rating}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

**Design System Documentation**:

All components will be documented in Storybook with:
- Visual examples in light/dark modes
- Interactive props playground
- Accessibility guidelines
- Code snippets for common patterns
- Responsive behavior examples

### Responsive Design Strategy

**Mobile-First Approach**:

```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape, small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
};

// Component adapts at each breakpoint
<div className="
  grid
  grid-cols-2        /* Mobile: 2 columns */
  sm:grid-cols-3     /* Tablet: 3 columns */
  lg:grid-cols-4     /* Laptop: 4 columns */
  xl:grid-cols-5     /* Desktop: 5 columns */
  gap-4 sm:gap-6
">
  {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
</div>
```

**Adaptive Content Strategy**:

- **Mobile** (< 640px): Simplified navigation, stack layouts, larger touch targets
- **Tablet** (640-1024px): Two-column layouts, collapsible sidebars
- **Desktop** (> 1024px): Multi-column layouts, persistent sidebars, keyboard shortcuts

**Performance Budget**:

- **Mobile 3G**: <3s First Contentful Paint, <5s Time to Interactive
- **Desktop**: <1s FCP, <2s TTI
- **All Devices**: Lighthouse score 95+ for Performance, Accessibility, Best Practices, SEO

### Accessibility (a11y) Requirements

**WCAG 2.2 Level AA Compliance Checklist**:

- [ ] All interactive elements keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Focus indicators visible with 3:1 contrast ratio
- [ ] Color contrast 4.5:1 for normal text, 3:1 for large text
- [ ] All images have descriptive alt text
- [ ] Headings follow proper hierarchy (h1 → h2 → h3)
- [ ] Form inputs have associated labels
- [ ] Error messages are descriptive and actionable
- [ ] Skip links for keyboard navigation
- [ ] ARIA labels for icon-only buttons
- [ ] Screen reader announcements for dynamic content
- [ ] Respect `prefers-reduced-motion`
- [ ] Respect `prefers-color-scheme`
- [ ] Support for 200% text scaling without breakage

**Testing Strategy**:
- Automated: axe-core, Lighthouse CI, eslint-plugin-jsx-a11y
- Manual: Screen reader testing (NVDA, VoiceOver), keyboard-only navigation
- User Testing: Accessibility audit with users who have disabilities

---

## Technology Stack Recommendations

### Frontend Stack

**Core Framework**:
- **Next.js 15.0+** - Full-stack React framework with App Router
- **React 19** - Latest React with Server Components and Suspense
- **TypeScript 5.8+** - Type safety and developer experience

**Styling & UI**:
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **shadcn/ui** - Accessible, customizable component library
- **Radix UI** - Unstyled accessible primitives
- **Framer Motion** - Production-ready animations
- **Lucide React** - Consistent icon library

**State Management**:
- **Zustand** - Lightweight client state (UI state, preferences)
- **TanStack Query (React Query)** - Server state management with caching
- **Jotai** - Atomic state management (optional, for complex UI state)

**Form Handling**:
- **React Hook Form** - Performant form library
- **Zod** - Runtime schema validation
- **Conform** - Progressive enhancement for forms

**Data Fetching**:
- **tRPC** - End-to-end type-safe API layer
- **TanStack Query** - Caching, refetching, optimistic updates
- **SWR** - Alternative to React Query for simpler use cases

### Backend Stack

**Runtime & Framework**:
- **Next.js API Routes** - Serverless Node.js runtime
- **Vercel Edge Functions** - Edge runtime for low-latency operations
- **tRPC** - Type-safe API alternative to REST/GraphQL

**Database**:
- **PostgreSQL** - Primary database (Neon or Supabase for serverless Postgres)
- **Prisma** - Type-safe ORM with migrations and introspection
- **Redis (Upstash)** - Caching and session management

**Database Schema** (Prisma):
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  watchlist     WatchlistItem[]
  ratings       Rating[]
  preferences   UserPreferences?
}

model WatchlistItem {
  id        String   @id @default(cuid())
  userId    String
  movieId   Int
  addedAt   DateTime @default(now())
  watched   Boolean  @default(false)
  watchedAt DateTime?

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, movieId])
  @@index([userId])
}

model Rating {
  id        String   @id @default(cuid())
  userId    String
  movieId   Int
  rating    Int      // 1-10
  review    String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, movieId])
  @@index([movieId])
}

model UserPreferences {
  id              String   @id @default(cuid())
  userId          String   @unique
  theme           String   @default("system") // light, dark, system
  language        String   @default("en")
  emailNotifications Boolean @default(true)
  favoriteGenres  Json     // Array of genre IDs

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model MovieCache {
  id          Int      @id // TMDB movie ID
  data        Json     // Cached TMDB response
  cachedAt    DateTime @default(now())
  expiresAt   DateTime

  @@index([expiresAt])
}
```

**Authentication**:
- **Clerk** - Recommended (modern, developer-friendly, includes UI components)
- **Auth.js (NextAuth)** - Alternative (more control, self-hosted friendly)
- **Supabase Auth** - If using Supabase for database

**File Storage**:
- **Cloudflare R2** - S3-compatible, zero egress fees
- **Vercel Blob** - Integrated with Vercel platform
- **Supabase Storage** - If using Supabase ecosystem

### AI & Machine Learning

**AI Services**:
- **Google Gemini 2.5 Flash** - Primary AI for search ranking and recommendations
- **Google Gemini 2.0 Pro** - Advanced features (conversational search, complex reasoning)
- **OpenAI GPT-4o** - Backup/alternative for specific use cases

**AI Infrastructure**:
- **Vercel AI SDK** - Streaming AI responses, edge functions integration
- **LangChain** - AI orchestration for complex workflows
- **Vector Database (Pinecone/Weaviate)** - Semantic search for movie embeddings

**AI Use Cases**:
```typescript
// lib/ai/use-cases.ts

// 1. Query Understanding & Expansion
export async function expandSearchQuery(query: string): Promise<ExpandedQuery> {
  const prompt = `Expand this movie search query into structured filters:
Query: "${query}"

Output JSON:
{
  "genres": [...],
  "keywords": [...],
  "mood": "...",
  "era": "...",
  "themes": [...]
}`;

  const response = await gemini.generateContent(prompt);
  return JSON.parse(response);
}

// 2. Intelligent Reranking
export async function rerankMovies(
  movies: Movie[],
  userQuery: string,
  userHistory: Movie[]
): Promise<Movie[]> {
  const prompt = `Rank these ${movies.length} movies for a user who searched "${userQuery}".
User's watch history includes: ${userHistory.map(m => m.title).join(', ')}

Movies: ${JSON.stringify(movies)}

Return ranked array with scores and reasons.`;

  const response = await gemini.generateContent(prompt, {
    temperature: 0.3, // Lower temperature for consistent ranking
  });

  return parseRankedResults(response);
}

// 3. Personalized Recommendations
export async function generateRecommendations(
  userId: string,
  context: { mood?: string; occasion?: string }
): Promise<Movie[]> {
  const userProfile = await db.getUserProfile(userId);
  const watchHistory = await db.getWatchHistory(userId, { limit: 50 });

  const prompt = `Generate 20 movie recommendations for this user:

Profile:
- Favorite genres: ${userProfile.favoriteGenres.join(', ')}
- Recent watches: ${watchHistory.slice(0, 10).map(m => m.title).join(', ')}
- Context: ${context.mood || 'general'} ${context.occasion || 'watching'}

Requirements:
- Mix of popular and hidden gems
- Diverse range within preferred genres
- Consider recency and critical acclaim

Output: Array of TMDB movie IDs`;

  const response = await gemini.generateContent(prompt);
  const movieIds = JSON.parse(response);

  return await tmdb.getMoviesByIds(movieIds);
}
```

### DevOps & Infrastructure

**Hosting & Deployment**:
- **Vercel** - Recommended (Next.js optimized, excellent DX, edge network)
- **Netlify** - Alternative (good for static sites, edge functions)
- **Cloudflare Pages** - Alternative (best for global edge, lowest cost)

**CI/CD Pipeline**:
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm run test:unit

      - name: Integration tests
        run: npm run test:integration

      - name: Build
        run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-screenshots
          path: test-results/

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        run: npm run lighthouse

      - name: Assert performance budget
        run: node scripts/assert-lighthouse-scores.js

  deploy:
    needs: [quality, e2e, lighthouse]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Monitoring & Observability**:
- **Sentry** - Error tracking and performance monitoring
- **Vercel Analytics** - Web vitals and user analytics
- **PostHog** - Product analytics and feature flags
- **Better Stack (Logtail)** - Log aggregation and alerts

**Performance Monitoring**:
```typescript
// lib/monitoring/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  beforeSend(event, hint) {
    // Filter out non-critical errors
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
      return null;
    }
    return event;
  },
});

// Custom performance monitoring
export function trackPerformance(metric: string, value: number) {
  Sentry.metrics.distribution(metric, value, {
    tags: { page: window.location.pathname },
  });
}
```

**Testing Stack**:
- **Vitest** - Unit and integration testing (faster than Jest)
- **Testing Library** - React component testing
- **Playwright** - E2E testing across browsers
- **MSW (Mock Service Worker)** - API mocking for tests
- **Storybook** - Visual testing and component development

---

## Feature Set & Capabilities

### Core Features (MVP - Week 1-4)

**1. User Authentication & Onboarding**
- Magic link email authentication (passwordless)
- OAuth providers (Google, Apple)
- Onboarding flow: Genre preferences, favorite movies
- Profile management (name, avatar, email preferences)

**2. Movie Discovery**
- Browse popular, top-rated, trending movies
- Search by title with autocomplete
- Filter by genre, year, rating, runtime
- Infinite scroll pagination

**3. Movie Details**
- Comprehensive movie information (plot, cast, crew, ratings)
- Trailer playback (YouTube embed)
- Streaming availability (JustWatch API integration)
- Similar movie recommendations

**4. Personal Watchlist**
- Add/remove movies from watchlist
- Mark as watched
- Sorting options (added date, title, rating, release year)
- Export watchlist as CSV/JSON

**5. AI-Powered Search**
- Natural language query understanding
- AI reranking of search results
- Semantic similarity matching
- Context-aware recommendations

### Advanced Features (Phase 2 - Week 5-8)

**6. Personalized Recommendations**
- Daily personalized movie suggestions
- "Because you watched X" recommendations
- Mood-based recommendations ("feel-good movies")
- Collaborative filtering (similar users)

**7. Advanced Search & Filters**
- Multi-criteria search (genre + year + cast)
- Exclude filters ("not horror")
- Advanced filters (decade, country, language, certification)
- Saved searches and smart collections

**8. Social Features**
- Share watchlist with friends (private link)
- Collaborative watchlists (watch party planning)
- Follow friends and see their activity (opt-in)
- Movie ratings and reviews

**9. Collections & Lists**
- Create custom lists ("Cozy rainy day movies")
- Curated collections by theme
- Follow other users' public lists
- List templates ("Oscar winners", "Cult classics")

**10. Smart Notifications**
- New releases matching preferences
- Movies leaving streaming platforms
- Friend activity (optional)
- Weekly digest of recommendations

### Premium Features (Phase 3 - Week 9-12)

**11. Advanced AI Features**
- Conversational search (ChatGPT-style dialogue)
- AI-generated movie summaries
- "Explain like I'm 5" plot summaries
- Spoiler-free review curation

**12. Analytics & Insights**
- Watch history analytics (genres, directors, actors)
- Viewing patterns and trends
- "Year in Review" summary (Spotify Wrapped style)
- Personalized statistics dashboard

**13. Streaming Integration**
- Direct links to streaming platforms
- Price comparison across services
- "Where to watch" aggregation
- Availability notifications

**14. Offline Support (PWA)**
- Offline watchlist access
- Download movie details for offline viewing
- Background sync when online
- Install as mobile app

**15. Accessibility & Internationalization**
- Multi-language support (English, Spanish, French, German, Japanese)
- Right-to-left (RTL) language support
- High contrast mode
- Screen reader optimizations

### Future Roadmap (Phase 4+ - Month 4+)

**16. Mobile Apps**
- React Native iOS/Android apps
- Shared codebase with web (tRPC, Zustand)
- Native features (push notifications, share sheet)

**17. Social Network Features**
- Activity feed of friends' watches
- Movie discussions and comments
- Watch parties (synchronized viewing)
- Movie clubs and communities

**18. Advanced Recommendation Engine**
- Deep learning-based recommendations
- Hybrid collaborative + content-based filtering
- Real-time preference learning
- A/B testing of recommendation algorithms

**19. Content Creation Tools**
- Create and share movie lists
- Write and publish reviews
- Curate themed collections
- Earn badges and achievements

**20. Platform Integrations**
- Trakt.tv sync
- Letterboxd import/export
- IMDB watchlist import
- Plex/Jellyfin integration

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Project Setup & Authentication**

*Goals*: Set up development environment, deploy infrastructure, implement authentication

*Tasks*:
- [ ] Initialize Next.js 15 project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up Vercel project with environment variables
- [ ] Configure PostgreSQL database (Neon)
- [ ] Set up Prisma ORM with initial schema
- [ ] Implement Clerk authentication
- [ ] Create protected route middleware
- [ ] Design and implement onboarding flow
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Configure Sentry for error tracking

*Deliverables*:
- Deployed authentication system
- Onboarding flow with genre selection
- Protected routes requiring authentication
- CI/CD pipeline running tests on PRs

**Week 2: Core Movie Features**

*Goals*: Implement TMDB integration, movie browsing, and detail pages

*Tasks*:
- [ ] Create TMDB service client with rate limiting
- [ ] Implement movie search endpoint (tRPC)
- [ ] Build movie grid component with infinite scroll
- [ ] Create movie detail page with cast, crew, trailers
- [ ] Implement genre filtering and sorting
- [ ] Add image optimization (Next.js Image)
- [ ] Create skeleton loading states
- [ ] Implement error boundaries and error pages
- [ ] Add SEO meta tags and Open Graph
- [ ] Write unit tests for TMDB service

*Deliverables*:
- Functional movie browsing experience
- Detailed movie pages with comprehensive information
- Optimized image loading with placeholders
- SEO-optimized pages

**Week 3: Watchlist & State Management**

*Goals*: Implement personal watchlist with database persistence

*Tasks*:
- [ ] Create watchlist database schema (Prisma)
- [ ] Implement watchlist CRUD operations (tRPC)
- [ ] Build watchlist UI components
- [ ] Add optimistic updates with React Query
- [ ] Implement watched/unwatched toggle
- [ ] Create watchlist sorting and filtering
- [ ] Add watchlist export (CSV, JSON)
- [ ] Implement client state with Zustand
- [ ] Add toast notifications for watchlist actions
- [ ] Write integration tests for watchlist

*Deliverables*:
- Fully functional personal watchlist
- Real-time updates with optimistic UI
- Persistent storage in PostgreSQL
- Export functionality

**Week 4: Search & Basic AI**

*Goals*: Implement advanced search and basic AI reranking

*Tasks*:
- [ ] Build search bar with autocomplete
- [ ] Create advanced filter UI (genre, year, rating, runtime)
- [ ] Implement multi-criteria search logic
- [ ] Set up Gemini AI client
- [ ] Create AI reranking edge function
- [ ] Implement AI toggle in search UI
- [ ] Add search result caching (Redis)
- [ ] Create saved searches feature
- [ ] Implement search history
- [ ] Performance testing and optimization

*Deliverables*:
- Advanced search with multiple filters
- AI-powered result reranking
- Search result caching for performance
- Saved searches feature

**Phase 1 Milestone**: MVP deployed to production with authentication, movie browsing, watchlist, and AI-powered search.

---

### Phase 2: AI & Personalization (Weeks 5-8)

**Week 5: Recommendation Engine**

*Goals*: Build personalized recommendation system

*Tasks*:
- [ ] Design recommendation algorithm (collaborative + content-based)
- [ ] Create user profile aggregation service
- [ ] Implement "Because you watched X" recommendations
- [ ] Build recommendation UI components
- [ ] Add mood-based recommendation filters
- [ ] Create recommendation caching strategy
- [ ] Implement daily recommendation refresh
- [ ] Add recommendation feedback (thumbs up/down)
- [ ] A/B test recommendation algorithms
- [ ] Monitor recommendation quality metrics

*Deliverables*:
- Personalized daily recommendations
- Similar movie recommendations
- Mood-based discovery feature
- Recommendation quality metrics dashboard

**Week 6: Enhanced AI Features**

*Goals*: Advanced AI-powered features for discovery

*Tasks*:
- [ ] Implement conversational search (multi-turn)
- [ ] Create semantic query expansion
- [ ] Build AI-generated movie summaries
- [ ] Add "movies similar to [description]" feature
- [ ] Implement AI-curated collections
- [ ] Create smart notification system
- [ ] Build preference learning from interactions
- [ ] Add AI explainability ("Why this recommendation?")
- [ ] Implement rate limiting for AI features
- [ ] Monitor AI API costs and optimize

*Deliverables*:
- Conversational search interface
- AI-generated content (summaries, collections)
- Smart notifications for new releases
- Transparent AI recommendations

**Week 7: Social Features Foundation**

*Goals*: Build social features and sharing

*Tasks*:
- [ ] Design social schema (followers, lists, activity)
- [ ] Implement user profiles (public/private)
- [ ] Create shareable watchlist links
- [ ] Build collaborative watchlist feature
- [ ] Implement friend system (follow/unfollow)
- [ ] Create activity feed
- [ ] Add privacy controls
- [ ] Implement list sharing and discovery
- [ ] Build notification system for social actions
- [ ] Add moderation tools

*Deliverables*:
- User profiles with public watchlists
- Collaborative watchlists for groups
- Friend system with activity feeds
- Privacy-first social features

**Week 8: Analytics & Insights**

*Goals*: Provide users with viewing analytics and insights

*Tasks*:
- [ ] Build watch history tracking
- [ ] Create analytics dashboard
- [ ] Implement genre/director/actor statistics
- [ ] Build "Year in Review" feature
- [ ] Create viewing pattern visualizations
- [ ] Add export of analytics data
- [ ] Implement comparison with platform averages
- [ ] Build achievement/badge system
- [ ] Create personalized insights ("You watch more comedies on Fridays")
- [ ] Add data deletion and GDPR compliance

*Deliverables*:
- Comprehensive analytics dashboard
- Year in Review summary
- Personalized viewing insights
- GDPR-compliant data export/deletion

**Phase 2 Milestone**: Full-featured personalization with AI recommendations, social features, and user analytics.

---

### Phase 3: Polish & Scale (Weeks 9-12)

**Week 9: Performance Optimization**

*Goals*: Achieve 95+ Lighthouse scores and optimize Core Web Vitals

*Tasks*:
- [ ] Implement code splitting and lazy loading
- [ ] Optimize bundle size (analyze with webpack-bundle-analyzer)
- [ ] Add virtual scrolling for long lists
- [ ] Implement progressive image loading
- [ ] Set up CDN for static assets
- [ ] Add service worker for offline support
- [ ] Optimize font loading (FOIT/FOUT)
- [ ] Implement request batching and deduplication
- [ ] Add database query optimization
- [ ] Set up Redis caching for hot paths

*Deliverables*:
- Lighthouse score 95+ across all categories
- <100ms TTFB on cached requests
- <2s full page load on 3G
- Optimized database queries (N+1 solved)

**Week 10: Testing & Quality Assurance**

*Goals*: Comprehensive test coverage and quality assurance

*Tasks*:
- [ ] Write unit tests (80%+ coverage)
- [ ] Create integration test suite
- [ ] Implement E2E tests with Playwright
- [ ] Add visual regression testing
- [ ] Set up accessibility testing automation
- [ ] Create performance regression tests
- [ ] Implement load testing (k6 or Artillery)
- [ ] Add API contract testing
- [ ] Create test data factories
- [ ] Document testing best practices

*Deliverables*:
- 80%+ code coverage
- E2E test suite covering critical paths
- Automated accessibility testing
- Load testing report (supports 10k concurrent users)

**Week 11: Mobile Optimization & PWA**

*Goals*: Perfect mobile experience and Progressive Web App

*Tasks*:
- [ ] Optimize mobile layouts and interactions
- [ ] Implement touch gestures (swipe, pinch)
- [ ] Create mobile-specific components
- [ ] Build PWA with offline support
- [ ] Add install prompts (iOS/Android)
- [ ] Implement background sync
- [ ] Optimize for mobile network conditions
- [ ] Add haptic feedback for mobile
- [ ] Test on real devices (iOS/Android)
- [ ] Optimize for mobile performance

*Deliverables*:
- PWA with offline watchlist access
- Installable on iOS/Android
- Mobile-optimized UI/UX
- <3s TTI on mobile 3G

**Week 12: Production Hardening**

*Goals*: Prepare for production launch and scale

*Tasks*:
- [ ] Implement comprehensive error handling
- [ ] Set up monitoring and alerting (Sentry, Vercel)
- [ ] Create admin dashboard
- [ ] Implement rate limiting and DDoS protection
- [ ] Add database backups and disaster recovery
- [ ] Create runbooks for common issues
- [ ] Implement feature flags (PostHog)
- [ ] Set up analytics dashboards
- [ ] Conduct security audit
- [ ] Perform load testing and capacity planning

*Deliverables*:
- Production-ready infrastructure
- Monitoring and alerting system
- Security audit report
- Capacity plan for scaling

**Phase 3 Milestone**: Production-ready application with 95+ Lighthouse score, comprehensive testing, and scalable infrastructure.

---

### Phase 4: Advanced Features (Weeks 13-16)

**Week 13: Streaming Integration**

*Goals*: Integrate with streaming platforms for "where to watch"

*Tasks*:
- [ ] Integrate JustWatch API
- [ ] Build streaming availability UI
- [ ] Add price comparison
- [ ] Implement availability notifications
- [ ] Create streaming service preferences
- [ ] Add direct links to streaming platforms
- [ ] Implement regional availability
- [ ] Build "leaving soon" alerts
- [ ] Add streaming service filters
- [ ] Create streaming analytics

*Deliverables*:
- Comprehensive streaming availability
- Price comparison across services
- Notifications for availability changes
- Regional streaming data

**Week 14: Internationalization**

*Goals*: Multi-language support and global expansion

*Tasks*:
- [ ] Set up i18n infrastructure (next-intl)
- [ ] Translate UI to 5 languages (EN, ES, FR, DE, JA)
- [ ] Implement language detection
- [ ] Add RTL support for Arabic/Hebrew
- [ ] Localize dates, numbers, currency
- [ ] Create translation management workflow
- [ ] Add region-specific content
- [ ] Implement language switcher
- [ ] Test with native speakers
- [ ] Optimize for multi-language SEO

*Deliverables*:
- Support for 5+ languages
- RTL layout support
- Localized content and formatting
- Multi-language SEO optimization

**Week 15: Advanced Admin Tools**

*Goals*: Admin dashboard for platform management

*Tasks*:
- [ ] Build admin authentication and authorization
- [ ] Create user management dashboard
- [ ] Implement content moderation tools
- [ ] Add analytics and reporting
- [ ] Build feature flag management UI
- [ ] Create system health dashboard
- [ ] Implement user support tools
- [ ] Add API usage monitoring
- [ ] Create data export tools
- [ ] Build A/B test management

*Deliverables*:
- Comprehensive admin dashboard
- User and content moderation tools
- System monitoring and analytics
- A/B testing infrastructure

**Week 16: Launch Preparation**

*Goals*: Final testing, documentation, and launch

*Tasks*:
- [ ] Final security audit
- [ ] Penetration testing
- [ ] Performance testing at scale
- [ ] Create user documentation
- [ ] Write API documentation
- [ ] Prepare marketing materials
- [ ] Set up support channels
- [ ] Create launch checklist
- [ ] Conduct soft launch (beta users)
- [ ] Public launch and monitoring

*Deliverables*:
- Security audit passed
- Comprehensive documentation
- Beta testing completed
- Public launch

**Phase 4 Milestone**: Full-featured platform ready for public launch with international support and advanced features.

---

## Implementation Strategy

### Development Workflow

**AI-Assisted Development Process**:

```
1. Feature Planning
   ↓ (AI generates technical spec)

2. Component Scaffolding
   ↓ (AI generates boilerplate code)

3. Implementation
   ↓ (Developer writes business logic with AI assistance)

4. Testing
   ↓ (AI generates test cases)

5. Code Review
   ↓ (AI reviews for bugs, security, performance)

6. Documentation
   ↓ (AI generates docs)

7. Deploy
```

**Example AI-Assisted Workflow**:

```bash
# 1. Generate feature scaffolding
$ npm run ai:feature "movie recommendations"

AI: Generating feature scaffold for "movie recommendations"...
✓ Created app/(platform)/recommendations/page.tsx
✓ Created components/features/recommendations/recommendation-grid.tsx
✓ Created lib/api/recommendations.ts
✓ Created lib/hooks/use-recommendations.ts
✓ Added tRPC router at server/routers/recommendations.ts
✓ Generated types in types/recommendations.ts

# 2. AI generates test cases
$ npm run ai:test components/features/recommendations

AI: Generating tests for recommendation components...
✓ Created recommendation-grid.test.tsx
✓ Generated 12 test cases
✓ Added integration tests

# 3. Run tests
$ npm run test

# 4. AI code review
$ npm run ai:review

AI: Reviewing code changes...
⚠ Performance: recommendation-grid.tsx line 42 - Consider memoizing MovieCard
✓ Security: No issues found
✓ Accessibility: All ARIA labels present
⚠ Best practices: Use Suspense boundary for async recommendations

# 5. Auto-fix issues
$ npm run ai:fix

AI: Applying fixes...
✓ Added React.memo to MovieCard
✓ Wrapped recommendations in Suspense
✓ Updated imports
```

### Code Quality Standards

**Linting & Formatting**:
```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  }
}
```

**Pre-commit Hooks** (Husky + lint-staged):
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "vitest related --run"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

**TypeScript Strict Mode**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Git Workflow

**Branch Strategy**:
- `main` - Production code (auto-deploys to production)
- `develop` - Integration branch (auto-deploys to staging)
- `feature/*` - Feature branches (deploy to preview)
- `fix/*` - Bug fix branches

**Commit Convention** (Conventional Commits):
```
feat: Add AI-powered recommendations
fix: Resolve watchlist sync issue
perf: Optimize image loading
docs: Update API documentation
test: Add E2E tests for search
refactor: Extract movie card component
chore: Update dependencies
```

**Pull Request Process**:
1. Create feature branch from `develop`
2. Implement feature with tests
3. Run `npm run lint` and `npm run type-check`
4. Open PR with description and screenshots
5. AI code review runs automatically
6. Human review from team member
7. Merge to `develop` after approval
8. Automatic deployment to staging
9. QA testing on staging
10. Merge to `main` for production

### Deployment Strategy

**Environment Strategy**:
- **Development** (local): `npm run dev` with `.env.local`
- **Preview** (per PR): Automatic Vercel preview deployments
- **Staging**: `develop` branch → staging.movienight.app
- **Production**: `main` branch → movienight.app

**Environment Variables**:
```bash
# .env.example
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
CLERK_SECRET_KEY=...
GEMINI_API_KEY=...
TMDB_API_KEY=...
SENTRY_DSN=...
NEXT_PUBLIC_APP_URL=https://movienight.app
```

**Deployment Checklist**:
- [ ] All tests passing (unit, integration, E2E)
- [ ] Lighthouse score 95+
- [ ] Security audit passed
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Monitoring and alerts configured
- [ ] Rollback plan documented
- [ ] Changelog updated
- [ ] Stakeholders notified

---

## Risk Management

### Technical Risks

**Risk 1: AI API Costs Exceeding Budget**

*Likelihood*: Medium | *Impact*: High

*Mitigation*:
- Implement aggressive caching (Redis) for AI responses
- Use lightweight models (Gemini Flash) for most operations
- Set hard limits on AI API calls per user
- Monitor costs daily with alerts at 80% budget
- Fall back to non-AI search if quota exceeded

**Risk 2: Database Performance Degradation at Scale**

*Likelihood*: Medium | *Impact*: High

*Mitigation*:
- Design database schema with proper indexes from day 1
- Implement query monitoring (pg_stat_statements)
- Use connection pooling (PgBouncer)
- Set up read replicas for scaling
- Regular query performance audits
- Load testing before production launch

**Risk 3: Third-Party API Failures (TMDB, Gemini)**

*Likelihood*: Low | *Impact*: High

*Mitigation*:
- Implement circuit breakers for external APIs
- Cache all TMDB responses (24-hour TTL)
- Graceful degradation when AI unavailable
- Retry logic with exponential backoff
- Monitor API uptime and latency
- Maintain backup API keys

**Risk 4: Security Vulnerabilities**

*Likelihood*: Medium | *Impact*: Critical

*Mitigation*:
- Security audit before production launch
- Automated dependency scanning (Dependabot)
- Regular penetration testing
- Bug bounty program post-launch
- Incident response plan documented
- Security training for all developers

### Product Risks

**Risk 5: Poor User Adoption**

*Likelihood*: Medium | *Impact*: High

*Mitigation*:
- Conduct user research before building
- Beta testing with target users
- Implement analytics to track engagement
- A/B testing for key features
- Rapid iteration based on feedback
- Clear value proposition and onboarding

**Risk 6: Competitive Pressure**

*Likelihood*: Medium | *Impact*: Medium

*Mitigation*:
- Focus on unique differentiators (AI, privacy, UX)
- Rapid feature development cycle
- Community building and user loyalty
- Network effects through social features
- Continuous innovation

### Operational Risks

**Risk 7: Team Bandwidth Constraints**

*Likelihood*: High | *Impact*: Medium

*Mitigation*:
- Prioritize ruthlessly (MVP first)
- Use AI to accelerate development
- Leverage existing libraries (shadcn/ui, Radix)
- Automate repetitive tasks
- Clear documentation for efficiency

**Risk 8: Infrastructure Costs**

*Likelihood*: Medium | *Impact*: Medium

*Mitigation*:
- Start with generous free tiers (Vercel, Neon, Upstash)
- Monitor costs weekly
- Optimize expensive operations (images, AI)
- Implement usage limits
- Plan for scaling costs in budget

---

## Success Metrics

### Key Performance Indicators (KPIs)

**Product Metrics**:
- **User Acquisition**: 10,000 registered users in first 3 months
- **User Engagement**: 60% weekly active users (WAU/MAU ratio)
- **Session Duration**: Average 8+ minutes per session
- **Feature Adoption**: 70% of users use AI search, 80% maintain watchlist
- **Retention**: 40% day-7 retention, 25% day-30 retention

**Technical Metrics**:
- **Performance**: Lighthouse score 95+ on all pages
- **Availability**: 99.9% uptime (< 45 minutes downtime/month)
- **Response Time**: p95 page load < 2s, p99 < 3s
- **Error Rate**: < 0.1% of requests result in errors
- **Core Web Vitals**: All green (LCP < 2.5s, FID < 100ms, CLS < 0.1)

**Business Metrics** (if monetization considered):
- **Conversion Rate**: 5% free → premium conversion
- **Customer Lifetime Value (LTV)**: $120/user over 2 years
- **Churn Rate**: < 5% monthly churn
- **Net Promoter Score (NPS)**: 40+ (considered excellent)
- **Customer Acquisition Cost (CAC)**: < $15 per user

### Analytics Implementation

**Tracking Plan**:

```typescript
// lib/analytics/events.ts
export const events = {
  // User Events
  user_signup: (method: 'email' | 'google' | 'apple') => ({
    name: 'user_signup',
    properties: { method },
  }),

  user_onboarding_complete: (genres: string[]) => ({
    name: 'user_onboarding_complete',
    properties: { genres, genre_count: genres.length },
  }),

  // Search Events
  search_initiated: (query: string, filters: object) => ({
    name: 'search_initiated',
    properties: { query, filters, has_ai: filters.aiEnabled },
  }),

  search_result_clicked: (movieId: number, position: number, aiRanked: boolean) => ({
    name: 'search_result_clicked',
    properties: { movie_id: movieId, position, ai_ranked: aiRanked },
  }),

  // Watchlist Events
  watchlist_add: (movieId: number, source: string) => ({
    name: 'watchlist_add',
    properties: { movie_id: movieId, source },
  }),

  watchlist_remove: (movieId: number) => ({
    name: 'watchlist_remove',
    properties: { movie_id: movieId },
  }),

  watchlist_mark_watched: (movieId: number, daysInWatchlist: number) => ({
    name: 'watchlist_mark_watched',
    properties: { movie_id: movieId, days_in_watchlist: daysInWatchlist },
  }),

  // Recommendation Events
  recommendation_viewed: (source: string, count: number) => ({
    name: 'recommendation_viewed',
    properties: { source, count },
  }),

  recommendation_clicked: (movieId: number, reason: string) => ({
    name: 'recommendation_clicked',
    properties: { movie_id: movieId, reason },
  }),
};
```

**Analytics Integration**:

```typescript
// lib/analytics/posthog.ts
import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
      capture_pageview: false, // We'll do this manually
    });
  }
}

export function trackEvent(name: string, properties?: object) {
  posthog.capture(name, properties);
}

export function identifyUser(userId: string, traits: object) {
  posthog.identify(userId, traits);
}
```

### A/B Testing Framework

**Feature Flag System** (PostHog):

```typescript
// lib/features/flags.ts
import { useFeatureFlagEnabled } from 'posthog-js/react';

export function useFeatureFlag(flag: string): boolean {
  return useFeatureFlagEnabled(flag) ?? false;
}

// Usage in components
export function SearchBar() {
  const useNewSearchUI = useFeatureFlag('new-search-ui');

  return useNewSearchUI ? <NewSearchBar /> : <OldSearchBar />;
}
```

**A/B Test Examples**:

1. **AI Search Toggle Placement**
   - Variant A: Toggle in search bar
   - Variant B: Toggle in settings
   - Metric: AI feature adoption rate

2. **Recommendation Algorithm**
   - Variant A: Collaborative filtering
   - Variant B: Content-based filtering
   - Variant C: Hybrid approach
   - Metric: Click-through rate on recommendations

3. **Onboarding Flow**
   - Variant A: Genre selection first
   - Variant B: Favorite movies first
   - Variant C: Skip onboarding option
   - Metric: Completion rate, time to first watchlist addition

---

## Conclusion

This comprehensive rebuild strategy transforms Movie Night from a functional prototype into a production-grade, bleeding-edge modern web platform. The approach emphasizes:

**Technical Excellence**:
- Modern full-stack architecture with Next.js 15 and React Server Components
- Edge-first deployment for sub-100ms response times globally
- AI integration at every layer for intelligent user experiences
- Type-safe APIs with tRPC and comprehensive testing

**Design Excellence**:
- Calm, minimalist UI emphasizing white space and intentional design
- Accessibility-first approach (WCAG 2.2 AA compliance)
- Responsive, mobile-optimized experience
- Smooth, physics-based animations

**Developer Excellence**:
- AI-accelerated development workflows
- Comprehensive testing and quality assurance
- Modern tooling and developer experience
- Clear documentation and knowledge management

**Product Excellence**:
- User-centric feature set addressing real needs
- Privacy-first, no-tracking approach
- Personalization without creepiness
- Social features that enhance, not overwhelm

### Next Steps

**Immediate Actions** (Week 0):
1. **Project Initialization**
   - Set up GitHub repository
   - Configure development environment
   - Create Vercel project
   - Set up database (Neon PostgreSQL)

2. **Team Alignment**
   - Review and approve technical architecture
   - Assign roles and responsibilities
   - Set up communication channels
   - Schedule weekly sprint planning

3. **Design System**
   - Create Figma design system
   - Define color palette and typography
   - Design key screens (home, search, movie detail, watchlist)
   - Create component library in Storybook

4. **Infrastructure Setup**
   - Configure CI/CD pipeline
   - Set up monitoring (Sentry)
   - Configure environment variables
   - Test deployment pipeline

**Success Criteria for MVP Launch** (End of Week 4):
- [ ] 1,000+ movies searchable with AI-powered ranking
- [ ] Authentication with Google OAuth working
- [ ] Watchlist functionality with persistence
- [ ] Lighthouse score 95+ on all pages
- [ ] Zero critical security vulnerabilities
- [ ] Response time < 2s on slow 3G
- [ ] Deployed to production with custom domain
- [ ] Documentation complete for all features

**Long-Term Vision**:

Movie Night will evolve from a personal movie discovery tool into a comprehensive platform for film enthusiasts, combining:
- **Discovery**: AI-powered search and recommendations
- **Organization**: Smart watchlists and collections
- **Social**: Community features and shared experiences
- **Insights**: Analytics and personalized statistics
- **Integration**: Seamless connection to streaming platforms

The platform will differentiate through superior UX, respect for user privacy, and intelligent AI features that enhance rather than replace human curation. By focusing on calm technology principles, Movie Night will provide a refreshing alternative to cluttered, ad-heavy competitors.

### Estimated Investment

**Development Time**: 16 weeks (4 months) to full production launch
**Team Size**: 2-3 developers + 1 designer
**Infrastructure Costs** (monthly, estimated):
- Hosting (Vercel Pro): $20/month
- Database (Neon): $0-25/month (scales with usage)
- Redis (Upstash): $0-10/month
- AI API (Gemini): $50-200/month (depends on usage)
- Monitoring (Sentry): $0-26/month
- **Total**: $70-281/month initially, scaling with user growth

**ROI Potential**:
- Premium subscriptions (if implemented): $5-10/month per user
- 1,000 users × 5% conversion × $8/month = $400/month revenue
- Break-even at ~100 paying users
- Significant upside with growth to 10,000+ users

### Final Recommendation

**Proceed with rebuild** using the outlined strategy. The current prototype has validated product-market fit and demonstrated strong UX fundamentals. A ground-up rebuild with modern architecture will:

1. Fix critical security and architectural flaws that prevent production deployment
2. Establish solid foundation for rapid feature development
3. Enable AI-first workflows that accelerate time-to-market
4. Create scalable infrastructure supporting growth to 100,000+ users
5. Deliver best-in-class user experience that drives adoption and retention

The 16-week timeline is aggressive but achievable with AI-assisted development, modern tooling, and focused execution. The investment in proper architecture and infrastructure now will pay dividends in faster feature velocity, lower maintenance costs, and improved user satisfaction.

**The future of Movie Night is bright. Let's build something exceptional.**

---

*End of Report*

*For questions or clarifications, please contact the development team.*
