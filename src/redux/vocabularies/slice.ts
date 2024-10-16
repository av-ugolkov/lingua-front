import { createSlice } from '@reduxjs/toolkit/react';

import { EmptyVocabulary, VocabularyData } from '@/models/Vocabulary';

const initialState: VocabularyData[] = [];

const slice = createSlice({
  name: 'vocabs',
  initialState,
  reducers: {
    addVocab: (state, action: { payload: VocabularyData }) => {
      state.push(action.payload);
    },
    setVocabs: (state, action: { payload: VocabularyData[] }) => {
      action.payload.forEach((item: VocabularyData) => {
        state.push(item);
      });
    },
    removeVocab: (state, action: { payload: string }) => {
      const index = state.findIndex((vocab) => vocab.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      } else {
        console.error('vocabulary not found');
      }
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
      return vocabulary?.words || [];
    },
    getCreateDate: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      return new Date(vocabulary?.createdAt || '').toLocaleString('en-GB');
    },
    getUpdateDate: (state, id: string) => {
      const vocabulary = state.find((vocab) => vocab.id === id);
      return new Date(vocabulary?.updatedAt || '').toLocaleString('en-GB');
    },
  },
});

export const { addVocab, setVocabs, removeVocab, clearVocabs } = slice.actions;
export const { getVocab, getWords, getCreateDate } = slice.selectors;

export default slice.reducer;
