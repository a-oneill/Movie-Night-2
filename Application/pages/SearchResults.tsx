import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MovieCard } from '../components/MovieCard';
import { Movie, SearchCriteria } from '../types';
import { fetchMovies } from '../services/geminiService';

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get search criteria from location state
  const searchState = location.state as { criteria?: SearchCriteria; aiCurate?: boolean; mainstreamOnly?: boolean } | null;

  useEffect(() => {
    if (!searchState?.criteria) {
      navigate('/', { replace: true });
      return;
    }

    let cancelled = false;
    const runSearch = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchMovies(
          searchState.criteria!,
          false,
          searchState.aiCurate ?? true,
          searchState.mainstreamOnly ?? true,
          20  // Fetch 20 results for "See All" page
        );
        if (!cancelled) {
          setMovies(result.movies);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load search results.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    runSearch();
    return () => {
      cancelled = true;
    };
  }, [searchState, navigate]);

  const navItems = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Popular', onClick: () => navigate('/browse/popular') },
    { label: 'Top Rated', onClick: () => navigate('/browse/top-rated') },
    { label: 'In Theaters', onClick: () => navigate('/browse/now-playing') },
  ];

  const buildCriteriaDescription = () => {
    if (!searchState?.criteria) return '';
    const parts: string[] = [];
    const c = searchState.criteria;
    if (c.genre) parts.push(c.genre);
    if (c.actor) parts.push(`starring ${c.actor}`);
    if (c.director) parts.push(`directed by ${c.director}`);
    if (c.writer) parts.push(`written by ${c.writer}`);
    if (c.producer) parts.push(`produced by ${c.producer}`);
    if (c.productionHouse) parts.push(`from ${c.productionHouse}`);
    if (c.releaseYear) parts.push(`from ${c.releaseYear}`);
    if (c.runtime) parts.push(c.runtime);
    if (c.rating) parts.push(`rated ${c.rating}`);
    return parts.length > 0 ? parts.join(', ') : 'All movies';
  };

  return (
    <div className="ui-app">
      <Navbar items={navItems} />
      <main className="ui-main ui-main--wide">
        <header className="ui-browse__header">
          <div>
            <h1>Search Results</h1>
            <p>{buildCriteriaDescription()}</p>
          </div>
        </header>

        {loading && (
          <div className="ui-loading">
            <span className="ui-loading__spinner" />
            <p>Searching titles…</p>
          </div>
        )}

        {error && (
          <div className="ui-alert ui-alert--error">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="ui-alert">
            No movies found matching your criteria. Try adjusting your search.
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <section className="ui-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id ?? movie.title} movie={movie} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
