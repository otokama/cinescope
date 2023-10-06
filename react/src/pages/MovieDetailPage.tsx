import { Grid, GridItem, Show } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CastList from "../components/CastList";
import LoadingPage from "../components/LoadingPage";
import MovieDetailHeader from "../components/movie/MovieDetailHeader";
import { useMovieCredit, useMovieDetail } from "../hooks/movies/useMovie";

const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = parseInt(id!);
  const {
    data: movieDetail,
    isLoading: isLoadingDetail,
    error: movieDetailError,
  } = useMovieDetail(movieId);
  const {
    data: cast,
    isLoading: isLoadingCredits,
    error: creditsLoadingError,
  } = useMovieCredit(movieId);

  const navigate = useNavigate();
  if (isLoadingDetail) return <LoadingPage />;

  if (movieDetailError || !movieDetail) {
    navigate("*");
    return <></>;
  }

  return (
    <>
      <MovieDetailHeader movie={movieDetail} />
      <Grid
        maxW="1500px"
        mx="auto"
        pl={{ base: 4, md: 10 }}
        templateAreas={{
          base: `"main"`,
          lg: `"main aside"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 250px",
        }}
      >
        <GridItem area="main" paddingTop={10} pr={5}>
          {!isLoadingCredits && !creditsLoadingError && cast && (
            <CastList cast={cast} isLoading={isLoadingCredits} />
          )}
        </GridItem>
        <Show above="lg">
          <GridItem area="aside" paddingTop={10}>
            <p>aside here</p>
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default MovieDetailPage;
