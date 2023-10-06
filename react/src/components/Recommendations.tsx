import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import _ from "lodash";
import { Movie } from "../entities/Movie";
import CardContainer from "./CardContainer";
import MovieCard from "./movie/MovieCard";

interface Props {
  contents?: Movie[];
  isLoading: boolean;
}

const Recommendations = ({ contents, isLoading }: Props) => {
  const skeletons = _.range(5);

  if (contents?.length === 0) return null;

  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb="10">
        More Like This
      </Text>

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 4, md: 6, lg: 8 }}
        mb="4"
      >
        {isLoading &&
          skeletons.map((s) => (
            <Skeleton key={s} aspectRatio={3 / 4} borderRadius={10} />
          ))}

        {!isLoading &&
          contents?.map((content) => (
            <CardContainer key={content.id}>
              <MovieCard movie={content} />
            </CardContainer>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Recommendations;
