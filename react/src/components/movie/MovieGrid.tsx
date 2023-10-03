import { Box, Text } from "@chakra-ui/react";
import { useDiscoveryMovies } from "../../hooks/movies/useMovies";
import MovieSubGrid from "./MovieSubGrid";

const MovieGrid = () => {
  return (
    <>
      <Box width="full">
        <Text fontSize="2xl" fontWeight="bold">
          Now in Theater:
        </Text>
        <MovieSubGrid useMovie={() => useDiscoveryMovies("now_playing")} />
      </Box>
    </>
  );
};

export default MovieGrid;
