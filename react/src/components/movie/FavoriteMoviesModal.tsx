import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useFavoriteList } from "../../hooks/movies/useMovies";
import useModalStore from "../../stores/modals";
import useAccountStore from "../../stores/user";
import FavoriteMovieList from "./FavoriteMovieList";

const FavoriteMoviesModal = () => {
  const { showFavoriteMovie, setShowFavoriteMovie } = useModalStore();

  const { sessionId, user } = useAccountStore();

  return (
    <>
      <Modal
        onClose={() => setShowFavoriteMovie(false)}
        size="xl"
        isOpen={showFavoriteMovie}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalHeader>Favorite Movies</ModalHeader>
          <ModalCloseButton />
          <Box mt="2">
            <FavoriteMovieList
              useMovie={() => useFavoriteList(user!.id, "movies")}
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FavoriteMoviesModal;
