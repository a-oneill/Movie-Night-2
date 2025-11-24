# Movie Night: Production-Grade Rebuild Strategy

## Executive Summary

This document outlines a comprehensive strategy for rebuilding the Movie Night application from scratch as a production-grade, bleeding-edge Web3-enabled platform. The approach emphasizes modern architecture, decentralized technologies, AI-first development workflows, and scalable infrastructure suitable for a deliverable product.

---

## Vision & Scope

### Product Vision
**Movie Night 2.0** - A decentralized, AI-powered movie discovery and social platform where users own their data, share curated watchlists as NFTs, and participate in a token-based recommendation economy.

### Key Differentiators
1. **Web3 Integration**: User-owned watchlists, NFT collections, token incentives
2. **Advanced AI**: Multi-model recommendation system with personalized embeddings
3. **Social Layer**: Share, collaborate, and monetize movie curation
4. **Edge-First Architecture**: Global performance, low latency
5. **Privacy-First**: Zero-knowledge proofs for recommendations without sharing watch history

---

## Technology Stack

### Frontend Layer

#### Core Framework
**Next.js 15 (App Router + Server Components)**

**Why**:
- Server Components reduce bundle size by 40-60%
- Streaming SSR for progressive page loading
- Built-in API routes for backend logic
- Edge runtime support
- Exceptional SEO performance
- Vercel deployment integration

**Alternative Consideration**: **Remix** (if preferring different data loading patterns)

#### UI Framework
**React 19 with Concurrent Features**
- Automatic batching
- Transitions API for loading states
- Suspense for data fetching
- Server Components

#### Styling Architecture
**Tailwind CSS v4 + CVA (Class Variance Authority) + Tailwind Variants**

**Structure**:
```typescript
// Design system with variants
import { cva } from "class-variance-authority";

const button = cva("rounded-lg font-semibold transition-colors", {
  variants: {
    intent: {
      primary: "bg-red-600 hover:bg-red-700 text-white",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
      ghost: "bg-transparent hover:bg-slate-800 text-slate-200"
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "md"
  }
});
```

**Additions**:
- **Radix UI** - Unstyled, accessible components (Dialog, Dropdown, Tooltip)
- **Framer Motion** - Production-grade animations
- **Tailwind CSS v4 oxide engine** - 10x faster builds

#### Type Safety
**TypeScript 5.6+ with Strict Mode**

**Enhanced with**:
- **Zod** - Runtime validation and type inference
- **ts-pattern** - Exhaustive pattern matching
- **Effect-TS** - Functional error handling (alternative to try-catch)

**Example**:
```typescript
import { z } from "zod";

const MovieSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  posterUrl: z.string().url(),
  releaseYear: z.string().regex(/^\d{4}$/),
  rating: z.number().min(0).max(10).optional(),
  genres: z.array(z.string()).min(1)
});

type Movie = z.infer<typeof MovieSchema>;

// Runtime validation
const safeMovie = MovieSchema.safeParse(apiResponse);
if (!safeMovie.success) {
  // Handle validation errors
}
```

#### State Management
**Zustand** - For client state (theme, UI preferences)
**TanStack Query v5** - For server state (movies, watchlists, user data)

**Why not Redux?**
- Zustand: 90% less boilerplate, 3KB vs 20KB, same capabilities
- TanStack Query: Automatic caching, refetching, optimistic updates

**State Architecture**:
```typescript
// Zustand store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  theme: 'dark' | 'light';
  aiCurationEnabled: boolean;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleAICuration: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      aiCurationEnabled: true,
      setTheme: (theme) => set({ theme }),
      toggleAICuration: () => set((state) => ({
        aiCurationEnabled: !state.aiCurationEnabled
      }))
    }),
    { name: 'app-storage' }
  )
);

// TanStack Query for server data
export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieService.getDetails(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}
```

#### Data Fetching
**TanStack Query + Server Actions (Next.js)**

```typescript
// Server action
'use server';

export async function getMovieRecommendations(criteria: SearchCriteria) {
  const movies = await db.movie.findMany({
    where: buildWhereClause(criteria),
    take: 20
  });

  return movies;
}

// Client component
import { getMovieRecommendations } from './actions';

export function SearchResults({ criteria }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['recommendations', criteria],
    queryFn: () => getMovieRecommendations(criteria)
  });

  // ...
}
```

### Backend Layer

#### Framework
**Next.js API Routes + tRPC**

**Why tRPC**:
- End-to-end type safety (no code generation)
- Automatic API documentation
- React Query integration
- 10x faster development vs REST/GraphQL

