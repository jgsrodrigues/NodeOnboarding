import axios, { AxiosRequestConfig } from "axios";

import config from "../config";

const makeRequest = <T>(route: string, params?: any): Promise<T> => {
  const instance = axios.create();

  const successResponseInterceptor = (response: any) => response.data.results || response.data || response;
  const errorResponseInterceptor = (error: any) => {
    console.error(error);
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
const multiSearch = (term: string) => makeRequest<(Movie | TVShow | Person)[]>('/search/multi',  { query: term });

const TMBDAPI = {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  multiSearch
};

export default TMBDAPI;

// Types
export type Movie = {
  media_type?: "movie";
  id: number;
	title: string;
	original_title: string;
	poster_path: string | null;
	adult: boolean;
	overview: string;
	release_date: Date;
	genre_ids: number[];
	original_language: string;
	backdrop_path: string | null;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}

export type MovieDetails = Omit<Movie, 'genre_ids'> & {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Country & {
    english_name?: string;
  }[];
  status: "Rumored" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled";
  tagline: string | null;
}

type Collection = {
	id: number;
	backdrop_path: string;
	name: string;
	poster_path: string;
}

type Genre = {
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
}

export type TVShow = {
  media_type?: "tv";
  id: number;
	name: string;
	original_name: string;
	poster_path: string;
	popularity: number;
	backdrop_path: string;
	vote_average: number;
	overview: string;
	origin_country: string[];
	genre_ids: number[];
	original_language: string;
	vote_count: number;
	first_air_date: Date;
}

export type TVShowDetails = {
  created_by: Person[];
	episode_run_time: number[];
	genres: Genre[];
	homepage: string;
	in_production: boolean;
	languages: string[];
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	production_companies: Company[];
	seasons: Season[];
	status: string;
	type: string;
	last_air_date: Date;
}

export type Person = {
  media_type?: "person";
  id: number;
	name: string;
	profile_path: string;
	adult: boolean;
	popularity: number;
	known_for: (Movie | TVShow)[];
}

type Network = {
  id: number;
	name: string;
}

type Season = {
  id: number;
	episode_count: number;
	poster_path: string;
	season_number: number;
	air_date: Date;
}