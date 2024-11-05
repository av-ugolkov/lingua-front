import { createSlice } from '@reduxjs/toolkit/react';
import { api } from './api';

export interface ILanguage {
  lang: string;
  code: string;
}

const initialState: ILanguage[] = [];

const slice = createSlice({
  name: 'langs',
  initialState,
  reducers: {
    setLangs: (state, action: { payload: ILanguage[] }) => {
      state.splice(0, state.length);
      action.payload.forEach((item: ILanguage) => {
        state.push(item);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getLanguages.matchFulfilled,
      (state, action: { payload: ILanguage[] }) => {
        state.splice(0, state.length);
        action.payload.forEach((item: ILanguage) => {
          state.push(item);
        });
      }
    );
  },
  selectors: {
    getLang: (state, code: string) => {
      const lang = state.find((item) => item.code === code)?.lang || 'Unknown';
      return lang;
    },
  },
});

export const { setLangs } = slice.actions;
export const { getLang } = slice.selectors;

export default slice.reducer;
