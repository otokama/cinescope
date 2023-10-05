import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../services/api-client";
import { MovieDetail } from "../../entities/MovieDetail";

const useMovieDetail = (movieId: number) => {
  const apiClient = new APIClient<MovieDetail>("/movie/detail/" + movieId);
  return useQuery<MovieDetail, Error>({
    queryKey: ["movie", movieId],
    queryFn: apiClient.get,
    staleTime: ms("1h"),
  });
};

export default useMovieDetail;
