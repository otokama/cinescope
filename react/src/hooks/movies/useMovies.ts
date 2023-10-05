import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../services/api-client";
import { Movie } from "../../entities/Movie";

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
