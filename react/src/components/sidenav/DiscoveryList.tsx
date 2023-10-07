import useSearchParamsStore from "../../stores/search";
import MovieList from "./MovieList";
import TVList from "./TVList";

const DiscoveryList = () => {
  const mediaType = useSearchParamsStore((s) => s.searchParams.mediaType);

  return (
    <>
      {mediaType === "movie" && <MovieList />}
      {mediaType === "tv" && <TVList />}
    </>
  );
};

export default DiscoveryList;
