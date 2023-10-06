import { useQuery } from "@tanstack/react-query";
import { Actor } from "../entities/Actor";
import APIClient from "../services/api-client";

const useCredit = (contentId: number, isMovie: boolean) => {
  const mediaType = isMovie ? "movie" : "tv";
  const apiClient = new APIClient<Actor>(
    `/${mediaType}/detail/${contentId}/credits`
  );
  return useQuery<Actor[], Error>({
    queryKey: [mediaType + "_credits", contentId],
    queryFn: apiClient.getAll,
  });
};

export default useCredit;
