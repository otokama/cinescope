import useProviders from "../../hooks/useProviders";
import WatchProviders from "../WatchProviders";

interface Props {
  movieId: number;
}

const MovieWatchProviders = ({movieId}: Props) => {

  const {data, isLoading, error} = useProviders(movieId, true);

  if (error) return null;

  return (
    <>
      <WatchProviders providerDetail={data} isLoading={isLoading} />
    </>
  )
}

export default MovieWatchProviders