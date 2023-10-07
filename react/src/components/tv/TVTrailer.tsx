import useTrailers from "../../hooks/useTrailer";
import Trailers from "../Trailers";

interface Props {
  tvId: number;
}

const TVTrailer = ({tvId}: Props) => {

  const {data: videos, isLoading, error} = useTrailers(tvId, false);

  if (error) return null;

  return (
    <Trailers videos={videos} isLoading={isLoading} />
  )
}

export default TVTrailer