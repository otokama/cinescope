import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

interface Props {
  value: number;
}

const Rating = ({ value }: Props) => {
  return (
    <Box w="fit-content">
      <CircularProgress
        rounded="full"
        bg="blackAlpha.800"
        backdropBlur="2xl"
        value={value}
        size="14"
        color={value > 70 ? "green.500" : "yellow.500"}
      >
        <CircularProgressLabel>
          <Text fontSize={17}>{value}</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export default Rating;
