import { create } from 'zustand';

import { IResponseData, getFetchDataWithToken } from '@/scripts/fetchData';

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
  fetchVocabularies: () => void;
  getVocabulary: (id: string) => VocabularyState;
  getVocabularyByName: (name: string) => VocabularyState;
  setVocabularies: (vocabularies: VocabularyState[]) => void;
  addVocabulary: (vocabulary: VocabularyState) => void;
  removeVocabulary: (id: string) => void;
}

async function asyncFetchVocabularies(): Promise<IResponseData> {
  const abordController = new AbortController();
  const respData = await getFetchDataWithToken(
    '/account/vocabularies',
    abordController.signal
  );
  return respData;
}

export const useVocabulariesStore = create<VocabulariesState>((set, get) => ({
  vocabularies: [],
  setVocabularies: (vocabularies) => set({ vocabularies }),
  fetchVocabularies: async () => {
    const vocabs = get().vocabularies;
    if (vocabs.length === 0) {
      const respData = await asyncFetchVocabularies();
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
  },
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
    if (get().vocabularies.length === 0) {
      get().fetchVocabularies();
    }
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
