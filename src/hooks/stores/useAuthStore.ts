import { create } from 'zustand';

interface AuthState {
  accessToken: string;
  getAccessToken: () => string;
  isActiveToken: () => boolean;
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
  isActiveToken: () => {
    const token = get().getAccessToken();
    if (token === '') {
      return false;
    }
    const payload = JSON.parse(atob(get().accessToken.split('.')[1]));
    const exp = payload['exp'];

    return Date.now() < exp * 1000;
  },
  setAccessToken: (token) => {
    localStorage.setItem('access_token', token);
    set({ accessToken: token });
  },
  clearAccessToken: () => set({ accessToken: '' }),
}));
