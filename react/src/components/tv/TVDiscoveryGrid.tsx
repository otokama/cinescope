import { Box, Show, Text } from "@chakra-ui/react";
import { useDiscoveryTVList, useDiscoveryTVs } from "../../hooks/tv/useTVList";
import ContentSlider from "../ContentSlider";
import TVGrid from "./TVGrid";
import useTVListStore from "../../stores/tv-list";

const TVDiscoveryGrid = () => {
  const tvList = useTVListStore((s) => s.tvList);

  return (
    <>
      <Show above="md">
        <ContentSlider useContents={useDiscoveryTVs} />
      </Show>
      <Box marginTop={5}>
        {tvList === "top_rated" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Top Rated
            </Text>
            <TVGrid useTV={() => useDiscoveryTVList("top_rated")} />
          </Box>
        )}

        {tvList === "popular" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Trending
            </Text>
            <TVGrid useTV={() => useDiscoveryTVList("popular")} />
          </Box>
        )}

        {tvList === "airing_today" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Airing Today
            </Text>
            <TVGrid useTV={() => useDiscoveryTVList("airing_today")} />
          </Box>
        )}

        {tvList === "on_the_air" && (
          <Box marginBottom={10}>
            <Text fontSize="3xl" fontWeight="bold">
              Upcoming
            </Text>
            <TVGrid useTV={() => useDiscoveryTVList("on_the_air")} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default TVDiscoveryGrid;
