import { useEffect, useState } from 'react';

import Card, { Vocab } from '@/components/elements/Vocabulary/Card';
import { Order, Sorted } from '@/models/Sorted';
import Pagination from './Pagination';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';

const vocabsEmpty: Vocab[] = [];

interface SortedInputProps {
  searchValue: string;
  sortType: Sorted;
  orderType: Order;
  nativeLang: string;
  translateLang: string;
}

export default function List({
  searchValue,
  sortType,
  orderType,
  nativeLang,
  translateLang,
}: SortedInputProps) {
  const [pageNum, setPageNum] = useState(1);
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);

  const { funcFetch: fetchVocabs } = useFetch(
    '/vocabularies',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  const [vocabs, setVocabs] = useState(vocabsEmpty);

  useEffect(() => {
    async function asyncFetchVocabs() {
      const response = await fetchVocabs({
        queries: new Map<string, any>([
          ['page', pageNum],
          ['per_page', countItemsPerPage],
          ['search', searchValue],
          ['sort', sortType],
          ['order', orderType],
          ['native_lang', nativeLang],
          ['translate_lang', translateLang],
        ]),
      });

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
      } else {
        console.error(response);
      }
    }

    asyncFetchVocabs();

    return () => {
      setVocabs(vocabsEmpty);
      setCountItems(0);
    };
  }, [
    countItemsPerPage,
    searchValue,
    pageNum,
    sortType,
    orderType,
    nativeLang,
    translateLang,
  ]);

  return (
    <div className='grid min-w-[540px] w-full gap-5 grid-cols-1'>
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
        countItemsPerPage={(value) => {
          setCountItemsPerPage(value);
        }}
      />
    </div>
  );
}
