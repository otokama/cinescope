import { Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import useSearchParamsStore from "../stores/search";
import MovieList from "./sidenav/MovieList";

const SideNav = () => {
  const { searchParams, setMediaType } = useSearchParamsStore();

  return (
    <Box position="relative">
      <VStack align="center" position="fixed" zIndex="10" w="250px" h="full" spacing={8}>
        <ButtonGroup isAttached  overflow="hidden">
          <Button
            width={24}
            borderRadius="sm"
            fontSize="md"
            fontWeight="bold"
            colorScheme={searchParams.mediaType === "movie" ? "blue" : "gray"}
            onClick={() => setMediaType("movie")}
          >
            Movie
          </Button>
          <Button
            width={24}
            borderRadius="sm"
            fontSize="md"
            fontWeight="bold"
            colorScheme={searchParams.mediaType === "tv" ? "red" : "gray"}
            onClick={() => setMediaType("tv")}
          >
            TV
          </Button>
        </ButtonGroup>

        <MovieList />
      
      </VStack>
      
    </Box>
  );
};

export default SideNav;
