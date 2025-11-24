import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface CarouselRowProps {
  title: string;
  movies: Movie[];
  onToggleWatchlist?: (movie: Movie) => void;
  isSaved?: (movie: Movie) => boolean;
  onSeeAll?: () => void;
  seeAllTo?: string;
}

export const CarouselRow: React.FC<CarouselRowProps> = ({ title, movies, onToggleWatchlist, isSaved, onSeeAll, seeAllTo }) => {
  if (!movies.length) return null;

  const SeeAllLink = () => {
    if (seeAllTo) {
      return <Link className="ui-row__see-all" to={seeAllTo}>See all</Link>;
    }
    if (onSeeAll) {
      return <button type="button" className="ui-row__see-all" onClick={onSeeAll}>See all</button>;
    }
    return <span className="ui-row__see-all ui-row__see-all--disabled">See all</span>;
  };

  return (
    <section className="ui-row">
      <div className="ui-row__header">
        <h3 className="ui-row__title">{title}</h3>
        <SeeAllLink />
      </div>
      <div className="ui-row__carousel">
        {movies.map(movie => (
          <MovieCard
            key={movie.id ?? movie.title}
            movie={movie}
            onToggleWatchlist={onToggleWatchlist}
            isInWatchlist={isSaved ? isSaved(movie) : false}
          />
        ))}
      </div>
    </section>
  );
};
