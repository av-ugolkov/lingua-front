import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILanguage } from './slice';
import { getFullAddr } from '@/config';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getFullAddr('/languages') }),
  endpoints: (build) => ({
    getLanguages: build.query<ILanguage[], void>({
      query: () => '',
    }),
  }),
});

export const { useGetLanguagesQuery } = api;
