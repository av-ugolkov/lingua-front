import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import FullCard from '@/components/elements/Vocabulary/FullCard';
import Pagination from '@/components/elements/Pagination/Pagination';
import useFetch from '@/hooks/useFetch';
import { usePaginationStore } from '@/components/elements/Pagination/usePaginationStore';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const navigate = useNavigate();
  const { sort, order } = useSortedStore();
  const { searchValue } = useSearchStore();
  const { page, itemsPerPage, setCountItems } = usePaginationStore();
  const { vocabularies, addVocabulary, setVocabularies } =
    useVocabulariesStore();

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
      respVocabs.data['vocabularies'].forEach((item: any) => {
        addVocabulary({
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
          createdAt: new Date(item['created_at']),
          updatedAt: new Date(item['updated_at']),
        });
      });
      setCountItems(respVocabs.data['total_count']);
    } else if (respVocabs.status === 401) {
      navigate('/');
    }

    return () => {
      setVocabularies([]);
    };
  }, [addVocabulary, setVocabularies, navigate, setCountItems, respVocabs]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <div className='grid w-full gap-y-5 grid-cols-1'>
        {vocabularies.map((item) => (
          <FullCard
            key={item.id}
            id={item.id}
            authStore={AuthStore.USE}
          />
        ))}
        <Pagination />
      </div>
    </>
  );
}
