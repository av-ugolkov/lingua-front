import { create } from 'zustand';

interface AuthState {
  accessToken: string;
  getAccessToken: () => string;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: '',
  getAccessToken: () => {
    if (get().accessToken === '') {
      const token = localStorage.getItem('access_token');
      if (token) {
        set({ accessToken: token });
      }
    }
    return get().accessToken;
  },
  setAccessToken: (token) => {
    localStorage.setItem('access_token', token);
    set({ accessToken: token });
  },
  clearAccessToken: () => set({ accessToken: '' }),
}));
