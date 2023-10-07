import { useQuery } from "@tanstack/react-query";
import { Video } from "../entities/Video";
import APIClient from "../services/api-client";

const useTrailers = (id: number, isMovie: boolean) => {
  const type = isMovie ? "movie" : "tv";
  const apiClient = new APIClient<Video>(`/${type}/detail/${id}/trailer`);
  return useQuery<Video[], Error>({
    queryKey: [type, "trailers", id],
    queryFn: apiClient.getAll,
  });
};

export default useTrailers;
