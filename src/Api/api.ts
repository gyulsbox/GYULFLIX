export const API_KEY = "2b3b2e9c0aff7c1341df6f3a82c37f87";
export const BASE_PATH = "https://api.themoviedb.org/3";

export interface RouterID {
  state: {
    id: number;
  };
}

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: string;
  media_type: string;
}

interface ITv {
  id: number;
  backdrop_path: string;
  name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
}

interface ISearch {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  media_type: string;
  name: string;
}

interface IMovieTrailer {
  key: string;
  id: string;
  type: string;
}

interface ITvTrailer {
  key: string;
  id: string;
  type: string;
}

interface IGenres {
  name: string;
}

interface ICompanies {
  logo_path: string;
}

interface ILanguages {
  name: string;
}

interface ITvLogo {
  file_path: string;
}

interface IMovieLogo {
  file_path: string;
}

export interface IGetMoviesResult {
  results: IMovie[];
}

export interface IGetMoviesDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  original_title: string;
  overview: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: IGenres[];
  production_companies: ICompanies[];
  spoken_languages: ILanguages[];
  id: number;
}

export interface IGetMoviesTrailer {
  id: number;
  results: IMovieTrailer[];
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
}

export interface IGetTvDetail {
  adult: boolean;
  backdrop_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  runtime: number;
  vote_average: number;
  genres: IGenres[];
  episode_run_time: string;
  production_companies: ICompanies[];
  spoken_languages: ILanguages[];
  id: number;
  number_of_episodes: string;
  number_of_seasons: string;
}

export interface IMoiveSimilar {
  backdrop_path: string;
  original_title: string;
  id: number;
}

export interface ITvSimilar {
  backdrop_path: string;
  name: string;
  id: number;
}

export interface IGetTvTrailer {
  results: ITvTrailer[];
}

export interface IGetSearchResult {
  results: ISearch[];
  total_results: number;
}

export interface IGetMovieSimilar {
  results: IMoiveSimilar[];
}

export interface IGetTvSimilar {
  results: ITvSimilar[];
}

export interface IGetMovieImages {
  id: number;
  logos: IMovieLogo[];
}

export interface IGetTvImages {
  id: number;
  logos: ITvLogo[];
}

// MOVIE API
export const getMovies = async () => {
  const response = await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getMoviesPopular = async () => {
  const response = await fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=2`);
  return await response.json();
};

export const getMoviesTop = async () => {
  const response = await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getMoviesWeek = async () => {
  const response = await fetch(`${BASE_PATH}/trending/movie/week?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getMoviesDetail = async (movieId?: string) => {
  const response = await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  return await response.json();
};

export const getMovieSimilar = async (movieId?: string) => {
  const response = await fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getMoviesTrailer = async (movieId?: string) => {
  const response = await fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`);
  return await response.json();
};

export const getMovieImages = async (movieId?: string) => {
  const response = await fetch(`${BASE_PATH}/movie/${movieId}/images?api_key=${API_KEY}`);
  return await response.json();
};

// TV API
export const getTv = async () => {
  const response = await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getTvTop = async () => {
  const response = await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getTvAir = async () => {
  const response = await fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&page=2`);
  return await response.json();
};

export const getTvDetail = async (tvId?: string) => {
  const response = await fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=en-US`);
  return await response.json();
};

export const getTvSimilar = async (tvId?: string) => {
  const response = await fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getTvTrailer = async (tvId?: string) => {
  const response = await fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}`);
  return await response.json();
};

export const getTvImages = async (tvId?: string) => {
  const response = await fetch(`${BASE_PATH}/tv/${tvId}/images?api_key=${API_KEY}`);
  return await response.json();
};

export const getNewPopular = async () => {
  const response = await fetch(`${BASE_PATH}/trending/all/week?api_key=${API_KEY}&page=1`);
  return await response.json();
};

export const getUpcoming = async (number?: number) => {
  const response = await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=${number}`);
  return await response.json();
};

export const getSearch = async (query?: string) => {
  const response = await fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${query}`);
  return await response.json();
};