import { SimpleGrid } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import { TV } from "../../entities/TV";
import CardContainer from "../CardContainer";
import CardSkeleton from "../CardSkeleton";
import TVCard from "./TVCard";

interface Props {
  useTV: () => UseQueryResult<TV[], Error>;
}

const TVGrid = ({ useTV }: Props) => {
  const { data: movies, isLoading, error } = useTV();

  const skeletons = _.range(10);

  if (error) return null;

  return (
    <SimpleGrid
      columns={{ sm: 2, md: 4, lg: 5, xl: 6 }}
      spacing={{ sm: 4, md: 8 }}
      marginTop={4}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <CardContainer key={skeleton}>
            <CardSkeleton />
          </CardContainer>
        ))}
      {!isLoading &&
        movies?.map((tv) => (
          <CardContainer key={tv.id}>
            <TVCard key={tv.id} tv={tv} />
          </CardContainer>
        ))}
    </SimpleGrid>
  );
};

export default TVGrid;
