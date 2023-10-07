import { create } from "zustand";
import { TVList } from "../entities/TVListType";

interface TVListStore {
  tvList: TVList;
  setTVList: (tvList: TVList) => void;
}

const useTVListStore = create<TVListStore>((set) => ({
  tvList: "top_rated",
  setTVList: (newTVList: TVList) => set(() => ({ tvList: newTVList })),
}));

export default useTVListStore;
