import { SimpleGrid } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { Movie } from "../../hooks/movies/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  useMovie: () => UseQueryResult<Movie[], Error>;
}

const MovieSubGrid = ({ useMovie }: Props) => {
  const { data: movies, isLoading, error } = useMovie();

  const skeletons = _.range(10);

  if (error) return null;

  return (
    <SimpleGrid
      columns={{ sm: 2, md: 4, lg: 5, xl: 6 }}
      spacing={{ sm: 4, md: 8 }}
      marginTop={4}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
        ))}
      {!isLoading &&
        movies?.map((movie) => (
          <MovieCardContainer key={movie.id}>
            <MovieCard key={movie.id} movie={movie} />
          </MovieCardContainer>
        ))}
    </SimpleGrid>
  );
};

export default MovieSubGrid;
