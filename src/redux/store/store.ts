import { configureStore } from '@reduxjs/toolkit';

import { languagesApi } from '../languages/apiLanguage';
import langReducer from '../languages/sliceLanguage';

export const store = configureStore({
  reducer: {
    [languagesApi.reducerPath]: languagesApi.reducer,
    langs: langReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(languagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
