import { Image, Text, VStack } from "@chakra-ui/react";
import { Movie } from "../../hooks/movies/useMovies";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <>
      <VStack align="start" spacing={4}>
        <Image src={movie.poster_path} shadow="lg" borderRadius={12} />
        <Text fontSize="18">{movie.title}</Text>
      </VStack>
    </>
  );
};

export default MovieCard;
