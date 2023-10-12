export default interface TV {
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
