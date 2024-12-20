export interface VocabWord extends Word {
  id: string;
  vocabID: string;
  definition: string;
  translates: string[];
  examples: string[];
  updated: number;
  created: number;
}

export const clearVocabWord = (vocabWord: VocabWord) => {
  vocabWord.text = '';
  vocabWord.pronunciation = '';
  vocabWord.translates = [];
  vocabWord.examples = [];
};

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
  definition: '',
  translates: [],
  examples: [],
  created: 0,
  updated: 0,
};

export interface DictWord {
  id: string;
  text: string;
  pronunciation: string;
  langCode: string;
  creator: string;
  createdAt: string;
}
