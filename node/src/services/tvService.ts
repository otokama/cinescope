import axios from "axios";
import { ContentRating } from "../models/Rating";
import { TV } from "../models/TV";
import { TVDetail } from "../models/TVDetail";
import { Video } from "../models/Video";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface TVSearchParams {
  include_adult: boolean;
  include_null_first_air_dates: boolean;
  with_original_language: string;
  language: string;
  page: number;
  sort_by?: string;
  "vote_count.gte"?: number;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  region?: string;
  watch_region?: string;
  "with_runtime.gte"?: number;
  "first_air_date.gte"?: Date;
  "first_air_date.lte"?: Date;
  "air_date.gte"?: Date;
  "air_date.lte"?: Date;
}

interface FetchTVListResponse {
  results: TV[];
}

interface FetchResultList<T> {
  results: T[];
}

function getAirTodayQueryParams(queryParams: TVSearchParams) {
  return {
    ...queryParams,
    "air_date.gte": new Date(),
    "air_date.lte": new Date(),
  };
}

function getOnAirQueryParams(queryParams: TVSearchParams) {
  return {
    ...queryParams,
    "air_date.gte": new Date(),
    "air_date.lte": new Date(),
    sort_by: "primary_release_date.desc",
  };
}

function getPopularQueryParams(queryParams: TVSearchParams) {
  return {
    ...queryParams,
  };
}

function getTopRatedQueryParams(queryParams: TVSearchParams) {
  return {
    ...queryParams,
    sort_by: "vote_average.desc",
  };
}

async function getTVList(listName: string) {
  let queryParams: TVSearchParams = {
    include_adult: false,
    include_null_first_air_dates: false,
    with_original_language: "en",
    language: "en-US",
    region: "US",
    watch_region: "US",
    page: 1,
    "vote_count.gte": 200,
    sort_by: "popularity.desc",
  };
  switch (listName) {
    case "airing_today":
      queryParams = getAirTodayQueryParams(queryParams);
      break;
    case "on_the_air":
      queryParams = getOnAirQueryParams(queryParams);
      break;
    case "popular":
      queryParams = getPopularQueryParams(queryParams);
      break;
    case "top_rated":
      queryParams = getTopRatedQueryParams(queryParams);
      break;
    default:
      break;
  }

  return await apiClient.get<FetchTVListResponse>("/discover/tv", {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getDiscoveryTV() {
  const queryParams = {
    include_adult: false,
    include_null_first_air_dates: false,
    with_original_language: "en",
    language: "en-US",
    page: 1,
    sort_by: "primary_release_date.desc",
    "vote_count.gte": 200,
  };
  return await apiClient.get<FetchTVListResponse>("/discover/tv", {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getDetail(id: number) {
  const queryParam = {
    language: "en-US",
  };
  return await apiClient.get<TVDetail>("/tv/" + id, {
    params: queryParam,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getRating(id: number) {
  return await apiClient.get<FetchResultList<ContentRating>>(
    `/tv/${id}/content_ratings`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    }
  );
}

async function getVideos(id: number) {
  return await apiClient.get<FetchResultList<Video>>(`/tv/${id}/videos`, {
    params: {
      language: "en-US",
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

export { getDetail, getDiscoveryTV, getTVList, getRating, getVideos };
