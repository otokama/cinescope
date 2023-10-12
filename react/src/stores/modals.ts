import { create } from 'zustand';
interface ModalStore {
  showFavoriteList: boolean;
  setShowFavoriteList: (show: boolean) => void;

}

const useModalStore = create<ModalStore>((set) => ({
  showFavoriteList: false,
  setShowFavoriteList: (shouldShow: boolean) =>
    set((s) => ({...s, showFavoriteList: shouldShow})),

}));

export default useModalStore;