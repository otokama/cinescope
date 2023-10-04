import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Movie } from "../../hooks/movies/useMovies";
import fallbackImg from "../../assets/image-placeholder.webp";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Box>
      <VStack align="start" spacing={3}>
        <Image
          src={movie.poster_path}
          shadow="md"
          borderRadius={12}
          fallbackSrc={fallbackImg}
          objectFit="fill"
        />
        <Text fontSize="17" fontWeight="medium" paddingLeft={2}>
          {movie.title}
        </Text>
      </VStack>
    </Box>
  );
};

export default MovieCard;
