import { useEffect, useMemo } from 'react';

import FullCard from '@/components/elements/Vocabulary/FullCard';
import Pagination from '../elements/Pagination/Pagination';
import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore.ts';
import { AuthStore, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { usePaginationStore } from '../elements/Pagination/usePaginationStore';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

const LIMIT_WORDS = 12;

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const { page, itemsPerPage, setCountItems } = usePaginationStore();
  const { sort, order } = useSortedStore();
  const { searchValue } = useSearchStore();
  const { vocabularies, addVocabulary, setVocabularies } =
    useVocabulariesStore();

  const query = useMemo(
    () =>
      new Map<string, any>([
        ['page', page],
        ['per_page', itemsPerPage],
        ['order', order],
        ['sort', sort],
        ['search', searchValue],
        ['native_lang', nativeLang],
        ['translate_lang', translateLang],
        ['limit_words', LIMIT_WORDS],
      ]),
    [page, itemsPerPage, order, sort, searchValue, nativeLang, translateLang]
  );
  const { isLoading, response: respVocabs } = useFetch(
    '/vocabularies',
    RequestMethod.GET,
    AuthStore.NO,
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
          tags: item['tags'] || [],
          words: item['words'] || [],
          createdAt: new Date(item['created_at']),
          updatedAt: new Date(item['updated_at']),
        });
      });
      setCountItems(respVocabs.data['total_count']);
    }
    return () => {
      setVocabularies([]);
    };
  }, [respVocabs, addVocabulary, setVocabularies, setCountItems]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className='grid w-full gap-y-5 grid-cols-1'>
      {vocabularies.map((item) => (
        <FullCard
          key={item.id}
          id={item.id}
          authStore={AuthStore.OPTIONAL}
        />
      ))}
      <Pagination />
    </div>
  );
}
