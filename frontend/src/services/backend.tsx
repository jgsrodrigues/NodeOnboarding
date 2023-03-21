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
      console.log(error);
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
    this.makeRequest<{ token: string }>(
      '/login',
      'POST',
      {
        "Content-Type": "application/json",
      },
      { email: user, password });

  getProfile = (id?: string) => this.makeRequest<{ user: { _id: string, email: string } }>('/user/profile', 'GET', this.authHeader(), { id });
}

const nodeAPI = new API();
export default nodeAPI;
