import { useEffect } from 'react';
import { create } from 'zustand';

import { fetchData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';

interface VocabularyState {
  id: string;
  name: string;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  userId: string;
}

interface VocabulariesState {
  vocabularies: VocabularyState[];
  getVocabulary: (id: string) => VocabularyState;
  getVocabularyByName: (name: string) => VocabularyState;
  setVocabularies: (vocabularies: VocabularyState[]) => void;
  addVocabulary: (vocabulary: VocabularyState) => void;
  removeVocabulary: (id: string) => void;
}

export function useVocabularies(callback: () => void) {
  const vocabularies = useVocabulariesStore();

  useEffect(() => {
    const abordController = new AbortController();
    refreshToken(abordController.signal, (token) => {
      fetchData('/account/vocabularies', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((resp) => {
          if (resp.ok) {
            resp.data.forEach((item: any) => {
              vocabularies.addVocabulary({
                id: item['id'],
                name: item['name'],
                nativeLang: item['native_lang'],
                translateLang: item['translate_lang'],
                tags: item['tags'] || [],
                userId: item['user_id'],
              });
            });
          } else {
            //notification.value.ErrorNotification(data);
          }
          callback();
        })
        .catch((error) => {
          console.error(error.message);
        });
    });

    return () => {
      abordController.abort();
    };
  }, [vocabularies, callback]);
}

export const useVocabulariesStore = create<VocabulariesState>((set, get) => ({
  vocabularies: [],
  setVocabularies: (vocabularies) => set({ vocabularies }),
  getVocabulary: (id) => {
    const vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.id === id
    );
    if (!vocabulary) {
      throw new Error(`Vocabulary with id ${id} not found`);
    }
    return vocabulary;
  },
  getVocabularyByName: (name) => {
    const vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.name === name
    );
    if (!vocabulary) {
      throw new Error(`Vocabulary with name ${name} not found`);
    }
    return vocabulary;
  },
  addVocabulary: (vocabulary) =>
    set((state) => {
      if (state.vocabularies.find((item) => item.id === vocabulary.id)) {
        return state;
      }
      return { vocabularies: [...state.vocabularies, vocabulary] };
    }),
  removeVocabulary: (id) =>
    set((state) => ({
      vocabularies: state.vocabularies.filter(
        (vocabulary) => vocabulary.id !== id
      ),
    })),
}));
