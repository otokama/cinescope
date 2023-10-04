import { useQuery } from "@tanstack/react-query";
import ms from "ms";
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

const useDiscoveryMovieList = (
  listName: "now_playing" | "popular" | "top_rated" | "upcoming"
) => {
  const apiClient = new APIClient<Movie>("/movie/discover/" + listName);
  const queryStr = "movies_discovery_" + listName;
  return useQuery<Movie[], Error>({
    queryKey: [queryStr],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
  });
};

const useDiscoveryMovies = () => {
  const apiClient = new APIClient<Movie>("/movie/discover");
  return useQuery<Movie[], Error>({
    queryKey: ["movies_discover"],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
  });
};

export { useDiscoveryMovieList, useDiscoveryMovies };
