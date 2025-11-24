import Image from 'next/image'
import { getDetails } from '@/lib/api/tmdb'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params
  const id = Number(idParam)
  const movie = await getDetails(id)
  if (!movie) return <main><p>Movie not found.</p></main>
  return (
    <main>
      <section>
        {movie.backdropUrl && (
          <div className="relative" style={{ height: 280 }}>
            <Image src={movie.backdropUrl} alt={movie.title} fill sizes="100vw" className="object-cover" />
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, marginTop: 24 }}>
          <div className="relative" style={{ aspectRatio: '2/3' }}>
            <Image src={movie.posterUrl} alt={movie.title} fill sizes="160px" className="object-cover" />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <div style={{ marginTop: 12 }}>
              <div>Director: {movie.director}</div>
              <div>Release Year: {movie.releaseYear}</div>
              <div>Runtime: {movie.runtimeMinutes ? `${movie.runtimeMinutes}m` : ''}</div>
              <div style={{ marginTop: 8 }}>Cast: {(movie.cast || []).map((c: any) => c.name).join(', ')}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}