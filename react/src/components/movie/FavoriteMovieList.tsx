import { Box, Divider, Spinner, VStack } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Movie } from "../../entities/Movie";
import { ToastNotification } from "../../entities/Toast";
import { useToastHook } from "../../hooks/useToast";
import { updateFavoriteMedia } from "../../services/accountService";
import { FetchPaginatedResponse } from "../../services/api-client";
import useModalStore from "../../stores/modals";
import useAccountStore from "../../stores/user";
import FavoriteMovieCard from "./FavoriteMovieCard";

interface Props {
  useMovie: () => UseInfiniteQueryResult<FetchPaginatedResponse<Movie>, Error>;
}

const FavoriteMovieList = ({ useMovie }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useMovie();
  const user = useAccountStore((s) => s.user);
  const { setToast } = useToastHook();
  const { setShowFavoriteMovie } = useModalStore();

  if (error) return null;

  const handleToggleLike = async (movieId: number, isLike: boolean) => {
    try {
      const res = await updateFavoriteMedia(user!.id, "movie", movieId, isLike);
      if (!res.data.success) {
        throw new Error("Failed to handle update favorite");
      }
      
      const successToast: ToastNotification = {
        title: "Success",
        description: isLike ? "Phew... That was a close one!" : "Removed from favorite.",
        status: "success",
        duration: 5000,
      };
      setToast(successToast);
    } catch (err) {
      console.error(err);
      const errorToast: ToastNotification = {
        title: "Failed",
        description: "Failed to update favorite. Try again later.",
        status: "error",
        duration: 5000,
      };
      setToast(errorToast);
    }
  };

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
        <Box maxH="700px" overflowY="auto" pb={{base: 14, sm: 5}}>
          <VStack align="stretch" spacing={5} margin={10} >
            {!isLoading &&
              data?.pages.map((page, idx) => (
                <React.Fragment key={idx}>
                  {page.results.map((movie) => (
                    <FavoriteMovieCard
                      key={movie.id}
                      movie={movie}
                      onClickMovie={() => setShowFavoriteMovie(false)}
                      onToggleLike={(isLike) =>
                        handleToggleLike(movie.id, isLike)
                      }
                    />
                  ))}
                </React.Fragment>
              ))}
              <Divider maxW="90%" mx="auto" mt="5"  /> 
          </VStack>
        </Box>
      </InfiniteScroll>
    </>
  );
};

export default FavoriteMovieList;
