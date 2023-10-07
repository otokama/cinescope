import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TV } from "../../entities/TV";
import { FetchPaginatedResponse } from "../../services/api-client";
import CardContainer from "../CardContainer";
import CardSkeleton from "../CardSkeleton";
import TVCard from "./TVCard";

interface Props {
  useTV: () => UseInfiniteQueryResult<FetchPaginatedResponse<TV>, Error>;
}

const TVGrid = ({ useTV }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useTV();

  const skeletons = _.range(10);

  if (error) return null;

  const fetchedTotal =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedTotal}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={
          <Box textAlign="center" margin={20}>
            <Spinner />
          </Box>
        }
      >
        <SimpleGrid
          columns={{ base: 2, md: 4, lg: 5, xl: 6 }}
          spacing={{ base: 4, md: 8 }}
          marginTop={4}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {!isLoading &&
            data.pages.map((page, idx) => (
              <React.Fragment key={idx}>
                {page.results.map((tv) => (
                  <CardContainer key={tv.id}>
                    <TVCard tv={tv} />
                  </CardContainer>
                ))}
              </React.Fragment>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default TVGrid;
