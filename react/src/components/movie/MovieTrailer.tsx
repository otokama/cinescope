import useTrailers from "../../hooks/useTrailer";
import Trailers from "../Trailers";

interface Props {
  movieId: number;
}

const MovieTrailer = ({ movieId }: Props) => {
  const { data: videos, isLoading, error } = useTrailers(movieId, true);

  if (error) return null;

  return <Trailers videos={videos} isLoading={isLoading} />;
};

export default MovieTrailer;
