import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFullAddr } from '@/config';
import { ILanguage } from './slice';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getFullAddr('/languages') }),
  endpoints: (build) => ({
    getLanguages: build.query<any, void>({
      query: () => '',
      transformResponse: (response: any) => {
        return response as ILanguage[];
      },
    }),
  }),
});

export const { useGetLanguagesQuery } = api;
