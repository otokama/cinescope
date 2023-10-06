import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import _ from "lodash";
import { Actor } from "../entities/Actor";
import ActorCard from "./ActorCard";
import ActorSkeleton from "./ActorSkeleton";

interface Props {
  cast?: Actor[];
  isLoading: boolean;
}

const CastList = ({ cast, isLoading }: Props) => {
  const skeletons = _.range(10);
  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
        Top Cast
      </Text>
      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
        spacing={{ base: 2, sm: 3, md: 4, lg: 5, xl: 8 }}
        marginTop={10}
      >
        {isLoading && skeletons.map((s) => <ActorSkeleton key={s} />)}

        {!isLoading &&
          cast &&
          cast.map((actor) => <ActorCard key={actor.id} actor={actor} />)}
      </SimpleGrid>
    </Box>
  );
};

export default CastList;
