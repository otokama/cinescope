import {
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

interface Props {
  value: number;
}

const Rating = ({ value }: Props) => {
  return (
    <CircularProgress
      rounded="full"
      bg="blackAlpha.500"
      value={value}
      size={10}
      color={value > 70 ? "green.500" : "yellow.500"}
    >
      <CircularProgressLabel>
        <Text fontSize={14}>{value}</Text>
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Rating;
