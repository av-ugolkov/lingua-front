import { createSlice } from '@reduxjs/toolkit/react';

import { VocabWord } from '@/models/Word';
import { Order, Sorted } from '@/models/Sorted';

const initialState: VocabWord[] = [];

const slice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: { payload: VocabWord }) => {
      state.push(action.payload);
    },
    setWords: (state, action: { payload: VocabWord[] }) => {
      action.payload.forEach((item: VocabWord) => {
        state.push(item);
      });
    },
    updateWord: (state, action: { payload: VocabWord }) => {
      const ind = state.findIndex((word) => word.id === action.payload.id);
      if (ind > -1) {
        state[ind] = action.payload;
      }
    },
    removeWord: (state, action: { payload: string }) => {
      const index = state.findIndex((word) => word.id === action.payload);
      if (index > -1) {
        state.splice(index, 1);
      } else {
        console.error('word not found');
      }
    },
    clearWords: (state) => {
      state.splice(0, state.length);
    },
  },
  selectors: {
    getWord: (state, id: string) => {
      const word = state.find((word) => word.id === id);
      return word || {};
    },
    getOrderedWords: (state, sort: Sorted, order: Order) => {
      if (state.length === 0) {
        return state;
      }
      const words = JSON.parse(JSON.stringify(state)) as VocabWord[];
      switch (sort) {
        case Sorted.Created:
          if (order === Order.DESC) {
            words.sort((a, b) => b.created - a.created);
          } else {
            words.sort((a, b) => a.created - b.created);
          }
          break;
        case Sorted.Updated:
          if (order === Order.DESC) {
            words.sort((a, b) => b.updated - a.updated);
          } else {
            words.sort((a, b) => a.updated - b.updated);
          }
          break;
        case Sorted.ABC:
          if (order === Order.DESC) {
            words.sort((a, b) => b.text.localeCompare(a.text));
          } else {
            words.sort((a, b) => a.text.localeCompare(b.text));
          }
          break;
      }

      return words;
    },
  },
});

export const { addWord, setWords, updateWord, removeWord, clearWords } =
  slice.actions;
export const { getWord, getOrderedWords } = slice.selectors;

export default slice.reducer;
