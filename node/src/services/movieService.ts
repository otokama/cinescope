import axios from "axios";
import { Actor } from "../models/Actor";
import { Movie } from "../models/Movie";
import { MovieDetail } from "../models/MovieDetail";
import { MovieSearchQuery } from "../models/MovieSearchQuery";
import { Video } from "../models/Video";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface FetchMovieListResponse {
  results: Movie[];
}

interface MovieReleaseDate {
  release_date: Date;
  certification: string;
}

interface MovieReleaseCountry {
  iso_3166_1: string;
  release_dates: MovieReleaseDate[];
}

interface FetchMovieRatingResponse {
  results: MovieReleaseCountry[];
}

interface FetchMovieCastResponse {
  cast: Actor[];
}

interface FetchMovieTrailerResponse {
  results: Video[];
}
interface FetchResultList<T> {
  results: T[];
}

async function getMovieList(listName: string, page?: string) {
  return await apiClient.get(`/movie/${listName}`, {
    params: { page },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieDiscovery() {
  const queryParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    region: "us",
    page: 1,
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
  };
  return await apiClient.get<FetchMovieListResponse>("/discover/movie", {
    params: queryParams,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getDetail(id: number) {
  return await apiClient.get<MovieDetail>(`/movie/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieRating(id: number) {
  const { data } = await apiClient.get<FetchMovieRatingResponse>(
    `/movie/${id}/release_dates`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  const releaseDatesUS = data.results.find(
    (releaseCountry) => releaseCountry.iso_3166_1 === "US"
  );

  if (releaseDatesUS && releaseDatesUS.release_dates.length > 0) {
    for (const release of releaseDatesUS.release_dates) {
      if (release.certification.length > 0) return release.certification;
    }
  }
  return null;
}

async function getMovieCast(id: number) {
  return await apiClient.get<FetchMovieCastResponse>(`/movie/${id}/credits`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieVideos(id: number) {
  return await apiClient.get<FetchMovieTrailerResponse>(`/movie/${id}/videos`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieProviders(id: number) {
  return await apiClient.get(`/movie/${id}/watch/providers`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getMovieRecommendations(id: number) {
  return await apiClient.get<FetchMovieListResponse>(
    `/movie/${id}/recommendations`,
    {
      params: { language: "en-US" },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    }
  );
}

async function search(query: MovieSearchQuery) {
  return await apiClient.get("/search/movie", {
    params: query,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getAccountStates(movieId: number, sessionId: string) {
  return await apiClient.get(`/movie/${movieId}/account_states`, {
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
  getDetail,
  getMovieCast,
  getMovieDiscovery,
  getMovieList,
  getMovieProviders,
  getMovieRating,
  getMovieRecommendations,
  getMovieVideos,
  search
};

