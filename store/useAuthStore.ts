"use client";

import { create } from "zustand";
import { User } from "firebase/auth";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,

      setUser: (user) =>
        set({
          user,
          loading: false,
        }),

      logout: () =>
        set({
          user: null,
          loading: false,
        }),
      clearUser: () => set({ user: null }),
    }),

    {
      name: "auth-storage",
    }
  )
);
