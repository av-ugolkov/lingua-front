export interface VocabWord extends Word {
  id: string;
  vocabID: string;
  translates: string[];
  examples: string[];
  updated: number;
  created: number;
}

export interface Word {
  wordID: string;
  text: string;
  pronunciation: string;
}

export const EmptyVocabWord: VocabWord = {
  id: '',
  vocabID: '',
  wordID: '',
  text: '',
  pronunciation: '',
  translates: [],
  examples: [],
  created: 0,
  updated: 0,
};
