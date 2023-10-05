import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient<T> {
  endpoint: string;
  axiosInstance: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  getAll = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .get<T>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
