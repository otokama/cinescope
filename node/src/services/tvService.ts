import axios from "axios";
import Actor from "../models/Actor";
import ContentRating from "../models/Rating";
import TV from "../models/TV";
import TVDetail from "../models/TVDetail";
import TVSearchQuery from "../models/TVSearchQuery";
import Video from "../models/Video";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface FetchTVListResponse {
  results: TV[];
}

interface FetchResultList<T> {
  results: T[];
}

interface FetchTVCastResponse {
  cast: Actor[];
}

// interface TVSearchParams {
//   include_adult: boolean;
//   include_null_first_air_dates: boolean;
//   with_original_language: string;
//   language: string;
//   page: number;
//   sort_by?: string;
//   "vote_count.gte"?: number;
//   "vote_average.gte"?: number;
//   "vote_average.lte"?: number;
//   with_genres?: string;
//   with_keywords?: string;
//   with_origin_country?: string;
//   region?: string;
//   watch_region?: string;
//   "with_runtime.gte"?: number;
//   "first_air_date.gte"?: Date;
//   "first_air_date.lte"?: Date;
//   "air_date.gte"?: Date;
//   "air_date.lte"?: Date;
// }

// function getAirTodayQueryParams(queryParams: TVSearchParams) {
//   return {
//     ...queryParams,
//     "air_date.gte": new Date(),
//     "air_date.lte": new Date(),
//   };
// }

// function getOnAirQueryParams(queryParams: TVSearchParams) {
//   return {
//     ...queryParams,
//     "air_date.gte": new Date(),
//     "air_date.lte": new Date(),
//     sort_by: "primary_release_date.desc",
//   };
// }

// function getPopularQueryParams(queryParams: TVSearchParams) {
//   return {
//     ...queryParams,
//   };
// }

// function getTopRatedQueryParams(queryParams: TVSearchParams) {
//   return {
//     ...queryParams,
//     sort_by: "vote_average.desc",
//   };
// }

async function getTVList(listName: string, page?: string) {
  const queryParams = {
    language: "en-US",
    page,
  };
  return await apiClient.get("/tv/" + listName, {
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

async function getCast(id: number) {
  return await apiClient.get<FetchTVCastResponse>(`/tv/${id}/credits`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
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

async function getStreamProviders(id: number) {
  return await apiClient.get(`/tv/${id}/watch/providers`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getTVRecommendations(id: number) {
  return await apiClient.get<FetchResultList<TV>>(`/tv/${id}/recommendations`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function search(query: TVSearchQuery) {
  return await apiClient.get("/search/tv", {
    params: query,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getAccountStates(tvId: number, sessionId: string) {
  return await apiClient.get(`/tv/${tvId}/account_states`, {
    params: {
      session_id: sessionId,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

export {
  getAccountStates,
  getCast,
  getDetail,
  getDiscoveryTV,
  getRating,
  getStreamProviders,
  getTVList,
  getTVRecommendations,
  getVideos,
  search
};

