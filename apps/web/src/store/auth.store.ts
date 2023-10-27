import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserResponse } from 'ui';

interface AuthState {
  token: string | undefined;
  setToken: (token: AuthState['token']) => void;

  user: UserResponse | undefined;
  setUser: (user: AuthState['user']) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    token: undefined,
    setToken: (token: AuthState['token']) => set(() => ({ token })),

    user: undefined,
    setUser: (user: AuthState['user']) => set(() => ({ user })),
  })),
);
