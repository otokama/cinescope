import APIClient, { FetchPaginatedResponse } from "../services/api-client";
import { Movie } from "../entities/Movie";
import { TV } from "../entities/TV";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFavoriteList = (accountId: number, sessionId: string, mediaType: "movies" | "tv") => {
  const apiClient = new APIClient<Movie | TV>(
    `/media/favorite/${accountId}/${sessionId}/${mediaType}`
  );
  return useInfiniteQuery<FetchPaginatedResponse<Movie | TV>, Error>({
    queryKey: ["favorite_list", sessionId, mediaType],
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

export { useFavoriteList };
