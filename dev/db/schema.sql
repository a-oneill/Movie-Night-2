CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  release_year INT,
  rating NUMERIC(3,1)
);