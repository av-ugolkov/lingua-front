import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import List from '@/components/vocabulary/List';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortWordTypes } from '@/models/Sorted';
import Header from '@/components/vocabulary/Header.tsx';
import { VocabularyData } from '@/models/Vocabulary.ts';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore.ts';
import { AuthStore, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';

export default function Vocabulary() {
  const { id } = useParams();
  const { isLoading, response: respVocabInfo } = useFetch(
    '/vocabulary/info',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    {
      query: `id=${id}`,
    }
  );

  const vocabulariesStore = useVocabulariesStore();
  useEffect(() => {
    if (respVocabInfo.ok) {
      const vocab: VocabularyData = {
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
        createdAt: new Date(respVocabInfo.data['created_at']),
        updatedAt: new Date(respVocabInfo.data['updated_at']),
      };
      vocabulariesStore.addVocabulary(vocab);
    }
  }, [respVocabInfo, vocabulariesStore]);

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
