import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import fallBackImg from "../../assets/image-placeholder.webp";
import { TVDetail } from "../../entities/TVDetail"

interface Props {
  tv: TVDetail;
}

const TVDetailHeader = ({ tv }: Props) => {

  return (
    <Box
      h={{
        base: "300px",
        md: "600px",
      }}
      background={`url(${tv.backdrop_path}) center/cover `}
      position="relative"
      zIndex="-1"
    >
      <Box
        backdropFilter="auto"
        backdropContrast="75%"
        backdropBrightness="40%"
        h="full"
        bgGradient="linear(to-b, transparent, blackAlpha.800)"
        pr={{base: 1, md: 5}}
      >
        <Flex
          justify="start"
          align="center"
          maxW="1500px"
          mx="auto"
          color="white"
          h="full"
          gap={{ base: 5, md: 10 }}
          pl={{ base: 4, md: 10 }}
        >
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
              <Text whiteSpace="nowrap">{tv.episode_run_time} MIN</Text>
              <Text fontSize={25}>
                <BsDot />
              </Text>
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
}

export default TVDetailHeader