import { useEffect, useMemo, useState } from 'react';

import RecomendedVocabs from '@/pages/main/component/RecommendedVocabs';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { useAppDispatch } from '@/hooks/redux';
import { clearToasts } from '@/redux/toasts/slice';
import { DictWord } from '@/models/Word';
import RandomWord from './component/RandomWord';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [words, setWords] = useState<DictWord[]>([]);

  const query = useMemo<IQueryType>(
    () => [
      ['lang_code', 'en'],
      ['limit', 3],
    ],
    []
  );
  const { response: respRandomWord } = useFetch(
    '/dictionary/word/random',
    RequestMethod.GET,
    AuthStore.NO,
    { query: query }
  );

  useEffect(() => {
    return () => {
      dispatch(clearToasts());
    };
  }, [dispatch]);

  useEffect(() => {
    if (respRandomWord.ok) {
      const words: DictWord[] = [];
      respRandomWord.data.forEach((item: any) => {
        words.push({
          id: item['id'],
          text: item['text'],
          pronunciation: item['pronunciation'],
          langCode: item['lang_code'],
          creator: '',
          createdAt: '',
        });
      });
      setWords(words);
    }
  }, [respRandomWord]);

  return (
    <>
      <section className='block bg-blue-100 text-center mt-8 p-5 shadow-md shadow-blue-300'>
        <div
          id='word-container'
          className='flex justify-evenly'>
          {words.map((word) => {
            return (
              <RandomWord
                key={word.id}
                word={word}
              />
            );
          })}
        </div>
      </section>

      <RecomendedVocabs />

      <section className='flex pt-8 gap-x-6 text-center'>
        <div className='block w-1/2 bg-blue-100 p-5 shadow-md shadow-blue-300'>
          <h3 className='text-2xl text-gray-700'>Interactive Lessons</h3>
          <p className='text-gray-700 mt-3'>
            Immerse yourself in an engaging learning process with our
            interactive lessons.
          </p>
          <p className='text-lg font-bold'>Soon</p>
        </div>
        <div className='block w-1/2 bg-blue-100 p-5 shadow-md shadow-blue-300'>
          <h3 className='text-2xl text-gray-700'>Word Games</h3>
          <p className='text-gray-700 mt-3'>
            Reinforce your knowledge by playing our exciting word memorization
            games.
          </p>
          <p className='text-lg font-bold'>Soon</p>
        </div>
      </section>
    </>
  );
}
