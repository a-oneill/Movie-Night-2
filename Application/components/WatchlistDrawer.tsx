import React from 'react';
import { Movie } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  movies: Movie[];
  onClose: () => void;
  onRemove: (movie: Movie) => void;
  onNavigate: (movie: Movie) => void;
  onAdd?: (movie: Movie) => void;
  suggestions?: Movie[];
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  movies,
  onClose,
  onRemove,
  onNavigate,
  onAdd,
  suggestions = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="ui-drawer">
      <div className="ui-drawer__overlay" onClick={onClose} />
      <aside className="ui-drawer__panel">
        <header className="ui-drawer__header">
          <div>
            <h2>Watchlist</h2>
            <p>{movies.length} {movies.length === 1 ? 'title' : 'titles'} saved</p>
          </div>
          <button className="ui-btn ui-btn--ghost" onClick={onClose}>Close</button>
        </header>
        <div className="ui-drawer__content">
          {movies.length === 0 ? (
            <div className="ui-drawer__empty">
              <p>Browse titles and tap the bookmark to add them to your watchlist.</p>
              {suggestions.length > 0 && (
                <div className="ui-drawer__suggestions">
                  <h3>Need ideas?</h3>
                  <div className="ui-drawer__suggestion-grid">
                    {suggestions.map(movie => (
                      <div key={movie.id ?? movie.title} className="ui-drawer__suggestion-card">
                        <button type="button" onClick={() => onNavigate(movie)}>
                          <img src={movie.posterUrl} alt="" />
                        </button>
                        <div className="ui-drawer__suggestion-meta">
                          <h4>{movie.title}</h4>
                          <p>{movie.releaseYear}</p>
                        </div>
                        {onAdd && (
                          <button
                            type="button"
                            className="ui-drawer__suggestion-add"
                            onClick={(event) => {
                              event.stopPropagation();
                              onAdd(movie);
                            }}
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            movies.map(movie => (
              <button
                key={movie.id ?? movie.title}
                type="button"
                className="ui-drawer__item"
                onClick={() => onNavigate(movie)}
              >
                <img src={movie.posterUrl} alt="" />
                <div className="ui-drawer__item-meta">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.releaseYear && <span>{movie.releaseYear}</span>}
                    {movie.genres?.[0] && (
                      <>
                        <span>•</span>
                        <span>{movie.genres[0]}</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="ui-drawer__item-actions">
                  <button
                    type="button"
                    className="ui-drawer__remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemove(movie);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};
