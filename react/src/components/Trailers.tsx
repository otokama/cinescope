import { AspectRatio, Box, Skeleton, Text } from "@chakra-ui/react";
import { useTrailers } from "../hooks/useTrailer";

interface Props {
  isMovie?: boolean;
  contentId: number;
}

const Trailers = ({ isMovie = true, contentId }: Props) => {
  const { data: videos, isLoading, error } = useTrailers(contentId, isMovie);

  if (error) return null;

  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb="10">
        Trailers
      </Text>

      {isLoading && 
        <Skeleton w="800px" aspectRatio={16/9} borderRadius={20} />
      }

      {!isLoading &&
        <Box
          maxW="1180px"
          overflowX="auto"
          whiteSpace="nowrap"
          id="trailer-scroller"
          position="relative"
        >
          {videos.map((video) => (
            <Box display="inline-block" w="full" maxW="800px" pr={8}>
              <AspectRatio key={video.id} ratio={16 / 9} maxW="800px">
                <iframe src={video.link} allowFullScreen />
              </AspectRatio>
            </Box>
          ))}
        </Box>
      }
    </Box>
  );
};

export default Trailers;
