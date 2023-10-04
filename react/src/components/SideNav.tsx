import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import useMediaTypeStore from "../stores/media-type";

const SideNav = () => {

  const { mediaType, setMediaType } = useMediaTypeStore();

  return (
    <>
      <Box textAlign="center">
        <ButtonGroup isAttached marginTop={2} borderRadius="2xl" overflow="hidden">
          <Button
            width={20}
            fontSize="md"
            fontWeight="bold"
            colorScheme={mediaType === "movie" ? "blue" : "gray"}
            onClick={() => setMediaType("movie")}
            paddingTop={0.5}
          >
            Movie
          </Button>
          <Button
            width={20}
            fontSize="md"
            fontWeight="bold"
            colorScheme={mediaType === "tv" ? "red" : "gray"}
            onClick={() => setMediaType("tv")}
            paddingTop={0.5}
          >
            TV
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default SideNav;
