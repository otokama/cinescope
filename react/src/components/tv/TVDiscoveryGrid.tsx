import { Box, Text } from "@chakra-ui/react";
import { useDiscoveryTV } from "../../hooks/tv/useTV";
import TVGrid from "./TVGrid";

const TVDiscoveryGrid = () => {
  return (
    <>
      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Airing Today:
        </Text>
        <TVGrid useTV={() => useDiscoveryTV("airing_today")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Trending:
        </Text>
        <TVGrid useTV={() => useDiscoveryTV("popular")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Top Rated:
        </Text>
        <TVGrid useTV={() => useDiscoveryTV("top_rated")} />
      </Box>

      <Box marginBottom={10}>
        <Text fontSize="3xl" fontWeight="bold">
          Upcoming:
        </Text>
        <TVGrid useTV={() => useDiscoveryTV("on_the_air")} />
      </Box>
    </>
  );
};

export default TVDiscoveryGrid;
