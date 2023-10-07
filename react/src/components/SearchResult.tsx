import { useMovieSearch } from "../hooks/movies/useMovies";
import { useTVSearch } from "../hooks/tv/useTVList";
import useSearchParamsStore from "../stores/search";
import MovieGrid from "./movie/MovieGrid";
import TVGrid from "./tv/TVGrid";

const SearchResult = () => {
  const { mediaType } = useSearchParamsStore((s) => s.searchParams);
  return (
    <>
      {mediaType === "movie" && <MovieGrid useMovie={useMovieSearch} />}

      {mediaType === "tv" && <TVGrid useTV={useTVSearch} />}
    </>
  );
};

export default SearchResult;
