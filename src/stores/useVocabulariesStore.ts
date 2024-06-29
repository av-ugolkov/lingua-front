import { create } from 'zustand';

import { IResponseData } from '@/scripts/fetch/fetchData';
import { useGetFetchWithToken } from '@/hooks/fetch/useFetchWithToken';

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

export const EmptyVocabulary: VocabularyState = {
  id: '',
  name: '',
  nativeLang: '',
  translateLang: '',
  tags: [],
  userId: '',
};

function fetchVocabularies(): IResponseData {
  const { response } = useGetFetchWithToken('/account/vocabularies');
  return response;
}

export const useVocabulariesStore = create<VocabulariesState>((set, get) => ({
  vocabularies: [],
  setVocabularies: (vocabularies) => set({ vocabularies }),
  getVocabulary: (id) => {
    let vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.id === id
    );
    if (!vocabulary) {
      const respData = fetchVocabularies();
      if (respData.ok) {
        respData.data.forEach((item: any) => {
          set({
            vocabularies: [
              ...get().vocabularies,
              {
                id: item['id'],
                name: item['name'],
                nativeLang: item['native_lang'],
                translateLang: item['translate_lang'],
                tags: item['tags'],
                userId: item['user_id'],
              },
            ],
          });
        });
      }
    }
    vocabulary = get().vocabularies.find((vocabulary) => vocabulary.id === id);
    if (!vocabulary) {
      return EmptyVocabulary;
    }
    return vocabulary;
  },
  getVocabularyByName: (name) => {
    let vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.name === name
    );
    if (!vocabulary) {
      const respData = fetchVocabularies();
      if (respData.ok) {
        respData.data.forEach((item: any) => {
          set({
            vocabularies: [
              ...get().vocabularies,
              {
                id: item['id'],
                name: item['name'],
                nativeLang: item['native_lang'],
                translateLang: item['translate_lang'],
                tags: item['tags'],
                userId: item['user_id'],
              },
            ],
          });
        });
      }
    }
    vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.name === name
    );
    if (!vocabulary) {
      return EmptyVocabulary;
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
