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

export const useVocabulariesStore = create<VocabulariesState>()((set, get) => ({
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
