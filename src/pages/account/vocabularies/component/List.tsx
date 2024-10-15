import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import FullCard from '@/components/elements/Vocabulary/FullCard';
import Pagination from '@/components/elements/Pagination/Pagination';
import useFetch from '@/hooks/useFetch';
import { usePaginationStore } from '@/components/elements/Pagination/usePaginationStore';
import { clearVocabs, setVocabs } from '@/redux/vocabularies/slice';
import { VocabularyData } from '@/models/Vocabulary';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const { sort, order } = useSortedStore();
  const { searchValue } = useSearchStore();
  const { page, itemsPerPage, setCountItems } = usePaginationStore();
  const vocabs = useAppSelector((state) => state.vocabs);
  const dispatch = useAppDispatch();

  const query = useMemo<IQueryType>(
    () => [
      ['page', page],
      ['per_page', itemsPerPage],
      ['order', order],
      ['sort', sort],
      ['search', searchValue],
      ['native_lang', nativeLang],
      ['translate_lang', translateLang],
    ],
    [page, itemsPerPage, order, sort, searchValue, nativeLang, translateLang]
  );
  const { isLoading, response: respVocabs } = useFetch(
    '/account/vocabularies',
    RequestMethod.GET,
    AuthStore.USE,
    {
      query: query,
    }
  );

  useEffect(() => {
    if (respVocabs.ok) {
      const vocabs: VocabularyData[] = [];
      respVocabs.data['vocabularies'].forEach((item: any) => {
        vocabs.push({
          id: item['id'],
          name: item['name'],
          userID: item['user_id'],
          userName: item['user_name'],
          accessID: item['access_id'],
          nativeLang: item['native_lang'],
          translateLang: item['translate_lang'],
          description: item['description'],
          wordsCount: item['words_count'],
          tags: item['tags'],
          words: item['words'] || [],
          createdAt: item['created_at'],
          updatedAt: item['updated_at'],
        });
      });
      dispatch(setVocabs(vocabs));
      setCountItems(respVocabs.data['total_count']);
    } else if (respVocabs.status === 401) {
      useNavigate.call('/');
    }

    return () => {
      dispatch(clearVocabs());
    };
  }, [setCountItems, dispatch, respVocabs]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className='grid w-full gap-y-5 grid-cols-1'>
      {vocabs.map((item) => (
        <FullCard
          key={item.id}
          id={item.id}
          authStore={AuthStore.USE}
        />
      ))}
      <Pagination />
    </div>
  );
}
