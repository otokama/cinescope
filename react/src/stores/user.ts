import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import User from "./../entities/User";

interface AccountStore {
  user: User | null;
  sessionId: string | null;
  setUser: (user: User) => void;
  setSessionId: (sessionId: string) => void;
  removeUser: () => void;
  removeSessionId: () => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  user: null,
  sessionId: null,
  setUser: (newUser: User) => set((s) => ({ ...s, user: newUser })),
  setSessionId: (newSessionId: string) =>
    set((s) => ({ ...s, sessionId: newSessionId })),
  removeUser: () => set((s) => ({ ...s, user: null })),
  removeSessionId: () => set((s) => ({ ...s, sessionId: null })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("User Store", useAccountStore);
}

export default useAccountStore;
