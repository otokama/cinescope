import APIClient from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}

const useNowPlayingMovies = () => {
  const apiClient = new APIClient<Movie>("/movie/now_playing");
  return useQuery<Movie[], Error>({
    queryKey: ["now_playing_movies"],
    queryFn: apiClient.getAll,
  });
};

export { useNowPlayingMovies };
