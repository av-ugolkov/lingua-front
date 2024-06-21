import { fetchData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { useEffect } from 'react';
import { create } from 'zustand';

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

export default function useVocabulariesStore() {
  useEffect(() => {
    const vocabularies = vocabulariesStore();
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
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  }, []);
}

export const vocabulariesStore = create<VocabulariesState>((set, get) => ({
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
      throw new Error(`Vocabulary with id ${name} not found`);
    }
    return vocabulary;
  },
  addVocabulary: (vocabulary) =>
    set((state) => ({ vocabularies: [...state.vocabularies, vocabulary] })),
  removeVocabulary: (id) =>
    set((state) => ({
      vocabularies: state.vocabularies.filter(
        (vocabulary) => vocabulary.id !== id
      ),
    })),
}));
