import { useEffect, useMemo, useState } from 'react';

import RecomendedVocabs from '@/pages/main/component/RecommendedVocabs';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { useAppDispatch } from '@/hooks/redux';
import { clearNotifications } from '@/redux/notifications/slice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [word, setWord] = useState('');

  const query = useMemo<IQueryType>(() => [['lang_code', 'en']], []);
  const { response: respRandomWord } = useFetch(
    '/dictionary/word/random',
    RequestMethod.GET,
    AuthStore.NO,
    { query: query }
  );

  useEffect(() => {
    return () => {
      dispatch(clearNotifications());
    };
  }, [dispatch]);

  useEffect(() => {
    if (respRandomWord.ok) {
      setWord(respRandomWord.data['text']);
    }
  }, [respRandomWord]);

  return (
    <>
      <section className='block bg-blue-100 text-center mt-8 p-5 shadow-md shadow-blue-300'>
        <h2 className='text-xl'>Word of the day</h2>
        <div id='word-container'>
          <h3 className='text-3xl font-bold'>{word}</h3>
          <p>Language: English</p>
          <p>Translation: -</p>
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
