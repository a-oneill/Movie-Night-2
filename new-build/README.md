# Movie Night 2.0

[![Deployment Status](https://img.shields.io/badge/deployed-vercel-black)](https://web-j7wwy575i-specialprojects001s-projects.vercel.app)

A modern, production-ready movie discovery application built with Next.js 15, featuring an Anthropic-inspired design system.

## Features

- 🎬 Browse popular and top-rated movies from TMDB
- 🎨 Beautiful Anthropic-inspired UI with light/dark mode
- 🔍 Advanced search with AI-powered recommendations (coming soon)
- 📱 Fully responsive design
- ⚡ Server-side rendering for optimal performance
- 🔒 Secure API key management
- ✅ Comprehensive testing with Vitest and Playwright

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS
- **State**: TanStack Query, Zustand
- **Testing**: Vitest, Playwright
- **Monitoring**: Sentry
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Movie-Night-2.git
cd Movie-Night-2
```

2. Install dependencies
```bash
cd apps/web
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your TMDB API key:
```
TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
new-build/
├── apps/
│   └── web/              # Next.js application
│       ├── app/          # App router pages
│       ├── components/   # React components
│       ├── lib/          # Utilities and API clients
│       └── public/       # Static assets
├── docs/                 # Documentation
├── design/              # Design system
└── specs/               # Technical specifications
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

See [deployment docs](./docs/deployment.md) for more details.

## Design System

The application features an Anthropic-inspired design system with:
- Warm ivory color palette (#f0eee6)
- Coral accent color (#ff6b47)
- Clean typography with system fonts
- Generous spacing and minimal design
- Smooth transitions under 300ms

See [style guide](./design/style-guide.md) for more details.

## License

MIT

## Acknowledgments

- Design inspiration: [Anthropic](https://www.anthropic.com)
- Movie data: [The Movie Database (TMDB)](https://www.themoviedb.org)
# Test deployment with root directory
