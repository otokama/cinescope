import { Box, HStack, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/video-camera.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      position="fixed"
      justify="space-between"
      top="0"
      width="full"
      zIndex={20}
      bgColor={colorMode === "dark" ? "gray.600" : "gray.100"}
      paddingX="15px"
      h="16"
      shadow="md"
    >
      <Link to="/">
        <Box boxSize={10}>
          <Image
            src={logo}
            _hover={{
              transform: "scale(1.1)",
              transition: "transform .15s ease-in",
            }}
          />
        </Box>
      </Link>
      <Box maxWidth="500px" width="full">
        <SearchInput />
      </Box>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
