import { configureStore } from '@reduxjs/toolkit';

import { api as languagesApi } from '../languages/api';
import langReducer from '../languages/slice';
import vocabsReducer from '../vocabularies/slice';

export const store = configureStore({
  reducer: {
    [languagesApi.reducerPath]: languagesApi.reducer,
    langs: langReducer,
    vocabs: vocabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
