import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react"

const MovieCardSkeleton = () => {
  return (
    <Card shadow="none" borderRadius="10px">
      <Skeleton height="345px" borderRadius="10px" />
    </Card>
  )
}

export default MovieCardSkeleton;