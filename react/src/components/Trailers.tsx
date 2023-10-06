import { AspectRatio, Box, Skeleton, Text } from "@chakra-ui/react";
import { Video } from "../entities/Video";

interface Props {
  videos?: Video[];
  isLoading: boolean;
}

const Trailers = ({ videos, isLoading }: Props) => {
  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb="10">
        Trailers
      </Text>

      {isLoading && (
        <Skeleton w="800px" aspectRatio={16 / 9} borderRadius={10} />
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
            <Box display="inline-block" w="full" maxW="800px" pr={8}>
              <AspectRatio key={video.id} ratio={16 / 9} maxW="800px">
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
