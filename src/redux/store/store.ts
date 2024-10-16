import { configureStore } from '@reduxjs/toolkit';

import { api as languagesApi } from '../languages/api';
import langReducer from '../languages/slice';
import vocabsReducer from '../vocabularies/slice';
import wordsReducer from '../words/slice';

export const store = configureStore({
  reducer: {
    [languagesApi.reducerPath]: languagesApi.reducer,
    langs: langReducer,
    vocabs: vocabsReducer,
    words: wordsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
