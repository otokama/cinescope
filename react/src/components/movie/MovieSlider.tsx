import { HStack } from "@chakra-ui/react";
import _ from "lodash";
import { useNowPlayingMovies } from "../../hooks/movies/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieSlider = () => {
  const { data: movies, isLoading, error } = useNowPlayingMovies();

  const skeletons = _.range(10);
  
  if (error) return null;

  return (
    <>
      <HStack spacing={7}>
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
      </HStack>
    </>
  );
};

export default MovieSlider;
