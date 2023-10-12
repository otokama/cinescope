import Actor from "./Actor";
import Country from "./Country";
import Genre from "./Genre";

export default interface TVDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: Actor[];
  episode_run_time: number;
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: Country[];
  status: boolean;
  tagline: string;
  vote_average: number;
  vote_count: number;
  certification?: string;
}
