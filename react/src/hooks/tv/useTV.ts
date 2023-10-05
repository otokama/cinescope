import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../services/api-client";

export interface TV {
  id: number;
  name: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  adult?: boolean;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  origin_country: string;
}

const useDiscoveryTVList = (
  listName: "top_rated" | "on_the_air" | "popular" | "airing_today"
) => {
  const apiClient = new APIClient<TV>("/tv/discover/" + listName);
  const queryStr = "tv_discovery_" + listName;
  return useQuery<TV[], Error>({
    queryKey: [queryStr],
    queryFn: apiClient.getAll,
    staleTime: ms("1h"),
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

export { useDiscoveryTVList, useDiscoveryTVs };
