import { SimpleGrid } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { Movie } from "../../entities/Movie";
import MovieCard from "./MovieCard";
import CardContainer from "../CardContainer";
import CardSkeleton from "../CardSkeleton";

interface Props {
  useMovie: () => UseQueryResult<Movie[], Error>;
}

const MovieGrid = ({ useMovie }: Props) => {
  const { data: movies, isLoading, error } = useMovie();

  const skeletons = _.range(10);

  if (error) return null;

  return (
    <SimpleGrid
      columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
      spacing={{ base: 4, md: 8 }}
      marginTop={4}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton />
          </CardContainer>
        ))}
      {!isLoading &&
        movies?.map((movie) => (
          <CardContainer key={movie.id}>
            <MovieCard key={movie.id} movie={movie} />
          </CardContainer>
        ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
