import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useMovieDetail from "../hooks/movies/useMovie";
import { useNavigate } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieDetail, isLoading, error } = useMovieDetail(parseInt(id!));
  const navigate = useNavigate();
  if (isLoading) return <LoadingPage />;

  if (error || !movieDetail) navigate("*");

  return <div>MovieDetailPage</div>;
};

export default MovieDetailPage;
