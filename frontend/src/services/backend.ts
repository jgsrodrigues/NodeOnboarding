import axios, { AxiosRequestConfig, Method } from "axios";

import config from "../config";

class API {
  setToken = (token: string) => sessionStorage.setItem('token', token);
  getToken = () => sessionStorage.getItem('token');
  authHeader = () => ({ 'AUTHORIZATION': `Bearer ${this.getToken()}` });

  makeRequest<T>(route: string, method: Method, headers?: any, params?: any): Promise<T> {
    const instance = axios.create();

    const successResponseInterceptor = (response: any) => response.data;
    const errorResponseInterceptor = (error: any) => {
      if (error?.response?.status === 401 && error?.request?.headers?.AUTHORIZATION) {
        sessionStorage.removeItem('token');
        window.location.href = `/login?referrer=${encodeURIComponent(window.location.href)}`;
      }
      console.error(error);
    }

    instance.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor);

    const axiosRequestConfig: AxiosRequestConfig = {
      url: route,
      method,
      baseURL: config.API,
      timeout: 1000 * 30, // 30s
    };

    if (params && method === 'GET') {
      axiosRequestConfig.params = params;
    }
    if (params && method !== 'GET') {
      axiosRequestConfig.data = params;
    }
    if (headers) {
      axiosRequestConfig.headers = headers
    }

    return instance.request(axiosRequestConfig);
  };

  authenticate = (user: string, password: string) =>
    this.makeRequest<{ token: string, email: string }>(
      '/login',
      'POST',
      {
        "Content-Type": "application/json",
      },
      { email: user, password });

  getProfile = () => this.makeRequest<User>('/user/profile', 'GET', this.authHeader());
  updateProfile = (profileData: FormData) => this.makeRequest('/user/updateProfile', 'POST', { ...this.authHeader(), "Content-Type": "multipart/form-data" }, profileData);

  addFavourite = (email: string, id: number, type: "movie" | "show") => this.makeRequest('/user/addFavourite', 'POST', this.authHeader(), { email, id, type });
  removeFavourite = (email: string, id: number, type: "movie" | "show") => this.makeRequest('/user/removeFavourite', 'POST', this.authHeader(), { email, id, type });
  addRating = (email: string, id: number, type: "movie" | "show", rating: number) => this.makeRequest('/user/addRating', 'POST', this.authHeader(), { email, id, type, rating });
}

const nodeAPI = new API();
export default nodeAPI;

export type User = {
  email?: string;
  name?: string;
  picture?: string | ArrayBuffer | null
  ratings?: {
    ID: number,
    type: 'movie' | 'show',
    rating?: number,
    isFavourite: boolean,
  }[],
}
