import axios, { AxiosRequestConfig } from "axios";

import config from "../config";

const makeRequest = <T>(route: string, params?: any): Promise<T> => {
  const instance = axios.create();

  const successResponseInterceptor = (response: any) => response.data.results;
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

const TMBDAPI = {
  getPopularMovies,
  searchMovies
};

export default TMBDAPI;

// Types
export type Movie = {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: Date;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
