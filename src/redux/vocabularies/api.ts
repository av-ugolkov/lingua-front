import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getFullAddr } from '@/config';
import { VocabularyData } from '@/models/Vocabulary';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getFullAddr('/vocabularies') }),
  endpoints: (build) => ({
    getVocabs: build.query<VocabularyData[], void>({
      query: () => '',
    }),
  }),
});

export const { useGetVocabsQuery } = api;
