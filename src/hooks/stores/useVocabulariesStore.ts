import { create } from 'zustand';

export interface VocabularyState {
  id: string;
  name: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  userID: string;
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
  accessID: 2,
  nativeLang: '',
  translateLang: '',
  tags: [],
  userID: '',
};

export const useVocabulariesStore = create<VocabulariesState>((set, get) => ({
  vocabularies: [],
  setVocabularies: (vocabularies) => set({ vocabularies }),
  getVocabulary: (id) => {
    const vocabulary = get().vocabularies.find(
      (vocabulary) => vocabulary.id === id
    );

    if (!vocabulary) {
      return EmptyVocabulary;
    }
    return vocabulary;
  },
  getVocabularyByName: (name) => {
    const vocabulary = get().vocabularies.find(
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
