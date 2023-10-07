import { Button, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} bgColor="transparent" size="md" rounded="full" padding={0}>
      {colorMode === "dark" ? <FaSun/> : <FaMoon/>}
    </Button>
  );
};

export default ColorModeSwitch;
