import {
  Badge,
  Card,
  HStack,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import fallbackImg from "../assets/banner-placeholder.webp";
import useMovieGenres from "../hooks/genres/useMovieGenres";
import useTVGenres from "../hooks/genres/useTVGenres";
import { Movie } from "../entities/Movie";
import { TV } from "../entities/TV";
import useMediaTypeStore from "../stores/media-type";

interface Props {
  useContents: () => UseQueryResult<(Movie | TV)[], Error>;
}

const ContentSlider = ({ useContents }: Props) => {
  const { data: contents, isLoading, error } = useContents();
  const { mediaType } = useMediaTypeStore();

  if (error) return null;

  return (
    <CarouselProvider
      naturalSlideWidth={1280}
      naturalSlideHeight={720}
      totalSlides={contents?.length || 1}
      step={2}
      visibleSlides={2}
      isPlaying
      infinite
      interval={7000}
    >
      <Slider>
        {!isLoading &&
          contents?.map((content, idx) => (
            <Slide index={idx} key={idx}>
              <Card
                marginX={{ base: 2, lg: 4 }}
                shadow="md"
                borderRadius={{ sm: 5, md: 15 }}
                overflow="hidden"
                position="relative"
              >
                <Image src={content.backdrop_path} fallbackSrc={fallbackImg} />
                <Show above="md">
                  <VStack
                    position="absolute"
                    bottom={0}
                    left={0}
                    w="full"
                    bgGradient="linear(to-b, transparent, blackAlpha.900)"
                    padding={5}
                    color="whiteAlpha.900"
                    align="stretch"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="whiteAlpha.900"
                    >
                      {(content as TV).name || (content as Movie).title}
                    </Text>

                    <HStack>
                      {mediaType === "movie" && (
                        <>
                          {useMovieGenres(content.genre_ids).map((genre) => (
                            <Badge key={genre.id}>{genre.name}</Badge>
                          ))}
                        </>
                      )}
                      {mediaType === "tv" && (
                        <>
                          {useTVGenres(content.genre_ids).map((genre) => (
                            <Badge key={genre.id}>{genre.name}</Badge>
                          ))}
                        </>
                      )}
                    </HStack>
                  </VStack>
                </Show>
              </Card>
            </Slide>
          ))}
      </Slider>
    </CarouselProvider>
  );
};

export default ContentSlider;
