import { useMovieCredit } from "../../hooks/movies/useMovie";
import CastList from "../CastList";

interface Props {
  movieId: number;
}

const MovieCredit = ({ movieId }: Props) => {
  const { data: cast, isLoading, error } = useMovieCredit(movieId);

  if (error || !cast) return null;

  return <CastList cast={cast} isLoading={isLoading} />;
};

export default MovieCredit;
