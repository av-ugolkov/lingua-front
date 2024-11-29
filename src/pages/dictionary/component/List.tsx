import Pagination from '@/components/elements/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useFetch from '@/hooks/useFetch';
import { DictWord } from '@/models/Word';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import { useEffect, useMemo, useState } from 'react';
import Word from './Word';
import { setCountItems } from '@/redux/pagination/slice';

export default function List() {
  const dispatch = useAppDispatch();
  const [words, setWords] = useState<DictWord[]>([]);
  const { page, itemsPerPage } = useAppSelector((state) => state.pagination);
  const { searchValue } = useAppSelector((state) => state.searchAndOrder);
  const lang = useAppSelector((state) => state.langStore.currentLang);
  const query = useMemo<IQueryType>(
    () => [
      ['lang_code', lang],
      ['page', page],
      ['per_page', itemsPerPage],
      ['search', searchValue],
    ],
    [itemsPerPage, lang, page, searchValue]
  );
  const { isLoading, response } = useFetch(
    '/dictionary',
    RequestMethod.GET,
    AuthStore.NO,
    {
      query: query,
    }
  );

  useEffect(() => {
    if (response.ok) {
      const w: DictWord[] = [];
      response.data.forEach((item: any) => {
        w.push({
          id: item['id'],
          text: item['text'],
          pronunciation: item['pronunciation'],
          langCode: item['lang_code'],
          creator: item['creator'],
          createdAt: item['created_at'],
        });
      });
      setWords(w);
      dispatch(setCountItems(w.length));
    }
  }, [dispatch, response.data, response.ok]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid w-full gap-y-2 grid-cols-1'>
      {words.map((word: any) => {
        return (
          <Word
            key={word.id}
            word={word}
          />
        );
      })}
      <Pagination
        countsItemsPerPage={[
          { key: '20', value: '20' },
          { key: '30', value: '30' },
          { key: '50', value: '50' },
          { key: '25', value: '25' },
          { key: '100', value: '100' },
        ]}
      />
    </div>
  );
}
