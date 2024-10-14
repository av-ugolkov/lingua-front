import { createSlice } from '@reduxjs/toolkit/react';
import { languagesApi } from './apiLanguage';

export interface ILanguage {
  lang: string;
  code: string;
}

const initialState: ILanguage[] = [];

const langsSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      languagesApi.endpoints.getLanguages.matchFulfilled,
      (state, action) => {
        action.payload.forEach((item: ILanguage) => {
          state.push({
            lang: item.lang,
            code: item.code,
          });
        });
      }
    );
  },
});

const { reducer } = langsSlice;

export default reducer;
