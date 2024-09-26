import { create } from "zustand";

const useUserStore = create<{
  userId: number | null;
  setUserId: (userId: number) => void;
}>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export default useUserStore;
