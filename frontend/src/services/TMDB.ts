import axios, { AxiosRequestConfig } from "axios";

import config from "../config";

const makeRequest = <T>(route: string, params?: any): Promise<T> => {
  const instance = axios.create();

  const successResponseInterceptor = (response: any) => response.data.results || response.data || response;
  const errorResponseInterceptor = (error: any) => {
    console.log(error);
  }

  instance.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor);

  const axiosRequestConfig: AxiosRequestConfig = {
    url: route,
    method: 'GET',
    baseURL: config.TMDBURL,
    timeout: 1000 * 30,
    params: { api_key: config.TMDBKEY },
  };

  if (params) {
    axiosRequestConfig.params = { ...axiosRequestConfig.params, ...params };
  }

  return instance.request(axiosRequestConfig);
};

const getPopularMovies = () => makeRequest<Movie[]>('/movie/popular');
const searchMovies = (term: string) => makeRequest<Movie[]>('/search/movie', { query: term });
const getMovieDetails = (movieId: string) => makeRequest<MovieDetails>(`/movie/${movieId}`);

const TMBDAPI = {
  getPopularMovies,
  searchMovies,
  getMovieDetails
};

export default TMBDAPI;

// Types
export type Movie = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

type movieGenre = {
  id: number;
  name: string;
}

type Country = {
  iso_3166_1: string;
  name: string;
}

type Company = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export type MovieDetails = Omit<Movie, 'genre_ids'> & {
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  belongs_to_collection: null | {};
  budget: number;
  genres: movieGenre[];
  homepage: string;
  imdb_id: string | null;
  "production_companies": Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Country & {
    english_name?: string;
  }[];
  status: "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled";
  tagline: string | null;
}
