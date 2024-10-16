import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import List from '@/components/vocabulary/List';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortWordTypes } from '@/models/Sorted';
import Header from '@/components/vocabulary/Header.tsx';
import { VocabularyData } from '@/models/Vocabulary.ts';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { useAppDispatch } from '@/hooks/redux';
import { clearVocabs, setVocabs } from '@/redux/vocabularies/slice';

export default function Vocabulary() {
  const { id } = useParams();
  const query = useMemo<IQueryType>(() => [['id', id]], [id]);
  const dispatch = useAppDispatch();

  const { isLoading, response: respVocabInfo } = useFetch(
    '/vocabulary/info',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    {
      query: query,
    }
  );

  useEffect(() => {
    if (respVocabInfo.ok) {
      const vocabs: VocabularyData[] = [];
      vocabs.push({
        id: respVocabInfo.data['id'],
        name: respVocabInfo.data['name'],
        userID: respVocabInfo.data['user_id'],
        userName: respVocabInfo.data['user_name'],
        accessID: respVocabInfo.data['access_id'],
        nativeLang: respVocabInfo.data['native_lang'],
        translateLang: respVocabInfo.data['translate_lang'],
        description: respVocabInfo.data['description'],
        wordsCount: respVocabInfo.data['words_count'],
        editable: respVocabInfo.data['editable'],
        tags: respVocabInfo.data['tags'],
        words: respVocabInfo.data['words'],
        createdAt: respVocabInfo.data['created_at'],
        updatedAt: respVocabInfo.data['updated_at'],
      });
      dispatch(setVocabs(vocabs));
    }

    return () => {
      dispatch(clearVocabs());
    };
  }, [respVocabInfo, dispatch]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Header />
      <div className='flex justify-between'>
        <SearchInput />
        <SortedPanel sortedTypes={SortWordTypes} />
      </div>
      <div className='py-5'>
        <List />
      </div>
    </>
  );
}
