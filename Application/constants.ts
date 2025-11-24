export const MOVIE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
];

const generateYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }
  return years;
};

export const RELEASE_YEARS = generateYears();

export const RUNTIMES = [
  "under 90 minutes",
  "90-120 minutes",
  "over 120 minutes",
];

export const RATINGS = ["G", "PG", "PG-13", "R"];