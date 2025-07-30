import { create } from "zustand";
import { devtools } from "zustand/middleware";

const SESSION_ID_STORAGE_KEY = "tmdb_session_id";

const useAuthStore = create()(
  devtools((set) => ({
    sessionId: localStorage.getItem(SESSION_ID_STORAGE_KEY) || null,
    user: null,
    actions: {
      setSession: (sessionId) => {
        localStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
        set({ sessionId });
      },
      clearSession: () => {
        localStorage.removeItem(SESSION_ID_STORAGE_KEY);
        set({ sessionId: null, user: null });
      },
      setUser: (user) => set({ user }),
    },
  })),
);

export const useSessionId = () => useAuthStore((state) => state.sessionId);
export const useUser = () => useAuthStore((state) => state.user);
export const useAuthActions = () => useAuthStore((state) => state.actions);
