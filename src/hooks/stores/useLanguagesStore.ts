import { create } from 'zustand';
import api, { AuthStore } from '@/scripts/api';

export interface ILanguage {
  lang: string;
  code: string;
}

interface ILanguagesState {
  languages: Map<string, string>;
  fetchLanguages: () => Promise<void>;
}

export const useLanguagesStore = create<ILanguagesState>((set) => ({
  languages: new Map(),
  fetchLanguages: async () => {
    const response = await api.get('/languages', AuthStore.NO);
    if (response.ok) {
      const langs = new Map();
      response.data.forEach((item: any) => {
        langs.set(item['code'], item['language']);
      });
      set({ languages: langs });
    } else {
      console.error(response);
    }
  },
}));
