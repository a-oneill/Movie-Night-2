import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  discoverRandomMoviesFromTMDB,
} from '../services/tmdbService';

interface CategoryConfig {
  title: string;
  description: string;
  fetcher: (count?: number) => Promise<Movie[]>;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  popular: {
    title: 'Popular Movies',
    description: 'The crowd favorites lighting up the charts right now.',
    fetcher: fetchPopularMovies,
  },
  'top-rated': {
    title: 'Top Rated Movies',
    description: 'Critically acclaimed hits with sky-high ratings.',
    fetcher: fetchTopRatedMovies,
  },
  'now-playing': {
    title: 'In Theaters',
    description: 'Fresh releases currently playing on the big screen.',
    fetcher: fetchNowPlayingMovies,
  },
};

const BrowseCollection: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const config = useMemo(() => (category ? CATEGORY_CONFIG[category] : undefined), [category]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        // Handle random genre category
        if (category === 'random-genre') {
          const state = location.state as { genre?: string } | null;
          const genre = state?.genre || 'Action';
          setTitle(`${genre} Movies`);
          setDescription(`A curated collection of ${genre.toLowerCase()} movies.`);
          const results = await discoverRandomMoviesFromTMDB({ genre }, 40, { mainstreamOnly: true });
          if (!cancelled) setMovies(results);
        }
        // Handle random year category
        else if (category === 'random-year') {
          const state = location.state as { year?: string } | null;
          const year = state?.year || '2000';
          setTitle(`${year} Movies`);
          setDescription(`Movies released in ${year}.`);
          const results = await discoverRandomMoviesFromTMDB({ releaseYear: year }, 40, { mainstreamOnly: true });
          if (!cancelled) setMovies(results);
        }
        // Handle standard categories
        else if (config) {
          setTitle(config.title);
          setDescription(config.description);
          const results = await config.fetcher(40);
          if (!cancelled) setMovies(results);
        } else {
          navigate('/', { replace: true });
          return;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load titles.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [config, category, location.state, navigate]);

  const navItems = [
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Popular', onClick: () => navigate('/browse/popular'), active: category === 'popular' },
    { label: 'Top Rated', onClick: () => navigate('/browse/top-rated'), active: category === 'top-rated' },
    { label: 'In Theaters', onClick: () => navigate('/browse/now-playing'), active: category === 'now-playing' },
  ];

  return (
    <div className="ui-app">
      <Navbar items={navItems} />
      <main className="ui-main ui-main--wide">
        <header className="ui-browse__header">
          <div>
            <h1>{title || 'Movies'}</h1>
            <p>{description}</p>
          </div>
        </header>

        {loading && (
          <div className="ui-loading">
            <span className="ui-loading__spinner" />
            <p>Pulling titles…</p>
          </div>
        )}

        {error && (
          <div className="ui-alert ui-alert--error">
            {error}
          </div>
        )}

        {!loading && !error && (
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

export default BrowseCollection;
