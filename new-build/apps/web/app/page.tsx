import React from 'react'
import { Button } from '@/components/ui'
import { AdvancedSearchForm } from '@/components/features/AdvancedSearchForm'

export default function Page() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center gap-6">
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Discover your next favorite movie
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-balance">
            Use any combination of filters to find exactly what you're looking for
          </p>
        </div>
      </section>

      {/* Advanced Search Form - Main Feature */}
      <section className="w-full px-4">
        <AdvancedSearchForm />
      </section>

      {/* Quick Browse Section */}
      <section className="flex flex-col items-center gap-6 pt-8 border-t border-border">
        <h2 className="text-lg font-medium text-muted-foreground">
          Or browse curated collections
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/browse/popular" variant="secondary">
            Browse Popular
          </Button>
          <Button href="/browse/top-rated" variant="secondary">
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