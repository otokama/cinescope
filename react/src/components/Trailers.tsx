import { AspectRatio, Box, Skeleton, Text } from "@chakra-ui/react";
import Video from "../entities/Video";

interface Props {
  videos?: Video[];
  isLoading: boolean;
}

const Trailers = ({ videos, isLoading }: Props) => {
  if (videos?.length === 0) return null;

  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" mb="5">
        Trailers & Teasers
      </Text>

      {isLoading && (
        <Skeleton w="400px" aspectRatio={16 / 9} borderRadius={10} />
      )}

      {!isLoading && videos && (
        <Box
          maxW="1180px"
          overflowX="auto"
          whiteSpace="nowrap"
          id="trailer-scroller"
          position="relative"
        >
          {videos.map((video) => (
            <Box
              key={video.id}
              display="inline-block"
              w="full"
              maxW="800px"
              pr={8}
            >
              <AspectRatio ratio={16 / 9}>
                <iframe src={video.link} allowFullScreen />
              </AspectRatio>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Trailers;
