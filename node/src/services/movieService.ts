import axios from "axios";
import { Movie } from "../models/Movie";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
});

interface FetchNowPlayingResponse {
  results: Movie[];
}

async function getMovieList(listName: string) {
  let queryParams = {};
  if (listName === "upcoming") {
    queryParams = {
      "primary_release_date.gte": new Date()
    }
  }

  return await apiClient.get<FetchNowPlayingResponse>(`/${listName}`, {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}


export { getMovieList };
