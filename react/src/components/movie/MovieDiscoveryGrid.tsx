import { Box, Show, Text } from "@chakra-ui/react";
import {
  useDiscoveryMovieList,
  useDiscoveryMovies,
} from "../../hooks/movies/useMovies";
import useMovieListStore from "../../stores/movie-list";
import ContentSlider from "../ContentSlider";
import MovieGrid from "./MovieGrid";

const MovieDiscoveryGrid = () => {
  const movieList = useMovieListStore((s) => s.movieList);

  return (
    <>
      <Show above="md">
        <ContentSlider useContents={useDiscoveryMovies} />
      </Show>
      <Box marginTop={5}>
        {movieList === "now_playing" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Now in Theater:
            </Text>
            <MovieGrid useMovie={() => useDiscoveryMovieList("now_playing")} />
          </Box>
        )}

        {movieList === "popular" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Trending:
            </Text>
            <MovieGrid useMovie={() => useDiscoveryMovieList("popular")} />
          </Box>
        )}

        {movieList === "top_rated" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Top Rated:
            </Text>
            <MovieGrid useMovie={() => useDiscoveryMovieList("top_rated")} />
          </Box>
        )}

        {movieList === "upcoming" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Upcoming:
            </Text>
            <MovieGrid useMovie={() => useDiscoveryMovieList("upcoming")} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MovieDiscoveryGrid;
