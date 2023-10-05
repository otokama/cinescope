import { Box, Image, Text, VStack } from "@chakra-ui/react";
import fallbackImg from "../../assets/image-placeholder.webp";
import { TV } from "../../entities/TV";

interface Props {
  tv: TV;
}

const TVCard = ({ tv }: Props) => {
  return (
    <Box>
      <VStack align="start" spacing={3}>
        <Image
          src={tv.poster_path}
          shadow="md"
          borderRadius={12}
          fallbackSrc={fallbackImg}
          objectFit="fill"
        />
        <Text fontSize="17" fontWeight="medium" paddingLeft={2}>
          {tv.name}
        </Text>
      </VStack>
    </Box>
  );
};

export default TVCard;
