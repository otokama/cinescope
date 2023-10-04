import { Card, Skeleton } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Card shadow="none" borderRadius="10px">
      <Skeleton height="300px" borderRadius="10px" />
    </Card>
  );
};

export default CardSkeleton;
