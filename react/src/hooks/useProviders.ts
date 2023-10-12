import { useQuery } from "@tanstack/react-query";
import WatchProviderDetail from "../entities/WatchProviderDetail";
import APIClient from "../services/api-client";


const useProviders = (id: number, isMovie: boolean) => {
  const type = isMovie ? "movie" : "tv";
  const apiClient = new APIClient<WatchProviderDetail>(`/${type}/detail/${id}/provider`);
  return useQuery<WatchProviderDetail, Error>({
    queryKey: [type, "providers", id],
    queryFn: apiClient.get
  });
}

export default useProviders;