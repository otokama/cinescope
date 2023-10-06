import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../../entities/Movie";
import APIClient from "../../services/api-client";

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

const useMovieRecommendation = (movieId: number) => {
  const apiClient = new APIClient<Movie>(
    `/movie/detail/${movieId}/recommendation`
  );
  return useQuery<Movie[], Error>({
    queryKey: ["movie_recommendation", movieId],
    queryFn: apiClient.getAll,
  });
};

export { useDiscoveryMovieList, useDiscoveryMovies, useMovieRecommendation };
