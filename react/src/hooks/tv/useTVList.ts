import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchPaginatedResponse } from "../../services/api-client";
import { TV } from "../../entities/TV";
import { TVList } from "../../entities/TVListType";

const useDiscoveryTVList = (listName: TVList) => {
  const apiClient = new APIClient<TV>("/tv/discover/" + listName);
  const queryStr = "tv_list_" + listName;
  return useInfiniteQuery<FetchPaginatedResponse<TV>, Error>({
    queryKey: [queryStr],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.paginatedGetAll({
        params: {
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages > lastPage.page
        ? allPages.length + 1
        : undefined;
    },
  });
};

const useDiscoveryTVs = () => {
  const apiClient = new APIClient<TV>("/tv/discover");
  return useQuery<TV[], Error>({
    queryKey: ["tv_discover"],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
  });
};

const useTVRecommendation = (tvId: number) => {
  const apiClient = new APIClient<TV>(`/tv/detail/${tvId}/recommendation`);
  return useQuery<TV[], Error>({
    queryKey: ["tv_recommend", tvId],
    queryFn: apiClient.getAll,
  });
};

export { useDiscoveryTVList, useDiscoveryTVs, useTVRecommendation };
