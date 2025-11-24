
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onToggleWatchlist?: (movie: Movie) => void;
  isInWatchlist?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleWatchlist, isInWatchlist }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const rating = movie.rating ? (movie.rating / 2).toFixed(1) : null;

  return (
    <div className="ui-card" onClick={() => movie.id && navigate(`/movie/${movie.id}`)}>
      <div className="ui-card__poster">
        {!imageLoaded && (
          <div className="ui-card__poster-skeleton">
            <div className="ui-skeleton__shimmer" />
          </div>
        )}
        <img
          src={movie.posterUrl}
          alt={`Poster for ${movie.title}`}
          loading="lazy"
          style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://picsum.photos/400/600?random=${movie.title}`;
            setImageLoaded(true);
          }}
        />
        {rating && (
          <span className="ui-card__badge">
            ★ {rating}
          </span>
        )}
      </div>
      <div className="ui-card__content">
        <h4>{movie.title}</h4>
        <div className="ui-card__meta">
          {movie.releaseYear && <span>{movie.releaseYear}</span>}
          {movie.runtimeMinutes && (
            <>
              <span>•</span>
            <span>{movie.runtimeMinutes}m</span>
          </>
          )}
        </div>
        {onToggleWatchlist && (
          <button
            className={`ui-card__watchlist ${isInWatchlist ? 'ui-card__watchlist--active' : ''}`}
            onClick={(event) => {
              event.stopPropagation();
              onToggleWatchlist(movie);
            }}
          >
            {isInWatchlist ? 'Saved' : 'Watchlist'}
          </button>
        )}
      </div>
    </div>
  );
};
