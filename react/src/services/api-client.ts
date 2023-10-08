import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface FetchPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

class APIClient<T> {
  endpoint: string;
  axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });
  }

  getAll = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  paginatedGetAll = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<FetchPaginatedResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<T>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
