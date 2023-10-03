import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

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

const useDiscoveryMovies = (
  listName: "now_playing" | "popular" | "top_rated" | "upcoming"
) => {
  const apiClient = new APIClient<Movie>("/movie/" + listName);
  return useQuery<Movie[], Error>({
    queryKey: ["now_playing_movies"],
    queryFn: apiClient.getAll,
  });
};

export { useDiscoveryMovies };
