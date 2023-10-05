import { Card, Image } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import fallbackImg from "../assets/banner-placeholder.webp";
import { Movie } from "../hooks/movies/useMovies";
import { TV } from "../hooks/tv/useTV";
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
                marginX={{ sm: 2, lg: 5 }}
                shadow="md"
                borderRadius={{ sm: 5, md: 15 }}
                overflow="hidden"
                _hover={{ shadow: "lg" }}
              >
                <Image src={content.backdrop_path} fallbackSrc={fallbackImg} />
              </Card>
            </Slide>
          ))}
      </Slider>
    </CarouselProvider>
  );
};

export default ContentSlider;
