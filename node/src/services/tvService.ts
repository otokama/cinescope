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
    with_original_language: "en",
    language: "en-US",
    page: 1,
    sort_by: "primary_release_date.desc",
    "vote_count.gte": 200
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

