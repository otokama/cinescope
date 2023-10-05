import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import fullMoonImg from "../assets/full-moon.png";
import Navbar from "../components/Navbar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Navbar onSearch={() => {}} />
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <HStack h="full">
          <Image src={fullMoonImg} alt="" boxSize={48} />
          <VStack align="start">
            {isRouteErrorResponse(error) ? (
              <>
                <Text fontSize="2xl" fontWeight="bold" color="red.500">
                  404 Not Found
                </Text>
                <Text fontSize="lg">We've looked everywhere...</Text>
              </>
            ) : (
              <>
                <Text fontSize="2xl" fontWeight="bold" color="red.500">
                  Unexpected Error Occured...
                </Text>
              </>
            )}
          </VStack>
        </HStack>
      </Flex>
    </>
  );
};

export default ErrorPage;
