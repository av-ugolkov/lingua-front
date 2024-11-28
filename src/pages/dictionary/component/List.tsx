import Pagination from '@/components/elements/Pagination/Pagination';
import { useAppSelector } from '@/hooks/redux';
import useFetch from '@/hooks/useFetch';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import { useEffect, useMemo, useState } from 'react';

interface Word {
  id: number;
  text: string;
  pronunciation: string;
  langCode: string;
  createdAt: string;
}

export default function List() {
  const [words, setWords] = useState<Word[]>([]);
  const lang = useAppSelector((state) => state.langStore.currentLang);
  const query = useMemo<IQueryType>(() => [['lang_code', lang]], [lang]);
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
      const w: Word[] = [];
      response.data.forEach((item: any) => {
        w.push({
          id: item['id'],
          text: item['text'],
          pronunciation: item['pronunciation'],
          langCode: item['lang_code'],
          createdAt: item['created_at'],
        });
      });
      setWords(w);
    }
  }, [response.data, response.ok]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {words.map((word: any) => {
          return <div key={word.id}>{word.text}</div>;
        })}
      </div>
      <Pagination />
    </div>
  );
}
