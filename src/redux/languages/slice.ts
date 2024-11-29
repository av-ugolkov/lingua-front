import { createSlice } from '@reduxjs/toolkit/react';
import { api } from './api';

export interface ILanguage {
  lang: string;
  code: string;
}

interface IState {
  langs: ILanguage[];
  currentLang: string;
}

const initialState: IState = {
  langs: [],
  currentLang: 'en',
};

const slice = createSlice({
  name: 'langStore',
  initialState,
  reducers: {
    setLangs: (state, action: { payload: ILanguage[] }) => {
      state.langs.splice(0, state.langs.length);
      action.payload.forEach((item: ILanguage) => {
        state.langs.push(item);
      });
    },
    setCurrentLang: (state, action: { payload: string }) => {
      state.currentLang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getLanguages.matchFulfilled,
      (state, action: { payload: ILanguage[] }) => {
        state.langs.splice(0, state.langs.length);
        action.payload.forEach((item: ILanguage) => {
          state.langs.push(item);
        });
      }
    );
  },
  selectors: {
    getLangs: (state) => state.langs,
    getLang: (state, code: string) => {
      const lang =
        state.langs.find((item) => item.code === code)?.lang || 'Unknown';
      return lang;
    },
  },
});

export const { setLangs, setCurrentLang } = slice.actions;
export const { getLangs, getLang } = slice.selectors;

export default slice.reducer;
