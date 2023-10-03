import { Box, Text } from "@chakra-ui/react";
import { useNowPlayingMovies } from "../../hooks/movies/useMovies";
import MovieSubGrid from "./MovieSubGrid";

const MovieGrid = () => {
  return (
    <>
      <Box width="full">
        <Text fontSize="2xl" fontWeight="bold">
          Now in Theater:
        </Text>
        <MovieSubGrid useMovie={useNowPlayingMovies} />
      </Box>
    </>
  );
};

export default MovieGrid;
