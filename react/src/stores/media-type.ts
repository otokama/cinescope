import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export type MediaType = "tv" | "movie";

interface MediaTypeStore {
  mediaType: MediaType;
  setMediaType: (mediaType: MediaType) => void;
}

const useMediaTypeStore = create<MediaTypeStore>((set) => ({
  mediaType: "movie",
  setMediaType: (newMediaType: MediaType) =>
    set(() => ({ mediaType: newMediaType })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Media Type Store", useMediaTypeStore);
}

export default useMediaTypeStore;