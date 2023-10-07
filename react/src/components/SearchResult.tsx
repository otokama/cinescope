import { useMovieSearch } from "../hooks/movies/useMovies";
import useSearchParamsStore from "../stores/search";
import MovieGrid from "./movie/MovieGrid";

const SearchResult = () => {
  const { mediaType } = useSearchParamsStore((s) => s.searchParams);
  return (
    <>
      {mediaType === "movie" && 
        <MovieGrid useMovie={useMovieSearch} />
      }
      
    </>
  )
}

export default SearchResult