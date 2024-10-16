export interface VocabWord {
  id: string;
  vocabID: string;
  native: Word;
  translates: string[];
  examples: string[];
  updated: string;
  created: string;
}

export interface Word {
  id: string;
  text: string;
  pronunciation: string;
}

export const EmptyVocabWord: VocabWord = {
  id: '',
  vocabID: '',
  native: {
    id: '',
    text: '',
    pronunciation: '',
  },
  translates: [],
  examples: [],
  created: '',
  updated: '',
};
