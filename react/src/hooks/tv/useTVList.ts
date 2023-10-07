import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { TV } from "../../entities/TV";
import { TVList } from "../../entities/TVListType";
import APIClient, { FetchPaginatedResponse } from "../../services/api-client";
import useSearchParamsStore from "../../stores/search";

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

const useTVSearch = () => {
  const apiClient = new APIClient<TV>("/tv/search");
  const searchText = useSearchParamsStore((s) => s.searchParams.searchText);

  return useInfiniteQuery<FetchPaginatedResponse<TV>, Error>({
    queryKey: ["tv_search", searchText],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.paginatedGetAll({
        params: {
          query: searchText,
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

export {
  useDiscoveryTVList,
  useDiscoveryTVs,
  useTVRecommendation,
  useTVSearch
};

