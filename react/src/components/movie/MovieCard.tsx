import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import fallbackImg from "../../assets/image-placeholder.webp";
import Movie from "../../entities/Movie";
import { getPosterLink } from "../util/image-url";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  return (
    <Link to={"/movie/" + movie.id}>
      <VStack align="start" spacing={3}>
        <Image
          src={getPosterLink(movie.poster_path)}
          shadow="md"
          borderRadius={12}
          fallbackSrc={fallbackImg}
          objectFit="fill"
        />
        <Text fontSize="17" fontWeight="medium" paddingLeft={2}>
          {movie.title}
        </Text>
      </VStack>
    </Link>
  );
};

export default MovieCard;
