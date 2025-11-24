import { NextRequest, NextResponse } from 'next/server'
import { searchMovies, SearchFilters } from '@/lib/api/tmdb'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const filters: SearchFilters = {}

    const query = searchParams.get('q')
    if (query) filters.query = query

    const genre = searchParams.get('genre')
    if (genre) filters.genre = genre

    const year = searchParams.get('year')
    if (year) filters.year = Number(year)

    const minRating = searchParams.get('minRating')
    if (minRating) filters.minRating = Number(minRating)

    const minRuntime = searchParams.get('minRuntime')
    if (minRuntime) filters.minRuntime = Number(minRuntime)

    const maxRuntime = searchParams.get('maxRuntime')
    if (maxRuntime) filters.maxRuntime = Number(maxRuntime)

    const rating = searchParams.get('rating')
    if (rating) filters.rating = rating

    const actor = searchParams.get('actor')
    if (actor) filters.actor = actor

    const director = searchParams.get('director')
    if (director) filters.director = director

    const writer = searchParams.get('writer')
    if (writer) filters.writer = writer

    const producer = searchParams.get('producer')
    if (producer) filters.producer = producer

    const productionHouse = searchParams.get('productionHouse')
    if (productionHouse) filters.productionHouse = productionHouse

    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

    const results = await searchMovies(filters, page)

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    )
  }
}
