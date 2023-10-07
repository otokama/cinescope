import { Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import useSearchParamsStore from "../stores/search";

const SideNav = () => {
  const { searchParams, setMediaType } = useSearchParamsStore();

  return (
    <Box position="relative">
      <VStack align="center" position="fixed" zIndex="10" w="250px" h="full">
        <ButtonGroup isAttached borderRadius="2xl" overflow="hidden">
          <Button
            width={24}
            fontSize="md"
            fontWeight="bold"
            colorScheme={searchParams.mediaType === "movie" ? "blue" : "gray"}
            onClick={() => setMediaType("movie")}
          >
            Movie
          </Button>
          <Button
            width={24}
            fontSize="md"
            fontWeight="bold"
            colorScheme={searchParams.mediaType === "tv" ? "red" : "gray"}
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
