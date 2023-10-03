import { Box, HStack, Image, useColorMode } from "@chakra-ui/react";
import logo from "../assets/video-camera.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
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
      paddingY="10px"
      shadow="md"
    >
      <Image src={logo} boxSize={10} />
      <Box maxWidth="500px" width="full">
        <SearchInput onSearch={onSearch} />
      </Box>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
