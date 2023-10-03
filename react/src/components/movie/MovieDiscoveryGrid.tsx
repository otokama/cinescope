import { Box, Text } from "@chakra-ui/react";
import { useDiscoveryMovies } from "../../hooks/movies/useMovies";
import MovieGrid from "./MovieGrid";

const MovieDiscoveryGrid = () => {
  return (
    <>
      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Now in Theater:
        </Text>
        <MovieGrid useMovie={() => useDiscoveryMovies("now_playing")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Trending:
        </Text>
        <MovieGrid useMovie={() => useDiscoveryMovies("popular")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Top Rated:
        </Text>
        <MovieGrid useMovie={() => useDiscoveryMovies("top_rated")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Upcoming:
        </Text>
        <MovieGrid useMovie={() => useDiscoveryMovies("upcoming")} />
      </Box>
    </>
  );
};

export default MovieDiscoveryGrid;
