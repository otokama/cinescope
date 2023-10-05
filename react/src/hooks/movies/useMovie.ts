import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient from "../../services/api-client";
import { Genre } from "../genres/useMovieGenres";
import { Country } from "../useCountry";

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: Country[];
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useMovieDetail = (movieId: number) => {
  const apiClient = new APIClient<MovieDetail>("/movie/detail/" + movieId);
  return useQuery<MovieDetail, Error>({
    queryKey: ["movie", movieId],
    queryFn: apiClient.get,
    staleTime: ms("1h"),
  });
};

export default useMovieDetail;