**Structure**:
```typescript
// server/routers/movie.ts
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const movieRouter = router({
  search: publicProcedure
    .input(z.object({
      genre: z.string().optional(),
      year: z.string().optional(),
      actor: z.string().optional()
    }))
    .query(async ({ input }) => {
      // Type-safe input
      return await searchMovies(input);
    }),

  getById: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await getMovieDetails(input);
    })
});

// Client usage (fully typed!)
const { data } = trpc.movie.search.useQuery({
  genre: 'Action',
  year: '2024'
});
```

#### Database
**PostgreSQL (Neon Serverless) + Prisma ORM**

**Why**:
- Serverless Postgres with auto-scaling
- Built-in connection pooling
- Branching for dev environments
- Prisma provides type-safe queries

**Schema Example**:
```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  address       String    @unique // Wallet address
  email         String?   @unique
  username      String?   @unique
  watchlists    Watchlist[]
  reviews       Review[]
  tokens        Int       @default(0)
  createdAt     DateTime  @default(now())
}

model Movie {
  id                Int       @id
  tmdbId            Int       @unique
  title             String
  posterUrl         String
  releaseYear       String
  genres            String[]
  embeddings        Float[]   // For AI similarity
  watchlistItems    WatchlistItem[]
  reviews           Review[]

  @@index([tmdbId])
  @@index([releaseYear])
}

model Watchlist {
  id          String    @id @default(cuid())
  name        String
  description String?
  isPublic    Boolean   @default(false)
  nftTokenId  String?   @unique // If minted as NFT
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  items       WatchlistItem[]

  @@index([userId])
}

model WatchlistItem {
  id          String    @id @default(cuid())
  watchlistId String
  movieId     Int
  addedAt     DateTime  @default(now())
  notes       String?

  watchlist   Watchlist @relation(fields: [watchlistId], references: [id], onDelete: Cascade)
  movie       Movie     @relation(fields: [movieId], references: [id])

  @@unique([watchlistId, movieId])
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  movieId   Int
  rating    Float
  content   String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  movie     Movie    @relation(fields: [movieId], references: [id])

  @@unique([userId, movieId])
}
```

#### Caching Layer
**Redis (Upstash)**

**Use Cases**:
- API response caching (TMDB responses)
- Rate limiting
- Session storage
- Real-time features (if implemented)

**Example**:
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});

export async function getCachedMovie(tmdbId: number): Promise<Movie | null> {
  const cached = await redis.get<Movie>(`movie:${tmdbId}`);
  if (cached) return cached;

  const movie = await fetchFromTMDB(tmdbId);
  await redis.set(`movie:${tmdbId}`, movie, { ex: 60 * 60 * 24 }); // 24h TTL

  return movie;
}
```

#### API Integration Layer
**Wretch (better fetch) + Retry Logic**

```typescript
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { retry } from 'wretch/middlewares';

const tmdbClient = wretch('https://api.themoviedb.org/3')
  .addon(QueryStringAddon)
  .middlewares([
    retry({
      maxAttempts: 3,
      delayTimer: 1000,
      delayRamp: (delay) => delay * 2
    })
  ])
  .auth(`Bearer ${process.env.TMDB_API_KEY}`);

export const tmdbService = {
  async getMovieDetails(id: number) {
    return tmdbClient
      .url(`/movie/${id}`)
      .query({ append_to_response: 'credits,videos,watch/providers' })
      .get()
      .json<TMDBMovieResponse>();
  }
};
```

### Web3 Layer

#### Blockchain Integration
**Base (Ethereum L2)**

**Why Base**:
- Low gas fees (Optimistic rollup)
- EVM-compatible (use existing Ethereum tools)
- Backed by Coinbase
- Growing ecosystem

**Alternative**: **Polygon PoS** (more established) or **Arbitrum** (lower fees)

#### Smart Contracts
**Solidity 0.8.24 + Foundry (Testing/Deployment)**

**Contracts Needed**:

1. **WatchlistNFT.sol** - ERC-721 for watchlist collections
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WatchlistNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    mapping(uint256 => string) public watchlistData; // IPFS hash

    constructor() ERC721("MovieNight Watchlist", "MNWL") Ownable(msg.sender) {}

    function mintWatchlist(
        address to,
        string memory ipfsHash,
        string memory metadataURI
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        watchlistData[tokenId] = ipfsHash;

        emit WatchlistMinted(to, tokenId, ipfsHash);
        return tokenId;
    }

    event WatchlistMinted(address indexed owner, uint256 indexed tokenId, string ipfsHash);
}
```

