import React from 'react'
import { Button } from '@/components/ui'

export default function Page() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center gap-8 py-12 md:py-24">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance">
            Discover your next favorite movie
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Explore curated collections, find hidden gems, and create your perfect watchlist
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button href="/browse/popular" size="lg">
            Browse Popular
          </Button>
          <Button href="/browse/top-rated" variant="secondary" size="lg">
            Top Rated
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Curated Collections</h3>
          <p className="text-muted-foreground">
            Browse handpicked selections of popular and critically acclaimed films
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Smart Search</h3>
          <p className="text-muted-foreground">
            Find exactly what you're looking for with advanced filtering and AI-powered recommendations
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Personal Watchlist</h3>
          <p className="text-muted-foreground">
            Save your discoveries and keep track of what you want to watch next
          </p>
        </div>
      </section>
    </div>
  )
}