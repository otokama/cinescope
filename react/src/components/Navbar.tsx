import {
  Box,
  Flex,
  HStack,
  Image,
  useColorMode
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../assets/video-camera.png";
import useAccountStore from "../stores/user";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import UserAvatarMenu from "./UserAvatarMenu";
import UserLogin from "./UserLogin";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const user = useAccountStore((s) => s.user);
  return (
    <Flex
      justify="center"
      align="center"
      position="fixed"
      top="0"
      w="full"
      h={16}
      zIndex={20}
      bgColor={colorMode === "dark" ? "gray.600" : "gray.100"}
      paddingX={4}
      gap="5"
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
      <Box maxWidth="500px" w="full">
        <SearchInput />
      </Box>
      <HStack mr={0} ml="auto" gap={5}>
        <ColorModeSwitch />
        <>
          {!user && <UserLogin />}
          {user && <UserAvatarMenu />}
        </>
      </HStack>
    </Flex>
  );
};

export default Navbar;
