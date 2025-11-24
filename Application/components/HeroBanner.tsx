import React from 'react';
import { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie | null;
  onWatchNow?: () => void;
  onToggleWatchlist?: () => void;
  isInWatchlist?: boolean;
}

const formatRating = (rating?: number) => {
  if (rating === undefined) return null;
  return (rating / 2).toFixed(1);
};

const formatVotes = (count?: number) => {
  if (!count) return '';
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie, onWatchNow, onToggleWatchlist, isInWatchlist }) => {
  if (!movie) {
    return (
      <div className="ui-hero ui-hero--empty">
        <div className="ui-hero__inner">
          <h2 className="ui-hero__title">Find something to watch tonight.</h2>
          <p className="ui-hero__subtitle">Use the filters below or try your luck for surprise picks.</p>
        </div>
      </div>
    );
  }

  const rating = formatRating(movie.rating);
  const votes = formatVotes(movie.voteCount);

  return (
    <section
      className="ui-hero"
      style={
        movie.backdropUrl
          ? { backgroundImage: `linear-gradient(90deg, rgba(12,17,23,0.75) 0%, rgba(12,17,23,0.25) 48%, rgba(12,17,23,0.05) 100%), url(${movie.backdropUrl})` }
          : undefined
      }
    >
      <div className="ui-hero__inner">
        <div className="ui-hero__meta">
          <h2 className="ui-hero__title">{movie.title}</h2>
          <div className="ui-hero__rating">
            {rating && (
              <>
                <span className="ui-hero__rating-icon" aria-hidden="true">⭐</span>
                <span className="ui-hero__rating-value">{rating}</span>
              </>
            )}
            {votes && <span className="ui-hero__rating-count">({votes} reviews)</span>}
            {movie.releaseYear && <span className="ui-hero__divider">•</span>}
            {movie.releaseYear && <span className="ui-hero__meta-text">{movie.releaseYear}</span>}
            {movie.runtimeMinutes && (
              <>
                <span className="ui-hero__divider">•</span>
                <span className="ui-hero__meta-text">{movie.runtimeMinutes} mins</span>
              </>
            )}
          </div>
          {movie.tagline && <p className="ui-hero__tagline">{movie.tagline}</p>}
          <p className="ui-hero__description">{movie.description}</p>
          <div className="ui-hero__actions">
            <button
              className="ui-btn ui-btn--primary"
              onClick={() => onWatchNow?.()}
            >
              Watch Now
            </button>
            <button
              className="ui-btn ui-btn--hero"
              onClick={() => onToggleWatchlist?.()}
            >
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
        <div className="ui-hero__poster">
          <img src={movie.posterUrl} alt={`${movie.title} poster`} />
        </div>
      </div>
    </section>
  );
};
