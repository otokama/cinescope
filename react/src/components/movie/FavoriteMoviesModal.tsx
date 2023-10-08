import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useModalStore from "../../stores/modals";
import useAccountStore from "../../stores/user";

const FavoriteMoviesModal = () => {
  const sessionId = useAccountStore((s) => s.sessionId);
  const { showFavoriteMovie, setShowFavoriteMovie } = useModalStore();

  return (
    <>
      <Modal
        onClose={() => setShowFavoriteMovie(false)}
        size="xl"
        isOpen={showFavoriteMovie}
        isCentered
      >
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>My Favorite Movies</ModalHeader>
          <Text>{sessionId}</Text>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FavoriteMoviesModal;
