import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import TVDetail from "../../entities/TVDetail";
import APIClient from "../../services/api-client";

const useTVDetail = (tvId: number) => {
  const apiClient = new APIClient<TVDetail>("/tv/detail/" + tvId);
  return useQuery<TVDetail, Error>({
    queryKey: ["tv", tvId],
    queryFn: apiClient.get,
    staleTime: ms("1h"),
  });
};

export { useTVDetail };
