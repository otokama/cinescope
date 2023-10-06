import { useMovieRecommendation } from "./movies/useMovies";
import { useTVRecommendation } from "./tv/useTVList";

const useRecommendation = (contentId: number, isMovie: boolean) => {
  if (isMovie) {
    return useMovieRecommendation(contentId);
  } else {
    return useTVRecommendation(contentId);
  }
};

export default useRecommendation;
