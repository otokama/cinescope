import { Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import useMediaTypeStore from "../stores/media-type";

const SideNav = () => {
  const { mediaType, setMediaType } = useMediaTypeStore();

  return (
    <Box position="relative">
      <VStack align="center" position="fixed" zIndex="10" w="240px" h="full">
        <ButtonGroup isAttached borderRadius="2xl" overflow="hidden">
          <Button
            width={24}
            fontSize="md"
            fontWeight="bold"
            colorScheme={mediaType === "movie" ? "blue" : "gray"}
            onClick={() => setMediaType("movie")}
          >
            Movie
          </Button>
          <Button
            width={24}
            fontSize="md"
            fontWeight="bold"
            colorScheme={mediaType === "tv" ? "red" : "gray"}
            onClick={() => setMediaType("tv")}
          >
            TV
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default SideNav;
