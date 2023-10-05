import { Flex, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex h="90vh" justify="center" align="center">
      <Spinner size="xl" speed="0.8s" thickness="4px" />
    </Flex>
  );
};

export default LoadingPage;