2. **CurationToken.sol** - ERC-20 for rewards
```solidity
contract CurationToken is ERC20, Ownable {
    mapping(address => uint256) public reputationScore;

    constructor() ERC20("MovieNight Curation", "CURE") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10**18); // 1M initial supply
    }

    function rewardCurator(address curator, uint256 amount) external onlyOwner {
        _mint(curator, amount);
        reputationScore[curator] += amount / 1e18;
    }
}
```

#### Web3 Client
**Wagmi v2 + Viem + RainbowKit**

```typescript
'use client';

import { WagmiConfig, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  }
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

// Usage in component
import { useAccount, useContractWrite } from 'wagmi';
import { WatchlistNFTABI } from '@/contracts';

export function MintWatchlistButton({ watchlistId }: { watchlistId: string }) {
  const { address } = useAccount();
  const { write, isLoading } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: WatchlistNFTABI,
    functionName: 'mintWatchlist'
  });

  const handleMint = async () => {
    const ipfsHash = await uploadToIPFS(watchlistId);
    write({
      args: [address, ipfsHash, metadataURI]
    });
  };

  return (
    <button onClick={handleMint} disabled={isLoading}>
      {isLoading ? 'Minting...' : 'Mint as NFT'}
    </button>
  );
}
```

#### Decentralized Storage
**IPFS (via Pinata or Web3.Storage)**

**Use Cases**:
- Watchlist metadata
- User-generated content
- NFT metadata

```typescript
import { PinataClient } from '@pinata/sdk';

const pinata = new PinataClient({
  pinataApiKey: process.env.PINATA_API_KEY!,
  pinataSecretApiKey: process.env.PINATA_SECRET_KEY!
});

export async function uploadWatchlistToIPFS(watchlist: Watchlist) {
  const metadata = {
    name: watchlist.name,
    description: watchlist.description,
    movies: watchlist.items.map(item => ({
      tmdbId: item.movieId,
      title: item.movie.title,
      addedAt: item.addedAt
    })),
    createdBy: watchlist.user.address,
    timestamp: Date.now()
  };

  const result = await pinata.pinJSONToIPFS(metadata);
  return result.IpfsHash;
}
```

### AI/ML Layer

#### AI Stack
**Multi-Model Approach**

1. **OpenAI GPT-4o** - Natural language search, personalization
2. **Google Gemini 2.5 Pro** - Context-aware ranking, multimodal analysis
3. **Anthropic Claude 3.5 Sonnet** - Content moderation, review analysis
4. **Local Embeddings** - Sentence Transformers via ONNX Runtime

**Why Multi-Model?**
- Best-of-breed for each task
- Fallback redundancy
- Cost optimization (use smaller models when possible)

#### Vector Database
**Pinecone or Qdrant**

**Use Case**: Semantic movie search

```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const index = pinecone.index('movie-embeddings');

// Index movie with embeddings
export async function indexMovie(movie: Movie, embedding: number[]) {
  await index.upsert([{
    id: String(movie.id),
    values: embedding,
    metadata: {
      title: movie.title,
      genres: movie.genres,
      year: movie.releaseYear
    }
  }]);
}

// Semantic search
export async function semanticSearch(query: string) {
  const queryEmbedding = await generateEmbedding(query);
  const results = await index.query({
    vector: queryEmbedding,
    topK: 20,
    includeMetadata: true
  });

  return results.matches;
}
```

#### AI Integration Pattern
**Vercel AI SDK**

```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function generateRecommendations(userPreferences: string) {
  const result = await streamText({
    model: openai('gpt-4o'),
    system: 'You are a movie recommendation expert.',
    prompt: `Based on these preferences: ${userPreferences}, suggest 5 movies with reasoning.`,
  });

  return result.toAIStream();
}

// Usage in API route
export async function POST(req: Request) {
  const { preferences } = await req.json();
  const stream = await generateRecommendations(preferences);

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
```

### Infrastructure & DevOps

#### Hosting
**Vercel (Frontend + Serverless Functions)**

**Why Vercel**:
- Zero-config Next.js deployment
- Edge network (global CDN)
- Automatic HTTPS
- Preview deployments for PRs
- Serverless functions at edge
- Built-in analytics

**Alternatives**: **Netlify** (similar features) or **Cloudflare Pages** (cheaper edge)

#### Edge Functions
**Vercel Edge Runtime**

**Use Cases**:
- Geolocation-based recommendations
- A/B testing
- Personalization without round-trip to origin
- Rate limiting

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const url = request.nextUrl.clone();

  // Add country to headers for personalized content
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);

  return response;
}

export const config = {
  matcher: '/api/:path*'
};
```

#### Monitoring & Observability
**Sentry** - Error tracking
**Vercel Analytics** - Web vitals, performance
**PostHog** - Product analytics, feature flags
**Better Stack** - Uptime monitoring

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ]
});
```

