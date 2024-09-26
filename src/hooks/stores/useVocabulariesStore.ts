import { create } from 'zustand';

import { EmptyVocabulary, VocabularyData } from "@/models/Vocabulary.ts";

interface VocabulariesState {
  vocabularies: VocabularyData[];
  getVocabulary: (id: string | undefined) => VocabularyData;
  setVocabularies: (vocabularies: VocabularyData[]) => void;
  addVocabulary: (vocabulary: VocabularyData) => void;
  removeVocabulary: (id: string) => void;
}

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
