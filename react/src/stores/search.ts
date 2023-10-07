import { create } from "zustand";
import { MediaType } from "./media-type";

interface SearchParams {
  searchText?: string;
  mediaType: MediaType;
}

interface SearchParamsStore {
  searchParams: SearchParams;
  setSearchText: (searchText: string) => void;
  setMediaType: (mediaType: MediaType) => void;
}

const useSearchParamsStore = create<SearchParamsStore>((set) => ({
  searchParams: {
    mediaType: "movie"
  },
  setSearchText: (searchText) => set((store) => ({ searchParams: { ...store.searchParams, searchText } })),
  setMediaType: (mediaType) =>
    set((store) => ({ searchParams: { ...store.searchParams, mediaType } })),
}));

export default useSearchParamsStore;