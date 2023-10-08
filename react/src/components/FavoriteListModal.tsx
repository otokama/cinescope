import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useFavoriteList } from "../hooks/movies/useMovies";
import useModalStore from "../stores/modals";
import useAccountStore from "../stores/user";
import FavoriteMovieList from "./FavoriteList";

const FavoriteListModal = () => {
  const { showFavoriteList, setShowFavoriteList } = useModalStore();

  const user = useAccountStore((s) => s.user);

  return (
    <>
      <Modal
        onClose={() => setShowFavoriteList(false)}
        size="xl"
        isOpen={showFavoriteList}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalHeader>My Favorites</ModalHeader>
          <ModalCloseButton />
          <Box px={{ base: "2", md: "5" }}>
            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab>Movies</Tab>
                <Tab>TV Show</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel px="0">
                  <Box h="700px">
                    <FavoriteMovieList
                      mediaType={"movie"}
                      useMedia={() => useFavoriteList(user!.id, "movies")}
                    />
                  </Box>
                </TabPanel>
                <TabPanel px="0">
                  <Box h="700px">
                  <FavoriteMovieList
                      mediaType={"tv"}
                      useMedia={() => useFavoriteList(user!.id, "tv")}
                    />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FavoriteListModal;
