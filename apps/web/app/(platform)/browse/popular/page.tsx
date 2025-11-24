import { getPopular } from '@/lib/api/tmdb'
import { MovieCard } from '@/components/features/movies/movie-card'

export const metadata = {
  title: 'Popular Movies | Movie Night',
  description: 'Browse the most popular movies right now',
}

export default async function Page() {
  const movies = await getPopular(20)

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Popular Movies
        </h1>
        <p className="text-lg text-muted-foreground">
          The crowd favorites lighting up the charts
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