import { Genre } from "../genres/useMovieGenres";
import { Country } from "../useCountry";
import ms from "ms";
import APIClient from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";

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
  overview: string,
  popularity: number;
  poster_path: string;
  production_countries: Country[];
  release_date: string;
  runtime: number;
  spoken_languages: [
    {
      english_name: "Japanese";
      iso_639_1: "ja";
      name: "日本語";
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useMovieDetail = (movieId: number) => {
  const apiClient = new APIClient<MovieDetail>("/movie/detail/" + movieId);
  const queryStr = "movie_" + movieId;
  return useQuery<MovieDetail, Error>({
    queryKey: [queryStr],
    queryFn: apiClient.get,
    staleTime: ms("1h")
  });
}

export default useMovieDetail;