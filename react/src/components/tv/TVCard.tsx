import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import fallbackImg from "../../assets/image-placeholder.webp";
import { TV } from "../../entities/TV";
import { getPosterLink } from "../util/image-url";

interface Props {
  tv: TV;
}

const TVCard = ({ tv }: Props) => {
  return (
    <Link to={"/tv/" + tv.id}>
      <VStack align="start" spacing={3}>
        <Image
          src={getPosterLink(tv.poster_path)}
          shadow="md"
          borderRadius={12}
          fallbackSrc={fallbackImg}
          objectFit="fill"
        />
        <Text fontSize="17" fontWeight="medium" paddingLeft={2}>
          {tv.name}
        </Text>
      </VStack>
    </Link>
  );
};

export default TVCard;
