import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import Movie from "../../entities/Movie";
import CardContainer from "../CardContainer";
import CardSkeleton from "../CardSkeleton";
import MovieCard from "./MovieCard";
import { FetchPaginatedResponse } from "../../services/api-client";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  useMovie: () => UseInfiniteQueryResult<FetchPaginatedResponse<Movie>, Error>;
}

const MovieGrid = ({ useMovie }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useMovie();

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
          p={2}
          overflow="hidden"
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
                {page.results.map((movie) => (
                  <CardContainer key={movie.id}>
                    <MovieCard movie={movie} />
                  </CardContainer>
                ))}
              </React.Fragment>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default MovieGrid;
