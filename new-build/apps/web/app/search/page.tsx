import { Suspense } from 'react'
import { SearchResults } from './search-results'

export default function SearchPage() {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <Suspense fallback={<SearchFallback />}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

function SearchFallback() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
            <div className="h-4 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
