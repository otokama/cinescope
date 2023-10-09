import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import tmdbLogo from "../assets/tmdb-logo.svg";
import { requestSession } from "../services/sessionService";

const UserLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loadingRequestSession, setLoadingRequestSession] = useState(false);

  const onLogin = async () => {
    setLoadingRequestSession(true);
    try {
      const authLink = await requestSession();
      if (authLink) {
        window.location.href = authLink;
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: "Failed to request new session. Please try again later.",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setTimeout(() => {
        setLoadingRequestSession(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center" pb="10" pt="2">
              <Button
                colorScheme="cyan"
                variant="outline"
                w={52}
                p={6}
                gap={4}
                border="2px"
                borderRadius={12}
                onClick={onLogin}
              >
                {loadingRequestSession ? (
                  "Redirecting..."
                ) : (
                  <>
                    <Text fontSize="lg">Login with</Text>
                    <Image src={tmdbLogo} h={6} w="fit-content" />
                  </>
                )}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserLogin;