#### CI/CD
**GitHub Actions + Vercel**

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

### Testing Strategy

#### Unit & Integration Tests
**Vitest + Testing Library**

```typescript
// components/MovieCard.test.tsx
import { render, screen } from '@testing-library/react';
import { MovieCard } from './MovieCard';

describe('MovieCard', () => {
  it('renders movie title and poster', () => {
    const movie = {
      id: 1,
      title: 'Inception',
      posterUrl: 'https://example.com/poster.jpg',
      releaseYear: '2010'
    };

    render(<MovieCard movie={movie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByAltText('Inception poster')).toHaveAttribute('src', movie.posterUrl);
  });

  it('calls onAddToWatchlist when button clicked', async () => {
    const onAdd = vi.fn();
    const movie = { id: 1, title: 'Inception' };

    render(<MovieCard movie={movie} onAddToWatchlist={onAdd} />);

    await userEvent.click(screen.getByRole('button', { name: /add to watchlist/i }));
    expect(onAdd).toHaveBeenCalledWith(movie);
  });
});
```

#### E2E Tests
**Playwright**

```typescript
// e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('user can search for movies and add to watchlist', async ({ page }) => {
  await page.goto('/');

  // Search for action movies
  await page.getByLabel('Genre').selectOption('Action');
  await page.getByRole('button', { name: /search/i }).click();

  // Wait for results
  await expect(page.getByText(/recommended for you/i)).toBeVisible();

  // Add first movie to watchlist
  const firstMovie = page.locator('[data-testid="movie-card"]').first();
  await firstMovie.getByRole('button', { name: /add to watchlist/i }).click();

  // Verify toast notification
  await expect(page.getByText(/added to watchlist/i)).toBeVisible();

  // Navigate to watchlist
  await page.getByRole('button', { name: /watchlist/i }).click();

  // Verify movie appears in watchlist
  await expect(page.locator('[data-testid="watchlist-item"]')).toHaveCount(1);
});
```

#### Visual Regression Tests
**Percy or Chromatic**

```typescript
// Storybook stories with visual testing
import type { Meta, StoryObj } from '@storybook/react';
import { MovieCard } from './MovieCard';

const meta: Meta<typeof MovieCard> = {
  component: MovieCard,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    movie: {
      id: 1,
      title: 'Inception',
      posterUrl: 'https://example.com/poster.jpg',
      releaseYear: '2010'
    }
  }
};

export const InWatchlist: Story = {
  args: {
    ...Default.args,
    isInWatchlist: true
  }
};
```

---

## Advanced Agent Workflow Architecture

### Multi-Agent Development System

**Concept**: Use specialized AI agents to handle different aspects of development, each with dedicated responsibilities and tooling.

#### Agent Roles

**1. Product Agent**
- **Responsibility**: Feature planning, user stories, requirements
- **Tools**: Linear API, Notion API
- **Prompt Template**:
```
You are a product manager for a Web3 movie discovery platform.
Analyze user feedback from [source] and create prioritized user stories.
Format: As a [user type], I want [goal] so that [benefit].
Include acceptance criteria and technical considerations.
```

**2. Architecture Agent**
- **Responsibility**: System design, technology decisions, scalability
- **Tools**: Mermaid diagrams, C4 model, ADR (Architecture Decision Records)
- **Example Output**:
```mermaid
graph TD
    A[Client] -->|HTTPS| B[Next.js Edge]
    B -->|tRPC| C[API Layer]
    C -->|Query| D[(PostgreSQL)]
    C -->|Cache| E[(Redis)]
    C -->|AI| F[OpenAI/Gemini]
    C -->|Web3| G[Base L2]
    G -->|Store| H[IPFS]
```

**3. Implementation Agent (Multiple Specialists)**

**a. Frontend Agent**
- **Responsibility**: Component development, styling, accessibility
- **Tools**: Storybook, Radix UI, Tailwind
- **Context**: Design system docs, component guidelines

**b. Backend Agent**
- **Responsibility**: API endpoints, database queries, business logic
- **Tools**: Prisma, tRPC, Zod
- **Context**: Database schema, API contracts

**c. Web3 Agent**
- **Responsibility**: Smart contract development, blockchain integration
- **Tools**: Foundry, Hardhat, Wagmi
- **Context**: Contract ABIs, blockchain best practices

**d. AI/ML Agent**
- **Responsibility**: Embeddings, recommendation algorithms, prompt engineering
- **Tools**: OpenAI SDK, Pinecone, LangChain
- **Context**: User behavior data, movie metadata

