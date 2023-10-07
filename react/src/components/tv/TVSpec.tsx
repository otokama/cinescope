import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { TVDetail } from "../../entities/TVDetail";

interface Props {
  tvDetail: TVDetail;
}

const TVSpec = ({ tvDetail }: Props) => {
  return (
    <Box mb="10">
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="bold"
        mb={{ base: 4, lg: 5 }}
      >
        Details
      </Text>
      <VStack align="start">
        <HStack >
          <Text>Seasons:</Text>
          <Text fontWeight="bold">{tvDetail.number_of_seasons}</Text>
        </HStack>
        <HStack>
          <Text>Status:</Text>
          <Text fontWeight="bold">{tvDetail.status}</Text>
        </HStack>
        <HStack>
          <Text>Last Air Date:</Text>
          <Text fontWeight="bold">{tvDetail.last_air_date}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TVSpec;
