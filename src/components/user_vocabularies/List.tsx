import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';
import FullCard from '../elements/Vocabulary/FullCard';
import Pagination from '../elements/Pagination/Pagination';
import { AuthStore, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';

interface SortedInputProps {
  nativeLang: string;
  translateLang: string;
}

export default function List({ nativeLang, translateLang }: SortedInputProps) {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const { sort, order } = useSortedStore();
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);
  const { searchValue } = useSearchStore();
  const { vocabularies, addVocabulary, setVocabularies } =
    useVocabulariesStore();
  const { isLoading, response: respVocabs } = useFetch(
    '/account/vocabularies',
    RequestMethod.GET,
    AuthStore.USE,
    {
      query: new Map([
        ['page', `${pageNum}`],
        ['per_page', `${countItemsPerPage}`],
        ['order', `${order}`],
        ['sort', `${sort}`],
        ['search', searchValue],
        ['native_lang', nativeLang],
        ['translate_lang', translateLang],
      ]),
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
          words: item['words'],
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
  }, [addVocabulary, setVocabularies, navigate, respVocabs]);

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
        <Pagination
          currentPage={pageNum}
          countItems={countItems}
          setPageNum={setPageNum}
          countItemsPerPage={setCountItemsPerPage}
        />
      </div>
    </>
  );
}
