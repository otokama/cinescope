import { Box, Button, VStack } from "@chakra-ui/react";
import useMovieListStore from "../../stores/movie-list";

const MovieList = () => {
  const { movieList, setMovieList } = useMovieListStore();

  return (
    <>
      <Box>
        <VStack spacing={4}>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderLeft="4px"
            borderLeftColor={
              movieList === "now_playing" ? "green.400" : "transparent"
            }
            fontWeight={movieList === "now_playing" ? "bold" : "medium"}
            onClick={() => setMovieList("now_playing")}
          >
            Now Playing
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderLeft="4px"
            borderLeftColor={
              movieList === "popular" ? "green.400" : "transparent"
            }
            fontWeight={movieList === "popular" ? "bold" : "medium"}
            onClick={() => setMovieList("popular")}
          >
            Trending
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderLeft="4px"
            borderLeftColor={
              movieList === "top_rated" ? "green.400" : "transparent"
            }
            fontWeight={movieList === "top_rated" ? "bold" : "medium"}
            onClick={() => setMovieList("top_rated")}
          >
            Top Rated
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderLeft="4px"
            borderLeftColor={
              movieList === "upcoming" ? "green.400" : "transparent"
            }
            fontWeight={movieList === "upcoming" ? "bold" : "medium"}
            onClick={() => setMovieList("upcoming")}
          >
            Upcoming
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default MovieList;