**4. Testing Agent**
- **Responsibility**: Test generation, coverage analysis, regression detection
- **Tools**: Vitest, Playwright, Testing Library
- **Workflow**:
```typescript
// Agent analyzes component and generates tests
async function generateTests(componentPath: string) {
  const code = await readFile(componentPath);
  const prompt = `
    Analyze this React component and generate comprehensive tests:
    ${code}

    Include:
    - Unit tests for all exported functions
    - Integration tests for user interactions
    - Edge case coverage
    - Accessibility tests
  `;

  const tests = await ai.complete(prompt);
  await writeFile(`${componentPath}.test.tsx`, tests);
}
```

**5. Code Review Agent**
- **Responsibility**: Code quality, security, best practices
- **Tools**: ESLint, Prettier, SonarQube integration
- **Checks**:
  - Security vulnerabilities (SQL injection, XSS, hardcoded secrets)
  - Performance issues (unnecessary re-renders, memory leaks)
  - Accessibility violations
  - Code smells and anti-patterns

**6. Documentation Agent**
- **Responsibility**: API docs, component docs, architectural diagrams
- **Tools**: TypeDoc, Storybook, Mermaid
- **Output**: Auto-generated docs from code comments and types

#### Agent Orchestration

**Task Coordination System**

```typescript
// agents/orchestrator.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AgentTask {
  id: string;
  type: 'feature' | 'bug' | 'refactor' | 'docs';
  description: string;
  assignedAgent: string;
  status: 'pending' | 'in_progress' | 'review' | 'complete';
  dependencies: string[];
}

class AgentOrchestrator {
  private tasks: Map<string, AgentTask> = new Map();

  async delegateFeature(feature: string) {
    // Product agent creates user stories
    const stories = await this.runAgent('product', {
      task: 'break_down_feature',
      input: feature
    });

    // Architecture agent designs solution
    const architecture = await this.runAgent('architecture', {
      task: 'design_system',
      input: { feature, stories }
    });

    // Implementation agents work in parallel
    const tasks = await Promise.all([
      this.runAgent('frontend', { task: 'implement_ui', spec: architecture.frontend }),
      this.runAgent('backend', { task: 'implement_api', spec: architecture.backend }),
      this.runAgent('web3', { task: 'implement_contracts', spec: architecture.web3 })
    ]);

    // Testing agent validates
    await this.runAgent('testing', {
      task: 'generate_tests',
      implementations: tasks
    });

    // Review agent checks quality
    const review = await this.runAgent('review', {
      task: 'code_review',
      code: tasks
    });

    return review;
  }

  private async runAgent(agentType: string, context: any) {
    const systemPrompt = this.getAgentPrompt(agentType);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8096,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: JSON.stringify(context)
      }]
    });

    return this.parseAgentOutput(response);
  }

  private getAgentPrompt(agentType: string): string {
    const prompts = {
      product: `You are a senior product manager specializing in Web3 entertainment platforms...`,
      architecture: `You are a principal architect with expertise in distributed systems, Web3, and AI/ML...`,
      frontend: `You are a senior frontend engineer expert in Next.js 15, React 19, TypeScript, and modern CSS...`,
      backend: `You are a backend engineer expert in Node.js, PostgreSQL, Redis, and API design...`,
      web3: `You are a Web3 engineer expert in Solidity, EVM, and blockchain integration...`,
      testing: `You are a QA engineer expert in automated testing, Playwright, and test-driven development...`,
      review: `You are a code reviewer expert in security, performance, and best practices...`
    };

    return prompts[agentType as keyof typeof prompts];
  }
}
```

#### Agent Communication Protocol

**Shared Context Store**
```typescript
// Agents share context via Redis
interface SharedContext {
  projectId: string;
  schema: DatabaseSchema;
  apiContracts: APIContract[];
  designSystem: DesignTokens;
  testCoverage: CoverageReport;
}

class AgentContext {
  private redis: Redis;

  async updateContext(key: string, value: any) {
    await this.redis.hset(`project:${projectId}`, key, JSON.stringify(value));
  }

  async getContext(key: string) {
    const value = await this.redis.hget(`project:${projectId}`, key);
    return value ? JSON.parse(value) : null;
  }
}
```

### Agent-Driven Development Workflow

**Example: Implementing "Mint Watchlist as NFT" Feature**

**1. Product Agent** creates specification:
```markdown
## Feature: Mint Watchlist as NFT

### User Story
As a user with a curated watchlist, I want to mint it as an NFT so that I can own, trade, or showcase my movie collection.

### Acceptance Criteria
- User can click "Mint as NFT" on any watchlist
- System uploads watchlist data to IPFS
- Smart contract mints ERC-721 token
- User pays gas fees via wallet
- NFT appears in user's wallet and profile
- Watchlist shows "Minted" badge

### Technical Requirements
- Wallet connection (RainbowKit)
- IPFS upload (Pinata)
- Smart contract interaction (Wagmi)
- Transaction status UI
```

