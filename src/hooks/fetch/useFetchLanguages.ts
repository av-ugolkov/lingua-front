import { create } from 'zustand';

import { useEffect } from 'react';
import { fetchData } from '@/scripts/fetch/fetchData';

export function useFetchLanguages() {
  const languageStore = useLanguagesStore((state) => state.languages);
  const setLanguages = useLanguagesStore((state) => state.setLanguages);

  useEffect(() => {
    if (languageStore.size === 0) {
      fetchData('/languages', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            const langs: Map<string, string> = new Map();
            response.data.forEach((item: any) => {
              langs.set(item['code'], item['language']);
            });
            setLanguages(langs);
          } else {
            console.error(response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return languageStore;
}

export interface ILanguage {
  lang: string;
  code: string;
}

interface ILanguagesState {
  languages: Map<string, string>;
  setLanguages: (languages: Map<string, string>) => void;
}

const useLanguagesStore = create<ILanguagesState>((set) => ({
  languages: new Map(),
  setLanguages: (languages) => set({ languages }),
}));
