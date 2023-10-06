import { useMovieRecommendation } from "../../hooks/movies/useMovies";
import Recommendations from "../Recommendations";

interface Props {
  movieId: number;
}

const MovieRecommendations = ({movieId}: Props) => {

  const {data: movies, isLoading, error} = useMovieRecommendation(movieId);

  if (error) return null;

  return (
    <>
      <Recommendations contents={movies} isLoading={isLoading} />
    </>
  )
}

export default MovieRecommendations