**2. Architecture Agent** designs solution:
```typescript
{
  "components": [
    "MintWatchlistButton.tsx",
    "MintingModal.tsx",
    "TransactionStatus.tsx"
  ],
  "api_endpoints": [
    "POST /api/watchlist/prepare-mint",
    "POST /api/ipfs/upload"
  ],
  "smart_contracts": [
    "WatchlistNFT.sol (already exists, no changes)"
  ],
  "database_changes": [
    "Add nftTokenId column to Watchlist table",
    "Add Transaction table for tracking mint status"
  ],
  "dependencies": [
    "Watchlist must have at least 1 movie",
    "User must have connected wallet",
    "User must have sufficient ETH for gas"
  ]
}
```

**3. Frontend Agent** implements UI:
```typescript
// Generated by Frontend Agent
'use client';

import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { Button } from '@/components/ui/button';
import { WatchlistNFTABI } from '@/contracts/abis';

export function MintWatchlistButton({ watchlistId }: { watchlistId: string }) {
  const [ipfsHash, setIpfsHash] = useState<string>();

  // Prepare watchlist for minting
  const prepareForMint = async () => {
    const response = await fetch('/api/watchlist/prepare-mint', {
      method: 'POST',
      body: JSON.stringify({ watchlistId })
    });
    const { ipfsHash, metadataURI } = await response.json();
    setIpfsHash(ipfsHash);
    return { ipfsHash, metadataURI };
  };

  // Contract write hook
  const { write, data: txData } = useContractWrite({
    address: process.env.NEXT_PUBLIC_WATCHLIST_NFT_ADDRESS,
    abi: WatchlistNFTABI,
    functionName: 'mintWatchlist'
  });

  // Wait for transaction
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: txData?.hash
  });

  const handleMint = async () => {
    const { ipfsHash, metadataURI } = await prepareForMint();
    write({
      args: [address, ipfsHash, metadataURI]
    });
  };

  return (
    <Button onClick={handleMint} isLoading={isLoading}>
      {isSuccess ? 'Minted!' : 'Mint as NFT'}
    </Button>
  );
}
```

**4. Backend Agent** implements API:
```typescript
// Generated by Backend Agent
import { NextResponse } from 'next/server';
import { uploadToIPFS } from '@/lib/ipfs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  const { watchlistId } = await req.json();

  // Fetch watchlist with movies
  const watchlist = await db.watchlist.findUnique({
    where: { id: watchlistId },
    include: {
      items: {
        include: { movie: true }
      },
      user: true
    }
  });

  if (!watchlist) {
    return NextResponse.json({ error: 'Watchlist not found' }, { status: 404 });
  }

  // Prepare metadata
  const metadata = {
    name: watchlist.name,
    description: watchlist.description,
    image: generateWatchlistPreview(watchlist), // Function to create preview image
    attributes: [
      { trait_type: 'Movies Count', value: watchlist.items.length },
      { trait_type: 'Creator', value: watchlist.user.username },
      { trait_type: 'Created At', value: watchlist.createdAt.toISOString() }
    ],
    movies: watchlist.items.map(item => ({
      title: item.movie.title,
      tmdbId: item.movie.tmdbId,
      addedAt: item.addedAt
    }))
  };

  // Upload to IPFS
  const ipfsHash = await uploadToIPFS(metadata);
  const metadataURI = `ipfs://${ipfsHash}`;

  return NextResponse.json({ ipfsHash, metadataURI });
}
```

**5. Testing Agent** generates tests:
```typescript
// Generated by Testing Agent
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MintWatchlistButton } from './MintWatchlistButton';

// Mock Wagmi hooks
vi.mock('wagmi', () => ({
  useContractWrite: vi.fn(() => ({
    write: vi.fn(),
    data: { hash: '0x123' }
  })),
  useWaitForTransaction: vi.fn(() => ({
    isLoading: false,
    isSuccess: true
  }))
}));

describe('MintWatchlistButton', () => {
  it('uploads to IPFS and calls contract when clicked', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({
        ipfsHash: 'Qm123',
        metadataURI: 'ipfs://Qm123'
      })
    });
    global.fetch = mockFetch;

    render(<MintWatchlistButton watchlistId="watchlist-1" />);

    const button = screen.getByRole('button', { name: /mint as nft/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/watchlist/prepare-mint', {
        method: 'POST',
        body: JSON.stringify({ watchlistId: 'watchlist-1' })
      });
    });

    expect(screen.getByText('Minted!')).toBeInTheDocument();
  });
});
```

**6. Review Agent** performs code review:
```markdown
## Code Review: Mint Watchlist NFT Feature

