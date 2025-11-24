import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui'

export function MovieCard({ movie }: { movie: any }) {
  const rating = typeof movie.rating === 'number' ? (movie.rating / 2).toFixed(1) : null

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block transition-transform duration-200 hover:scale-[1.02]"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="relative" style={{ aspectRatio: '2/3' }}>
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-opacity duration-200 group-hover:opacity-90"
          />
          {rating && (
            <Badge className="absolute left-3 top-3 bg-background/90 backdrop-blur text-foreground border-border">
              ★ {rating}
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h4 className="line-clamp-2 text-sm font-medium leading-snug mb-2">
            {movie.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {movie.releaseYear && <span>{movie.releaseYear}</span>}
            {movie.runtimeMinutes && (
              <>
                <span>•</span>
                <span>{movie.runtimeMinutes}m</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}