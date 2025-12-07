import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: any;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
