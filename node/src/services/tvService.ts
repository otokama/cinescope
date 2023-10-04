import axios from "axios";
import { TV } from "../models/TV";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface FetchTVListResponse {
  results: TV[];
}

async function getTVList(listName: string) {
  return await apiClient.get<FetchTVListResponse>(`/tv/${listName}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getDiscoveryTV() {
  const queryParams = {
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    with_original_language: "en",
    page: 1,
    sort_by: "popularity.desc",
  };
  return await apiClient.get<FetchTVListResponse>("/discover/tv", {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

export { getDiscoveryTV, getTVList };

