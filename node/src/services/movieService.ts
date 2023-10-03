import axios from "axios";
import { Movie } from "../models/Movie";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
});

interface FetchNowPlayingResponse {
  results: Movie[];
}

async function getNowPlayingMovies() {
  return await apiClient.get<FetchNowPlayingResponse>("/now_playing", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

export { getNowPlayingMovies };
