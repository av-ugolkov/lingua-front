import { create } from 'zustand';

import { Order, Sorted } from '@/models/Sorted';

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
  getOrderedWords: (sort: Sorted, order: Order) => VocabWordState[];
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

  getOrderedWords: (sort, order) => {
    const words = get().words;
    switch (sort) {
      case Sorted.Created:
        if (order === Order.DESC) {
          words.sort((a, b) => b.created.valueOf() - a.created.valueOf());
        } else {
          words.sort((a, b) => a.created.valueOf() - b.created.valueOf());
        }
        break;
      case Sorted.Updated:
        if (order === Order.DESC) {
          words.sort((a, b) => b.updated.valueOf() - a.updated.valueOf());
        } else {
          words.sort((a, b) => a.updated.valueOf() - b.updated.valueOf());
        }
        break;
      case Sorted.ABC:
        if (order === Order.DESC) {
          words.sort((a, b) => b.wordValue.localeCompare(a.wordValue));
        } else {
          words.sort((a, b) => a.wordValue.localeCompare(b.wordValue));
        }
        break;
    }
    return words;
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
    set({ words: [] });
  },
}));
