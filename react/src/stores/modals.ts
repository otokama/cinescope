import { create } from 'zustand';
interface ModalStore {
  showFavoriteList: boolean;
  setShowFavoriteList: (show: boolean) => void;
  // showFavoriteMovie: boolean;
  // showFavoriteTV: boolean;
  // setShowFavoriteMovie: (show: boolean) => void;
  // setShowFavoriteTV: (show: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  showFavoriteList: false,
  setShowFavoriteList: (shouldShow: boolean) =>
    set((s) => ({...s, showFavoriteList: shouldShow})),
  // showFavoriteMovie: false,
  // showFavoriteTV: false,
  // setShowFavoriteMovie: (shouldShow: boolean) =>
  //   set((s) => ({...s, showFavoriteMovie: shouldShow})),
  // setShowFavoriteTV: (shouldShow: boolean) => 
  //   set((s) => ({...s, showFavoriteTV: shouldShow}))
}));

export default useModalStore;