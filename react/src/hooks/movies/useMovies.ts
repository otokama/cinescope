import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { Movie } from "../../entities/Movie";
import { MovieList } from "../../entities/MovieListType";
import APIClient, { FetchPaginatedResponse } from "../../services/api-client";
import useSearchParamsStore from "../../stores/search";

const useDiscoveryMovieList = (listName: MovieList) => {
  const apiClient = new APIClient<Movie>("/movie/discover/" + listName);
  const queryStr = "movie_list_" + listName;
  return useInfiniteQuery<FetchPaginatedResponse<Movie>, Error>({
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

const useDiscoveryMovies = () => {
  const apiClient = new APIClient<Movie>("/movie/discover");
  return useQuery<Movie[], Error>({
    queryKey: ["movies_discover"],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
  });
};

const useMovieRecommendation = (movieId: number) => {
  const apiClient = new APIClient<Movie>(
    `/movie/detail/${movieId}/recommendation`
  );
  return useQuery<Movie[], Error>({
    queryKey: ["movie_recommendation", movieId],
    queryFn: apiClient.getAll,
  });
};

const useMovieSearch = () => {
  const apiClient = new APIClient<Movie>("/movie/search");
  const searchText = useSearchParamsStore((s) => s.searchParams.searchText);

  return useInfiniteQuery<FetchPaginatedResponse<Movie>, Error>({
    queryKey: ["movies_search", searchText],
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
  useDiscoveryMovieList,
  useDiscoveryMovies, useMovieRecommendation,
  useMovieSearch
};

