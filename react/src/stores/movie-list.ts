import { create } from "zustand";
import { MovieList } from "../entities/MovieListType";

interface MovieListStore {
  movieList: MovieList;
  setMovieList: (movieList: MovieList) => void;
}

const useMovieListStore = create<MovieListStore>((set) => ({
  movieList: "now_playing",
  setMovieList: (newMovieList: MovieList) =>
    set(() => ({ movieList: newMovieList })),
}));

export default useMovieListStore;
