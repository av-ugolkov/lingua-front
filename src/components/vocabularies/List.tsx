import { useEffect, useState } from 'react';

import FullCard from '@/components/elements/Vocabulary/FullCard';
import Pagination from './Pagination';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore.ts';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const [pageNum, setPageNum] = useState(1);
  const { sort, order } = useSortedStore();
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);
  const { searchValue } = useSearchStore();
  const { vocabularies, addVocabulary, setVocabularies } =
    useVocabulariesStore();

  const { isLoading, response: respVocabs } = useFetch(
    '/vocabularies',
    RequestMethod.GET,
    AuthStore.NO,
    {
      query: `page=${pageNum}&per_page=${countItemsPerPage}&order=${order}&sort=${sort}&search=${searchValue}&native_lang=${nativeLang}&translate_lang=${translateLang}`,
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
          createdAt: new Date(item['created_at']),
          updatedAt: new Date(item['updated_at']),
        });
      });
      setCountItems(respVocabs.data['total_count']);
    }
    return () => {
      setVocabularies([]);
    };
  }, [respVocabs, addVocabulary, setVocabularies]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className='grid w-full gap-5 grid-cols-1'>
      {vocabularies.map((item) => (
        <FullCard
          key={item.id}
          id={item.id}
          authStore={AuthStore.OPTIONAL}
        />
      ))}
      <Pagination
        currentPage={pageNum}
        countItems={countItems}
        setPageNum={setPageNum}
        countItemsPerPage={setCountItemsPerPage}
      />
    </div>
  );
}
