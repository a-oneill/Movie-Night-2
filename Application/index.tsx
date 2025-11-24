
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieDetails from './pages/MovieDetails';
import BrowseCollection from './pages/BrowseCollection';
import SearchResults from './pages/SearchResults';
import { ErrorBoundary } from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const basename = import.meta.env.MODE === 'production' ? '/Movie-Night' : '/';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/browse/:category" element={<BrowseCollection />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
