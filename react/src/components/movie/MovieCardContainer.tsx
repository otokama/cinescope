import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieCardContainer = ({ children }: Props) => {
  return (
    <Box overflow="hidden" width="230px">
      {children}
    </Box>
  );
};

export default MovieCardContainer;