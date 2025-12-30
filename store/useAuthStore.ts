"use client";

import { create } from "zustand";
import { User } from "firebase/auth";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

type AuthState = {
  user: User | null;
  loading: true | false;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) =>
    set({
      user,
      loading: false,
    }),
}));