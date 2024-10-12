import { create } from 'zustand';

import { Order, Sorted } from '@/models/Sorted';
import { VocabWord } from "@/models/Word.ts";

interface VocabWordsState {
  words: VocabWord[];
  setWords: (words: VocabWord[]) => void;
  getOrderedWords: (sort: Sorted, order: Order) => VocabWord[];
  addWord: (word: VocabWord) => void;
  updateWord: (word: VocabWord) => void;
  removeWord: (id: string) => void;
  clearWords: () => void;
}

export const useVocabWordsStore = create<VocabWordsState>((set, get) => ({
  words: [],
  setWords: (words) => set({ words: words }),

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
          words.sort((a, b) => b.native.text.localeCompare(a.native.text));
        } else {
          words.sort((a, b) => a.native.text.localeCompare(b.native.text));
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
