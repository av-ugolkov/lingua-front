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
      switch (sort) {
        case Sorted.Created:
          if (order === Order.DESC) {
            state.sort((a, b) => b.created.valueOf() - a.created.valueOf());
          } else {
            state.sort((a, b) => a.created.valueOf() - b.created.valueOf());
          }
          break;
        case Sorted.Updated:
          if (order === Order.DESC) {
            state.sort((a, b) => b.updated.valueOf() - a.updated.valueOf());
          } else {
            state.sort((a, b) => a.updated.valueOf() - b.updated.valueOf());
          }
          break;
        case Sorted.ABC:
          if (order === Order.DESC) {
            state.sort((a, b) => b.native.text.localeCompare(a.native.text));
          } else {
            state.sort((a, b) => a.native.text.localeCompare(b.native.text));
          }
          break;
      }
      return state;
    },
  },
});

export const { addWord, setWords, updateWord, removeWord, clearWords } =
  slice.actions;
export const { getWord, getOrderedWords } = slice.selectors;

export default slice.reducer;
