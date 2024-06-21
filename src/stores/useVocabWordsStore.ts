import { fetchData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { useEffect } from 'react';
import { create } from 'zustand';

export const InvalidateDate = new Date(1970, 1, 1, 0, 0, 0, 0);

interface VocabWordState {
  id: string;
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
  getWord: (id: string) => VocabWordState;
  getWordByName: (name: string) => VocabWordState;
  addWord: (vocabulary: VocabWordState) => void;
  updateWord: (vocabulary: VocabWordState) => void;
  removeWord: (id: string) => void;
}

export const EmptyWord: VocabWordState = {
  id: '',
  wordID: '',
  wordValue: '',
  wordPronunciation: '',
  translates: [],
  examples: [],
  updated: InvalidateDate,
  created: InvalidateDate,
};

export default function useVocabWordsStore({ vocab_id }: { vocab_id: string }) {
  useEffect(() => {
    const vocabWords = vocabWordsStore();
    const abordController = new AbortController();
    refreshToken(abordController.signal, (token) => {
      fetchData(
        '/vocabulary/word/all',
        {
          method: 'get',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
        new Map([['vocab_id', vocab_id]]),
        abordController.signal
      )
        .then(async (response) => {
          if (response.ok) {
            response.data.forEach((item: any) => {
              vocabWords.addWord({
                id: item['id'],
                wordID: item['native']['id'],
                wordValue: item['native']['text'],
                wordPronunciation: item['native']['pronunciation'] || '',
                translates: item['translates'] || [],
                examples: item['examples'] || [],
                created: new Date(item['created']),
                updated: new Date(item['updated']),
              });
            });
          } else {
            console.error(response.data);
            // notification.value.ErrorNotification(data);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  });
}

export const vocabWordsStore = create<VocabWordsState>((set, get) => ({
  words: [],
  getWord: (id) => {
    const word = get().words.find((word) => word.id === id);
    if (!word) {
      throw new Error(`Word with id ${id} not found`);
    }
    return word;
  },
  getWordByName: (name) => {
    const word = get().words.find((word) => word.wordValue === name);
    if (!word) {
      throw new Error(`Word with name ${name} not found`);
    }
    return word;
  },
  addWord: (vocabulary) =>
    set((state) => ({ words: [...state.words, vocabulary] })),
  updateWord: (vocabulary) =>
    set((state) => ({
      words: state.words.map((word) =>
        word.id === vocabulary.id ? vocabulary : word
      ),
    })),
  removeWord: (id) =>
    set((state) => ({ words: state.words.filter((word) => word.id !== id) })),
}));
