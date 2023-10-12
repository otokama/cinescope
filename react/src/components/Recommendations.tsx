import { Box, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import _ from "lodash";
import Movie from "../entities/Movie";
import TV from "../entities/TV";
import useRecommendation from "../hooks/useRecommendation";
import CardContainer from "./CardContainer";
import MovieCard from "./movie/MovieCard";
import TVCard from "./tv/TVCard";

interface Props {
  contentId: number;
  isMovie: boolean;
}

const Recommendations = ({ contentId, isMovie }: Props) => {
  let {
    data: contents,
    isLoading,
    error,
  } = useRecommendation(contentId, isMovie);

  const skeletons = _.range(5);

  if (error || contents?.length === 0) return null;

  return (
    <Box mb="10">
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" mb="10">
        You Might Also Like
      </Text>

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4 }}
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
              {isMovie ? (
                <MovieCard movie={content as Movie} />
              ) : (
                <TVCard tv={content as TV} />
              )}
            </CardContainer>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Recommendations;
