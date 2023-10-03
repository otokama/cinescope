import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Movie } from "../../hooks/movies/useMovies";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Box>
      <VStack align="start" spacing={3}>
        <Image src={movie.poster_path} shadow="lg" borderRadius={12} />
        <Text fontSize="17" fontWeight="medium" paddingLeft={2}>
          {movie.title}
        </Text>
      </VStack>
    </Box>
  );
};

export default MovieCard;
