import { Box, Divider, Spinner, VStack } from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MediaType } from "../entities/MediaType";
import { Movie } from "../entities/Movie";
import { TV } from "../entities/TV";
import { ToastNotification } from "../entities/Toast";
import { useToastHook } from "../hooks/useToast";
import { updateFavoriteMedia } from "../services/accountService";
import { FetchPaginatedResponse } from "../services/api-client";
import useAccountStore from "../stores/user";
import FavoriteMediaCard from "./FavoriteMediaCard";

interface Props {
  mediaType: MediaType;
  useMedia: () => UseInfiniteQueryResult<FetchPaginatedResponse<Movie | TV>, Error>;
}

const FavoriteMovieList = ({ useMedia, mediaType }: Props) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useMedia();
  const { user, sessionId } = useAccountStore();
  const { setToast } = useToastHook();

  if (error) return null;

  const handleToggleLike = async (
    mediaId: number,
    isLike: boolean,
    mediaType: MediaType
  ) => {
    try {
      const res = await updateFavoriteMedia(
        user!.id,
        sessionId!,
        mediaType,
        mediaId,
        isLike
      );
      if (!res.data.success) {
        throw new Error("Failed to handle update favorite");
      }

      const successToast: ToastNotification = {
        title: "Success",
        description: isLike
          ? "Phew... That was a close one!"
          : "Removed from favorite.",
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
        <Box overflowY="auto" pb={{ base: 14, sm: 5 }}>
          <VStack align="stretch" spacing={5} margin={10}>
            {!isLoading &&
              data?.pages.map((page, idx) => (
                <React.Fragment key={idx}>
                  {page.results.map((media) => (
                    <FavoriteMediaCard
                      key={media.id}
                      media={media}
                      mediaType={mediaType}
                      handleToggleLike={(mediaId, isLike, mediaType) =>
                        handleToggleLike(mediaId, isLike, mediaType)
                      }
                    />
                  ))}
                </React.Fragment>
              ))}
            <Divider maxW="90%" mx="auto" mt="5" />
          </VStack>
        </Box>
      </InfiniteScroll>
    </>
  );
};

export default FavoriteMovieList;
