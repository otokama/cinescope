import {
  Badge,
  Button,
  Card,
  HStack,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiDislikeFill, RiHeartLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import fallbackImg from "../../assets/image-placeholder.webp";
import { Movie } from "../../entities/Movie";
import useMovieGenre from "../../hooks/genres/useMovieGenres";
import { getPosterLink } from "../util/image-url";

interface Props {
  movie: Movie;
  onClickMovie: () => void;
  onToggleLike: (isLike: boolean) => void;
}

const FavoriteMovieCard = ({ movie, onClickMovie, onToggleLike }: Props) => {
  const [like, setLike] = useState(true);

  const handleLike = (e: React.MouseEvent) => {
    onToggleLike(!like);
    setLike(!like);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <Link to={"/movie/" + movie.id} onClick={onClickMovie}>
        <Card
          key={movie.id}
          direction="row"
          overflow="hidden"
          variant="outline"
          borderRadius="15"
          gap={{ base: 5, md: 8 }}
          shadow="md"
          h="170px"
          _hover={{
            transform: "scale(1.02)",
            transition: "transform .2s ease-in",
          }}
        >
          <Image
            objectFit="cover"
            maxW="120px"
            src={
              movie.poster_path ? getPosterLink(movie.poster_path) : fallbackImg
            }
          />
          <VStack align="start" justify="center">
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="semibold"
              mb="-1"
            >
              {movie.title}
            </Text>
            {movie.release_date && (
              <Text fontSize={{ base: "xs", md: "md" }}>
                {movie.release_date.split("-")[0]}
              </Text>
            )}
            {movie.vote_count > 200 ? (
              <Badge
                variant="subtle"
                px="2"
                fontSize={{ base: "xs", md: "md" }}
                colorScheme={movie.vote_average > 7 ? "green" : "yellow"}
              >
                {movie.vote_average.toFixed(1)}
              </Badge>
            ) : (
              <Badge
                variant="subtle"
                px="2"
                fontSize={{ base: "xs", md: "md" }}
                colorScheme="gray"
              >
                NA
              </Badge>
            )}
            <Show above="md">
              <HStack spacing="3" mb="5" wrap="wrap">
                {useMovieGenre(movie.genre_ids).map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </HStack>
            </Show>
          </VStack>
          <Button
            p="2"
            fontSize="sm"
            textColor="red.400"
            mr="0"
            ml="auto"
            mt="0"
            mb="auto"
            borderRadius="none"
            borderEndStartRadius={15}
            onClick={handleLike}
          >
            {like ? <RiDislikeFill /> : <RiHeartLine />}
          </Button>
        </Card>
      </Link>
    </>
  );
};

export default FavoriteMovieCard;
