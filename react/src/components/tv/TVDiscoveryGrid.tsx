import { Box, Show, Text } from "@chakra-ui/react";
import { useDiscoveryTVList, useDiscoveryTVs } from "../../hooks/tv/useTV";
import ContentSlider from "../ContentSlider";
import TVGrid from "./TVGrid";

const TVDiscoveryGrid = () => {
  return (
    <>
      <Show above="md">
        <ContentSlider useContents={useDiscoveryTVs} />
      </Show>
      <Box marginTop={5}>
        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Top Rated TV Shows:
          </Text>
          <TVGrid useTV={() => useDiscoveryTVList("top_rated")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Trending:
          </Text>
          <TVGrid useTV={() => useDiscoveryTVList("popular")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Airing Today:
          </Text>
          <TVGrid useTV={() => useDiscoveryTVList("airing_today")} />
        </Box>

        <Box marginBottom={10}>
          <Text fontSize="3xl" fontWeight="bold">
            Upcoming:
          </Text>
          <TVGrid useTV={() => useDiscoveryTVList("on_the_air")} />
        </Box>
      </Box>
    </>
  );
};

export default TVDiscoveryGrid;
