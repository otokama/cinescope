import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useRequestSession from "../hooks/useRequestSession";
import useAccountStore from "../stores/user";

const SessionAuthPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAccountStore();
  const { error } = useRequestSession(searchParams.get("request_token")!);
  const navigate = useNavigate();

  if (error) {
    navigate("*");
    return null;
  }

  if (user) {
    setTimeout(() => {
      navigate("/");
      return null;
    }, 500);
  }

  return (
    <>
      <Flex h="90vh" justify="center" align="center" flexDir="column" gap="4">
        {!user &&
          <Box>
            <Text fontSize="3xl">Logging in...</Text>
            <Text>Don't close this window</Text>
          </Box>
        }
        {user &&
          <Box>
            <Text fontSize="3xl">Redirecting to home...</Text>
          </Box>
        }
      </Flex>
    </>
  );
};

export default SessionAuthPage;
