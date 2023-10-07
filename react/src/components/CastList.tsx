import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import _ from "lodash";
import useCredit from "../hooks/useCredits";
import ActorCard from "./ActorCard";
import ActorSkeleton from "./ActorSkeleton";

interface Props {
  contentId: number;
  isMovie: boolean;
}

const CastList = ({ contentId, isMovie }: Props) => {
  const { data: cast, isLoading, error } = useCredit(contentId, isMovie);

  if (error) return null;

  const skeletons = _.range(10);
  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
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
