import { Box, Button, VStack } from "@chakra-ui/react";
import useTVListStore from "../../stores/tv-list";

const TVList = () => {
  const { tvList, setTVList } = useTVListStore();

  return (
    <>
      <Box>
        <VStack spacing={4}>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderX="4px"
            borderRightColor="transparent"
            borderLeftColor={
              tvList === "top_rated" ? "green.400" : "transparent"
            }
            fontWeight={tvList === "top_rated" ? "bold" : "medium"}
            onClick={() => setTVList("top_rated")}
          >
            Top Rated
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderX="4px"
            borderRightColor="transparent"
            borderLeftColor={
              tvList === "on_the_air" ? "green.400" : "transparent"
            }
            fontWeight={tvList === "on_the_air" ? "bold" : "medium"}
            onClick={() => setTVList("on_the_air")}
          >
            Trending
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderX="4px"
            borderRightColor="transparent"
            borderLeftColor={tvList === "popular" ? "green.400" : "transparent"}
            fontWeight={tvList === "popular" ? "bold" : "medium"}
            onClick={() => setTVList("popular")}
          >
            Airing Today
          </Button>
          <Button
            width={48}
            borderRadius="none"
            bg="transparent"
            borderX="4px"
            borderRightColor="transparent"
            borderLeftColor={
              tvList === "airing_today" ? "green.400" : "transparent"
            }
            fontWeight={tvList === "airing_today" ? "bold" : "medium"}
            onClick={() => setTVList("airing_today")}
          >
            Upcoming
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default TVList;
