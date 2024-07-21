import { create } from 'zustand';

import { Sorted } from '@/models/Sorted';

export const InvalidateDate = new Date(1970, 1, 1, 0, 0, 0, 0);

export interface VocabWordState {
  id: string;
  vocabID: string;
  wordID: string;
  wordValue: string;
  wordPronunciation: string;
  translates: string[];
  examples: string[];
  updated: Date;
  created: Date;
}

interface VocabWordsState {
  words: VocabWordState[];
  setWords: (words: VocabWordState[]) => void;
  getOrderedWords: (typesSort: Sorted) => VocabWordState[];
  getWord: (id: string) => VocabWordState;
  addWord: (word: VocabWordState) => void;
  updateWord: (word: VocabWordState) => void;
  removeWord: (id: string) => void;
  clearWords: () => void;
}

export const EmptyWord: VocabWordState = {
  id: '',
  vocabID: '',
  wordID: '',
  wordValue: '',
  wordPronunciation: '',
  translates: [],
  examples: [],
  updated: InvalidateDate,
  created: InvalidateDate,
};

export const useVocabWordsStore = create<VocabWordsState>((set, get) => ({
  words: [],
  setWords: (words) => set({ words }),
  getOrderedWords: (typesSort) => {
    let words = get().words;
    switch (typesSort) {
      case Sorted.Newest:
        words.sort((a, b) => b.created.valueOf() - a.created.valueOf());
        break;
      case Sorted.Oldest:
        words.sort((a, b) => a.created.valueOf() - b.created.valueOf());
        break;
      case Sorted.UpdateAsc:
        words.sort((a, b) => a.updated.valueOf() - b.updated.valueOf());
        break;
      case Sorted.UpdateDesc:
        words.sort((a, b) => b.updated.valueOf() - a.updated.valueOf());
        break;
      case Sorted.AtoZ:
        words.sort((a, b) => a.wordValue.localeCompare(b.wordValue));
        break;
      case Sorted.ZtoA:
        words.sort((a, b) => b.wordValue.localeCompare(a.wordValue));
        break;
    }
    return words;
  },
  getWord: (id) => {
    const word = get().words.find((word) => word.id === id);
    if (!word) {
      throw new Error(`Word with id ${id} not found`);
    }
    return word;
  },
  addWord: (vocabWord) => {
    set((state) => {
      if (state.words.find((item) => item.id === vocabWord.id)) {
        return state;
      }
      return { words: [...state.words, vocabWord] };
    });
  },
  updateWord: (vocabWord) => {
    if (vocabWord.id === '') {
      return;
    }
    set((state) => ({
      words: state.words.map((word) =>
        word.id === vocabWord.id ? vocabWord : word
      ),
    }));
  },
  removeWord: (id) =>
    set((state) => ({ words: state.words.filter((word) => word.id !== id) })),
  clearWords: () => {
    set(() => ({ words: [] }));
  },
}));
