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
import { TVDetail } from "../../entities/TVDetail";
import { ToastNotification } from "../../entities/Toast";
import { useToastHook } from "../../hooks/useToast";
import {
  getAccountStates,
  updateFavoriteMedia,
} from "../../services/accountService";
import useAccountStore from "../../stores/user";

interface Props {
  tv: TVDetail;
}

const TVDetailHeader = ({ tv }: Props) => {
  const { user, sessionId } = useAccountStore();
  const [isLike, setLike] = useState(false);
  const { setToast } = useToastHook();

  useEffect(() => {
    document.title = `${tv.name} | CineScope`;
    if (user && sessionId && tv) {
      getAccountStates(sessionId, tv.id, "tv")
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
  }, [user, sessionId, tv]);

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
        "tv",
        tv.id,
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
      background={`url(${tv.backdrop_path}) center/cover `}
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
            src={tv.poster_path}
            h={{
              base: "180px",
              md: "450px",
            }}
            fallbackSrc={fallBackImg}
            borderRadius={15}
            shadow="lg"
          />
          <VStack align="start" gap="0">
            {tv.vote_count > 200 && (
              <Badge
                variant="subtle"
                px="2"
                fontSize={{ base: "xs", md: "md" }}
                colorScheme={tv.vote_average > 7 ? "green" : "yellow"}
              >
                {tv.vote_average.toFixed(1)}
              </Badge>
            )}
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}
              fontWeight="bold"
            >
              {tv.name}
            </Text>

            {tv.tagline && (
              <Text mb="5" fontStyle="italic" color="gray.200">
                {tv.tagline}
              </Text>
            )}

            <HStack
              spacing="-0.5"
              mb="3"
              color="gray.300"
              fontWeight="semibold"
              fontSize={{ base: "xs", md: "md" }}
            >
              {tv.certification && (
                <>
                  <Badge variant="outline" color="white" whiteSpace="nowrap">
                    {tv.certification}
                  </Badge>
                  <Text fontSize={25}>
                    <BsDot />
                  </Text>
                </>
              )}
              {tv.episode_run_time[0] && (
                <>
                  <Text whiteSpace="nowrap">{tv.episode_run_time[0]} MIN</Text>
                  <Text fontSize={25}>
                    <BsDot />
                  </Text>
                </>
              )}
              <Text whiteSpace="nowrap">{tv.last_air_date}</Text>
            </HStack>

            <HStack spacing="3" mb="5" wrap="wrap">
              {tv.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </HStack>

            <Show above="md">
              <VStack spacing="1.5" align="start">
                <Text fontWeight="semibold" fontSize="lg">
                  Overview
                </Text>
                <Text maxW="900px">{tv.overview}</Text>
              </VStack>
            </Show>

            {/* <Rating value={Math.ceil(movie.vote_average * 10)} /> */}
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default TVDetailHeader;
