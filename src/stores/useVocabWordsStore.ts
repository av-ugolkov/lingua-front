import { create } from 'zustand';

import { IResponseData } from '@/scripts/fetch/fetchData';
import { Sorted } from './useSortedWordsStore';
import {
  useGetFetchWithToken,
  usePostFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';

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
  getOrderedWords: (typesSort: Sorted) => VocabWordState[];
  getWord: (id: string) => VocabWordState;
  getWordByName: (name: string) => VocabWordState;
  addWord: (vocabulary: VocabWordState) => void;
  updateWord: (vocabulary: VocabWordState) => void;
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

function asyncFetchWords(vocabID: string): IResponseData {
  const { response } = useGetFetchWithToken(
    '/vocabulary/word/all',
    new Map([['vocab_id', vocabID]])
  );
  return response;
}

export const useVocabWordsStore = create<VocabWordsState>((set, get) => ({
  words: [],
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
  fetchWords: async (vocabID: string) => {
    const words = get().words;
    if (words.length === 0) {
      const respData = await asyncFetchWords(vocabID);
      if (respData.ok) {
        respData.data.forEach((item: any) => {
          set((state) => {
            return {
              words: [
                ...state.words,
                {
                  id: item['id'],
                  vocabID: vocabID,
                  wordID: item['native']['id'],
                  wordValue: item['native']['text'],
                  wordPronunciation: item['native']['pronunciation'] || '',
                  translates: item['translates'] || [],
                  examples: item['examples'] || [],
                  updated: new Date(item['updated']),
                  created: new Date(item['created']),
                },
              ],
            };
          });
        });
      }
    }
  },
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
  addWord: async (vocabWord) => {
    const respBody = await asyncAddWord(vocabWord);
    if (respBody.ok) {
      const word: VocabWordState = {
        ...vocabWord,
        id: respBody.data['id'],
        wordID: respBody.data['native']['id'],
        created: new Date(respBody.data['created']),
        updated: new Date(respBody.data['updated']),
      };

      set((state) => {
        if (state.words.find((item) => item.id === word.id)) {
          return state;
        }
        return { words: [...state.words, word] };
      });
    } else {
      console.warn(respBody);
    }
  },
  updateWord: (vocabWord) =>
    set((state) => ({
      words: state.words.map((word) =>
        word.id === vocabWord.id ? vocabWord : word
      ),
    })),
  removeWord: (id) =>
    set((state) => ({ words: state.words.filter((word) => word.id !== id) })),
  clearWords: () => {
    set(() => ({ words: [] }));
  },
}));

async function asyncAddWord(vocabWord: VocabWordState): Promise<IResponseData> {
  let jsonBodyData = {
    id: '00000000-0000-0000-0000-000000000000',
    vocab_id: vocabWord.vocabID,
    native: {
      id: '00000000-0000-0000-0000-000000000000',
      text: vocabWord.wordValue,
      pronunciation: vocabWord.wordPronunciation,
    },
    translates: vocabWord.translates,
    examples: vocabWord.examples,
  };
  let bodyData = JSON.stringify(jsonBodyData);
  const { response } = usePostFetchWithToken('/vocabulary/word', bodyData);
  return response;
}
