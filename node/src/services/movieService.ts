import axios from "axios";
import { Movie } from "../models/Movie";
import { MovieDetail } from "../models/MovieDetail";
import { Actor } from "../models/Actor";
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

async function getMovieList(listName: string) {
  let queryParams = {};
  if (listName === "upcoming") {
    queryParams = {
      "primary_release_date.gte": new Date(),
    };
  }

  return await apiClient.get<FetchMovieListResponse>(`/movie/${listName}`, {
    params: queryParams,
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

async function retrieveMovieDetail(id: number) {
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

export {
  getMovieDiscovery,
  getMovieList,
  retrieveMovieDetail,
  getMovieRating,
  getMovieCast,
  getMovieVideos,
};
