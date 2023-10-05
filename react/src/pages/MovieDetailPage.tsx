import { useParams } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import useMovieDetail from "../hooks/movies/useMovie";
import { useNavigate } from "react-router-dom";
import MovieDetailHeader from "../components/movie/MovieDetailHeader";
import { SimpleGrid } from "@chakra-ui/react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieDetail, isLoading, error } = useMovieDetail(parseInt(id!));
  const navigate = useNavigate();
  if (isLoading) return <LoadingPage />;

  if (error || !movieDetail) return navigate("*");

  return <>
    <MovieDetailHeader movie={movieDetail}/>
    <SimpleGrid>
      
    </SimpleGrid>
  </>;
};

export default MovieDetailPage;
