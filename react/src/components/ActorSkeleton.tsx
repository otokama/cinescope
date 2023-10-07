import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ActorCardSkeleton = () => {
  return (
    <Box textAlign="center">
      <SkeletonCircle size="20" />
      <SkeletonText noOfLines={2} spacing={2} skeletonHeight={2} mt="4" />
    </Box>
  );
};

export default ActorCardSkeleton;
