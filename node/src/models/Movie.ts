import { Country } from "./Country";
import { Genre } from "./Genre";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
}

