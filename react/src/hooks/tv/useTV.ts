import { useQuery } from "@tanstack/react-query";
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

const useDiscoveryTV = (
  listName: "top_rated" | "on_the_air" | "popular" | "airing_today"
) => {
  const apiClient = new APIClient<TV>("/tv/" + listName);
  const queryStr = "tv_discovery_" + listName;
  return useQuery<TV[], Error>({
    queryKey: [queryStr],
    queryFn: apiClient.getAll,
  });
};

export { useDiscoveryTV };
