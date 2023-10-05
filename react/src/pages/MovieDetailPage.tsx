import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useMovieDetail from "../hooks/movies/useMovie";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieDetail, isLoading, error } = useMovieDetail(parseInt(id!));

  if (isLoading) return <LoadingPage />;

  if (error || !movieDetail) throw error;

  return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;
