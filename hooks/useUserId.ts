import useUserStore from "@/lib/store";

export const useUserId = (): [number | null, (userId: number) => void] => {
  const userId = useUserStore((state) => state.userId);
  const setUserId = useUserStore((state) => state.setUserId);

  return [userId, setUserId];
};
