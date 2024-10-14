import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILanguage } from './sliceLanguage';
import { getAddr } from '@/config';

export const languagesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getAddr() + '/languages' }),
  endpoints: (build) => ({
    getLanguages: build.query<ILanguage[], void>({
      query: () => '',
    }),
  }),
});

export const { useGetLanguagesQuery } = languagesApi;
