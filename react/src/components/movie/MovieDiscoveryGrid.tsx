import { Box, Text } from "@chakra-ui/react";
import {
  useDiscoveryMovieList,
  useDiscoveryMovies,
} from "../../hooks/movies/useMovies";
import ContentSlider from "../ContentSlider";
import MovieGrid from "./MovieGrid";

const MovieDiscoveryGrid = () => {
  return (
    <>
      <ContentSlider useContents={useDiscoveryMovies} />
      <Box marginTop={5}>
        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Now in Theater:
          </Text>
          <MovieGrid useMovie={() => useDiscoveryMovieList("now_playing")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Trending:
          </Text>
          <MovieGrid useMovie={() => useDiscoveryMovieList("popular")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Top Rated:
          </Text>
          <MovieGrid useMovie={() => useDiscoveryMovieList("top_rated")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Upcoming:
          </Text>
          <MovieGrid useMovie={() => useDiscoveryMovieList("upcoming")} />
        </Box>
      </Box>
    </>
  );
};

export default MovieDiscoveryGrid;
