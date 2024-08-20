import { useEffect, useState } from 'react';

import Card, { Vocab } from '@/components/elements/Vocabulary/Card';
import Pagination from './Pagination';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const [pageNum, setPageNum] = useState(1);
  const { sort, order, setDefaultOrderType } = useSortedStore();
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);
  const { searchValue } = useSearchStore();

  const { response } = useFetch(
    '/vocabularies',
    RequestMethod.GET,
    AuthStore.NO,
    {
      query: `page=${pageNum}&per_page=${countItemsPerPage}&order=${order}&sort=${sort}&search=${searchValue}&native_lang=${nativeLang}&translate_lang=${translateLang}`,
    }
  );

  const [vocabs, setVocabs] = useState<Vocab[]>([]);

  useEffect(() => {
    if (response.ok) {
      const vocabs: Vocab[] = [];
      response.data['vocabularies'].forEach((item: any) => {
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
          createdAt: new Date(item['created_at']),
          updatedAt: new Date(item['updated_at']),
        });
      });
      setVocabs(vocabs);
      setCountItems(response.data['total_count']);
    }
    return () => {
      setVocabs([]);
      setDefaultOrderType();
    };
  }, [response, setDefaultOrderType]);

  return (
    <>
      {vocabs.map((item) => (
        <Card
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
    </>
  );
}
