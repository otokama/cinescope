import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { MovieDetail } from "../../entities/MovieDetail";
import APIClient from "../../services/api-client";

const useMovieDetail = (movieId: number) => {
  const apiClient = new APIClient<MovieDetail>("/movie/detail/" + movieId);
  return useQuery<MovieDetail, Error>({
    queryKey: ["movie", movieId],
    queryFn: apiClient.get,
    staleTime: ms("1h"),
  });
};

export { useMovieDetail };
