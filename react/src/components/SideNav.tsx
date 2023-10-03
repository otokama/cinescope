import { Box, Button, ButtonGroup } from "@chakra-ui/react";

interface Props {
  showMovie: boolean;
  setShowMovie: (showMovie: boolean) => void;
}

const SideNav = ({ showMovie, setShowMovie }: Props) => {
  return (
    <>
      <Box textAlign="center">
        <ButtonGroup isAttached marginTop={2} borderRadius="2xl" overflow="hidden">
          <Button
            width={20}
            fontSize="md"
            fontWeight="bold"
            colorScheme={showMovie ? "blue" : "gray"}
            onClick={() => setShowMovie(true)}
            
          >
            Movie
          </Button>
          <Button
            width={20}
            fontSize="md"
            fontWeight="bold"
            colorScheme={!showMovie ? "red" : "gray"}
            onClick={() => setShowMovie(false)}
          >
            TV
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default SideNav;