### ✅ Strengths
- Proper error handling in API route
- Loading states handled in UI
- TypeScript types are correct
- Tests cover main use case

### ⚠️ Issues Found

**Security**
- [ ] CRITICAL: No authentication check in API route - anyone can prepare any watchlist for minting
- [ ] HIGH: No rate limiting on IPFS uploads

**Suggested Fix**:
\`\`\`typescript
// Add auth check
const session = await getServerSession();
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

const watchlist = await db.watchlist.findUnique({
  where: { id: watchlistId, userId: session.user.id } // Ensure ownership
});
\`\`\`

**Performance**
- [ ] MEDIUM: No caching for repeated mint attempts of same watchlist

**UX**
- [ ] LOW: No error message shown to user if IPFS upload fails
- [ ] LOW: Missing estimated gas fee before transaction

### Recommendation
Fix CRITICAL and HIGH issues before merging. MEDIUM and LOW can be addressed in follow-up PR.
```

---

## Project Structure

```
movie-night-v2/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-preview.yml
│       └── deploy-production.yml
│
├── apps/
│   └── web/                    # Next.js application
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   └── signup/
│       │   ├── (main)/
│       │   │   ├── page.tsx
│       │   │   ├── browse/
│       │   │   ├── movie/[id]/
│       │   │   ├── watchlist/
│       │   │   └── profile/
│       │   ├── api/
│       │   │   ├── trpc/[trpc]/
│       │   │   ├── ipfs/
│       │   │   └── webhooks/
│       │   ├── layout.tsx
│       │   └── providers.tsx
│       ├── components/
│       │   ├── ui/             # Radix UI + Tailwind
│       │   ├── features/
│       │   │   ├── movies/
│       │   │   ├── search/
│       │   │   ├── watchlist/
│       │   │   └── web3/
│       │   └── layout/
│       ├── hooks/
│       ├── lib/
│       │   ├── db.ts
│       │   ├── redis.ts
│       │   ├── ipfs.ts
│       │   └── ai/
│       ├── styles/
│       └── types/
│
├── packages/
│   ├── contracts/              # Smart contracts
│   │   ├── src/
│   │   │   ├── WatchlistNFT.sol
│   │   │   └── CurationToken.sol
│   │   ├── test/
│   │   ├── script/
│   │   └── foundry.toml
│   │
│   ├── database/               # Prisma schema
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── src/
│   │       └── client.ts
│   │
│   ├── api/                    # tRPC routers
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   ├── movie.ts
│   │   │   │   ├── watchlist.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── web3.ts
│   │   │   ├── context.ts
│   │   │   └── root.ts
│   │   └── package.json
│   │
│   └── config/                 # Shared configuration
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── prisma/
│   └── seed.ts
│
├── tests/
│   ├── e2e/
│   └── integration/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── guides/
│
├── .env.example
├── .env.local
├── docker-compose.yml          # Local development (Postgres, Redis)
├── package.json
├── turbo.json                  # Turborepo config
└── README.md
```

---

## Environment Configuration

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/movienight"
DIRECT_URL="postgresql://user:password@localhost:5432/movienight"

# Redis
REDIS_URL="redis://localhost:6379"

# TMDB
TMDB_API_KEY="your_tmdb_api_key_here"

# AI Services
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_AI_API_KEY="..."

# Pinecone (Vector DB)
PINECONE_API_KEY="..."
PINECONE_ENVIRONMENT="..."
PINECONE_INDEX_NAME="movie-embeddings"

# IPFS
PINATA_API_KEY="..."
PINATA_SECRET_KEY="..."

# Web3
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="..."
NEXT_PUBLIC_WATCHLIST_NFT_ADDRESS="0x..."
NEXT_PUBLIC_CURATION_TOKEN_ADDRESS="0x..."
NEXT_PUBLIC_BASE_RPC_URL="https://mainnet.base.org"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Monitoring
SENTRY_DSN="..."
NEXT_PUBLIC_POSTHOG_KEY="..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Environment
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Development Workflow

### 1. Local Setup

```bash
# Clone repository
git clone https://github.com/org/movie-night-v2
cd movie-night-v2

# Install dependencies
npm install

# Start local services (Postgres, Redis)
docker-compose up -d

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

### 2. Feature Development Workflow

```bash
# Create feature branch
git checkout -b feature/watchlist-sharing

