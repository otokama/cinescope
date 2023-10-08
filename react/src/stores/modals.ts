import { create } from 'zustand';
interface ModalStore {
  showFavoriteMovie: boolean;
  showFavoriteTV: boolean;
  setShowFavoriteMovie: (show: boolean) => void;
  setShowFavoriteTV: (show: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  showFavoriteMovie: false,
  showFavoriteTV: false,
  setShowFavoriteMovie: (shouldShow: boolean) =>
    set((s) => ({...s, showFavoriteMovie: shouldShow})),
  setShowFavoriteTV: (shouldShow: boolean) => 
    set((s) => ({...s, showFavoriteTV: shouldShow}))
}));

export default useModalStore;