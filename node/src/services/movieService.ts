import axios from "axios";
import { Movie } from "../models/Movie";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface FetchMovieListResponse {
  results: Movie[];
}

async function getMovieList(listName: string) {
  let queryParams = {};
  if (listName === "upcoming") {
    queryParams = {
      "primary_release_date.gte": new Date(),
    };
  }

  return await apiClient.get<FetchMovieListResponse>(`/movie/${listName}`, {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieDiscovery() {
  const queryParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    region: "us",
    page: 1,
    sort_by: "popularity.desc",
  };
  return await apiClient.get<FetchMovieListResponse>("/discover/movie", {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

export { getMovieDiscovery, getMovieList };

