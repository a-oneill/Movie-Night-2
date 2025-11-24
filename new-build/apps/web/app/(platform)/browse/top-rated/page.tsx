import { getTopRated } from '@/lib/api/tmdb'
import { MovieCard } from '@/components/features/movies/movie-card'

export const metadata = {
  title: 'Top Rated Movies | Movie Night',
  description: 'Browse the highest rated movies of all time',
}

export default async function Page() {
  const movies = await getTopRated(20)

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Top Rated Movies
        </h1>
        <p className="text-lg text-muted-foreground">
          Critically acclaimed hits with sky-high ratings
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((m: any) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </section>
    </div>
  )
}