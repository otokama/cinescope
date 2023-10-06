import { Avatar, Text, VStack } from "@chakra-ui/react";
import { Actor } from "../entities/Actor";

interface Props {
  actor: Actor;
}

const ActorCard = ({ actor }: Props) => {
  return (
    <>
      <VStack spacing={0}>
        <Avatar
          size="xl"
          src={actor.profile_path}
          name={actor.name}
          mb="4"
          shadow="lg"
        />
        <Text fontSize="lg" align="center">
          {actor.name}
        </Text>
        <Text fontSize="sm" fontStyle="italic" align="center">
          {actor.character}
        </Text>
      </VStack>
    </>
  );
};

export default ActorCard;
