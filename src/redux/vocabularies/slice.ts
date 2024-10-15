import { createSlice } from '@reduxjs/toolkit/react';

import { EmptyVocabulary, VocabularyData } from '@/models/Vocabulary';

const initialState: VocabularyData[] = [];

const slice = createSlice({
  name: 'vocabs',
  initialState,
  reducers: {
    setVocabs: (state, action: { payload: VocabularyData[] }) => {
      action.payload.forEach((item: VocabularyData) => {
        state.push(item);
      });
    },
    clearVocabs: (state) => {
      state.splice(0, state.length);
    },
  },
  selectors: {
    getVocab: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      if (!vocabulary) {
        return EmptyVocabulary;
      }
      return vocabulary;
    },
    getWords: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      if (!vocabulary) {
        return [];
      }
      return vocabulary.words;
    },
    getCreateDate: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      return new Date(vocabulary?.createdAt || 0).toLocaleString('en-GB');
    },
    getUpdateDate: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      return new Date(vocabulary?.updatedAt || 0).toLocaleString('en-GB');
    },
  },
});

export const { setVocabs, clearVocabs } = slice.actions;
export const { getVocab, getWords, getCreateDate } = slice.selectors;

export default slice.reducer;