# Run agent orchestrator to plan feature
npm run agent:plan "Allow users to share watchlists via public link"

# Agents create:
# - User stories (Product Agent)
# - Architecture design (Architecture Agent)
# - Implementation plan (Assigned to specialists)

# Implement feature with agent assistance
npm run agent:implement frontend

# Agent generates components, suggests improvements in real-time

# Run tests
npm run test
npm run test:e2e

# Code review by agent
npm run agent:review

# Create PR
git push origin feature/watchlist-sharing
gh pr create --title "Feature: Watchlist Sharing"
```

### 3. Deployment Pipeline

**Preview Deployments**:
- Every PR gets automatic preview deployment on Vercel
- Database branching with Neon
- Separate Redis instance for testing

**Production Deployment**:
```bash
# Merge to main triggers production deployment
git checkout main
git merge feature/watchlist-sharing
git push origin main

# Vercel automatically:
# 1. Runs build
# 2. Runs database migrations
# 3. Deploys to edge network
# 4. Runs smoke tests
# 5. Notifies team
```

---

## Cost Estimation (Monthly)

**Infrastructure**:
- Vercel Pro: $20/month
- Neon Postgres: $19/month (Scale plan)
- Upstash Redis: $10/month
- IPFS (Pinata): $20/month (100GB)
- Sentry: $26/month (Team plan)
- PostHog: $0 (1M events free)

**AI Services** (depends on usage):
- OpenAI: ~$50-200/month
- Google Gemini: ~$30-100/month
- Pinecone: $70/month (S1 pod)

**Web3**:
- Base gas fees: Variable (~$0.01-0.10 per transaction)
- Smart contract deployment: ~$50-100 (one-time)

**Total Estimated**: **$245-545/month** for moderate usage

**Scaling Considerations**:
- At 100K MAU: ~$1,000-2,000/month
- At 1M MAU: ~$5,000-10,000/month

---

## Key Differentiators from Current App

1. **Production-Ready Architecture**
   - Proper backend with database
   - State management
   - Error tracking
   - Monitoring

2. **Web3 Native**
   - User-owned watchlists
   - NFT collections
   - Token economy

3. **AI-First**
   - Semantic search
   - Personalized recommendations
   - Multi-model approach

4. **Developer Experience**
   - Full type safety (Zod + Prisma + tRPC)
   - Automated testing
   - Agent-assisted development
   - Storybook for components

5. **Scalability**
   - Edge runtime
   - Caching strategies
   - Code splitting
   - Database optimization

6. **Security**
   - No hardcoded secrets
   - Environment-based configuration
   - Rate limiting
   - Input validation

---

## Timeline Estimate

**Phase 1: Foundation (2-3 weeks)**
- Set up Next.js + tRPC + Prisma
- Database schema design
- Authentication system
- Basic UI components
- TMDB integration

**Phase 2: Core Features (3-4 weeks)**
- Movie search and browse
- Watchlist management
- Movie details page
- User profiles
- AI-powered recommendations

**Phase 3: Web3 Integration (2-3 weeks)**
- Smart contract development
- Wallet connection
- NFT minting
- IPFS integration
- Token system

**Phase 4: Polish & Testing (2 weeks)**
- E2E tests
- Performance optimization
- Accessibility audit
- Security audit
- Documentation

**Phase 5: Launch (1 week)**
- Production deployment
- Monitoring setup
- Marketing site
- User onboarding

**Total**: **10-13 weeks** to MVP with dedicated team

---

## Success Metrics

**Technical**:
- Core Web Vitals: All "Good" (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Test coverage: > 80%
- Build time: < 2 minutes
- Error rate: < 0.1%

**Product**:
- User engagement: > 5 watchlist items per user
- NFT minting rate: > 10% of active users
- Retention: > 40% D7 retention
- Performance: < 1s average page load

**Web3**:
- Wallet connection rate: > 30% of users
- NFT minted: > 1,000 in first month
- Smart contract security: 0 critical vulnerabilities

---

## Conclusion

This architecture represents a production-ready, scalable approach to building Movie Night from scratch. By leveraging modern frameworks (Next.js 15), Web3 technologies (Base, IPFS), advanced AI (multi-model approach), and agent-assisted development workflows, the application can evolve from a hobby project to a deliverable product with real user value.

The key advantages of this approach:
- **Bleeding-edge technology** while maintaining stability
- **Web3 integration** that adds genuine value (ownership, monetization)
- **AI-first design** for personalized experiences
- **Agent workflows** for faster, more consistent development
- **Production-grade infrastructure** ready to scale

This is not just a rebuild - it's a complete reimagining of what a movie discovery platform can be in the Web3 era.
