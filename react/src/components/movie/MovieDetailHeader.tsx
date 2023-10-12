import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import fallBackImg from "../../assets/image-placeholder.webp";
import MovieDetail from "../../entities/MovieDetail";
import ToastNotification from "../../entities/Toast";
import { useToastHook } from "../../hooks/useToast";
import {
  getAccountStates,
  updateFavoriteMedia,
} from "../../services/accountService";
import useAccountStore from "../../stores/user";
import { getBackdropLink, getPosterLink } from "../util/image-url";

interface Props {
  movie: MovieDetail;
}

const MovieDetailHeader = ({ movie }: Props) => {
  const { user, sessionId } = useAccountStore();
  const [isLike, setLike] = useState(false);
  const { setToast } = useToastHook();

  useEffect(() => {
    document.title = `${movie.title} | CineScope`;
    if (user && sessionId && movie) {
      getAccountStates(sessionId, movie.id, "movie")
        .then((res) => {
          const { favorite } = res.data;
          setLike(favorite);
        })
        .catch((err) => {
          console.error(err);
          const errorToast: ToastNotification = {
            title: "Couldn't get account state",
            description: String(err),
            status: "error",
            duration: 5000,
          };
          setToast(errorToast);
        });
    }
  }, [user, sessionId, movie]);

  const onClickLike = async (isLike: boolean) => {
    if (!user || !sessionId) {
      const errorToast: ToastNotification = {
        title: "Account Required",
        description: "Login to start saving your favorite movies and TV!",
        status: "warning",
        duration: 4000,
      };
      setToast(errorToast);
      return;
    }

    setLike(isLike);
    try {
      const res = await updateFavoriteMedia(
        user.id,
        sessionId,
        "movie",
        movie.id,
        isLike
      );
      if (res.data.success) {
        const successToast: ToastNotification = {
          title: "Success",
          description: isLike ? "Added to favorite!" : "Removed from favorite.",
          status: "success",
          duration: 5000,
        };
        setToast(successToast);
      } else {
        throw new Error("Failed to update favorite.");
      }
    } catch (err) {
      const errorToast: ToastNotification = {
        title: "Failed",
        description: "Failed to update favorite. Try again later.",
        status: "error",
        duration: 5000,
      };
      setToast(errorToast);
      console.error(err);
    }
  };

  return (
    <Box
      h={{
        base: "300px",
        md: "600px",
      }}
      background={`url(${getBackdropLink(movie.backdrop_path)}) center/cover `}
    >
      <Box
        backdropFilter="auto"
        backdropContrast="75%"
        backdropBrightness="40%"
        h="full"
        bgGradient="linear(to-b, transparent, blackAlpha.800)"
        pr={{ md: "5" }}
      >
        <Flex
          justify="start"
          align="center"
          maxW="1500px"
          mx="auto"
          color="white"
          h="full"
          gap={{ base: "5", md: "10" }}
          pl={{ base: "4", md: "10" }}
          position="relative"
        >
          <Button
            position="absolute"
            top={{ base: "4", md: "20" }}
            right={{ base: "4", md: "20" }}
            size={{ base: "sm", md: "md" }}
            leftIcon={isLike ? <RiHeartFill /> : <RiHeartLine />}
            onClick={() => onClickLike(!isLike)}
            colorScheme="pink"
          >
            {isLike ? "Remove" : "Favorite"}
          </Button>
          <Image
            src={getPosterLink(movie.poster_path)}
            h={{
              base: "180px",
              md: "450px",
            }}
            fallbackSrc={fallBackImg}
            borderRadius={15}
            shadow="lg"
          />
          <VStack align="start" gap="0">
            {movie.vote_count > 200 && (
              <Badge
                variant="subtle"
                px="2"
                fontSize={{ base: "xs", md: "md" }}
                colorScheme={movie.vote_average > 7 ? "green" : "yellow"}
              >
                {movie.vote_average.toFixed(1)}
              </Badge>
            )}
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
              fontWeight="bold"
            >
              {movie.title}
            </Text>

            {movie.tagline && (
              <Text mb="5" fontStyle="italic" color="gray.200">
                {movie.tagline}
              </Text>
            )}

            <HStack
              spacing="-0.5"
              mb="3"
              color="gray.300"
              fontWeight="semibold"
              fontSize={{ base: "xs", md: "md" }}
            >
              {movie.certification && (
                <>
                  <Badge variant="outline" color="white" whiteSpace="nowrap">
                    {movie.certification}
                  </Badge>
                  <Text fontSize={25}>
                    <BsDot />
                  </Text>
                </>
              )}
              {movie.runtime && (
                <>
                  <Text whiteSpace="nowrap">{movie.runtime} MIN</Text>

                  <Text fontSize={25}>
                    <BsDot />
                  </Text>
                </>
              )}
              <Text whiteSpace="nowrap">{movie.release_date}</Text>
            </HStack>

            <HStack spacing="3" mb="5" wrap="wrap">
              {movie.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </HStack>

            <Show above="md">
              <VStack spacing="1.5" align="start">
                <Text fontWeight="semibold" fontSize="lg">
                  Overview
                </Text>
                <Text maxW="900px">{movie.overview}</Text>
              </VStack>
            </Show>

            {/* <Rating value={Math.ceil(movie.vote_average * 10)} /> */}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieDetailHeader;
