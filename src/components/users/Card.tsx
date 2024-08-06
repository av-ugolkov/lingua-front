import { useEffect, useState } from 'react';

import { IUser } from '@/pages/Users';
import Avatar from '../header/Avatar';
import Button from '../elements/Button';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';

interface IVocab {
  id: string;
  name: string;
  accessID: string;
  nativeLang: string;
  translateLang: string;
  wordsCount: number;
}

export default function Card(user: IUser) {
  const { languages, fetchLanguages } = useLanguagesStore();
  const [vocabularies, setVocabularies] = useState<IVocab[]>([]);
  const { funcFetch: fetchVocabularies } = useFetch(
    '/vocabularies/user',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  useEffect(() => {
    if (languages.size == 0) {
      fetchLanguages();
    }
  }, [languages]);

  useEffect(() => {
    async function asyncFetchVocabularies() {
      const response = await fetchVocabularies({
        queries: new Map<string, string>([['user_id', user.id.toString()]]),
      });

      if (response.ok) {
        response.data.forEach((item: any) => {
          setVocabularies((prev) => [
            ...prev,
            {
              id: item['id'],
              name: item['name'],
              accessID: item['access_id'],
              nativeLang: item['native_lang'],
              translateLang: item['translate_lang'],
              wordsCount: item['words_count'],
            },
          ]);
        });
      } else {
        console.warn(response);
      }
    }
    asyncFetchVocabularies();

    return () => {
      setVocabularies([]);
    };
  }, []);

  return (
    <>
      <div className='flex flex-row h-fit p-5 my-7 bg-blue-100 shadow-md shadow-blue-300'>
        <div className='flex flex-col justify-between pr-5 border-r border-black'>
          <div>
            <div className='flex items-center mb-5 gap-x-5'>
              <Avatar
                name={user.name}
                size={16}
                className='text-4xl'
              />
              <div className='w-36'>
                <h2
                  className='w-full text-xl text-wrap truncate select-none'
                  title={user.name}>
                  {user.name}
                </h2>
                <p className='text-gray-600'>{user.role}</p>
              </div>
            </div>
            <div className='mt-5'>
              <div className='flex justify-between mb-3'>
                <span className='font-bold'>Last visit:</span>
                <span>{user.lastVisited.toLocaleDateString('uk')}</span>
              </div>
            </div>
          </div>
          <div>
            <Button
              bgColor='bg-indigo-600'
              hoverBgColor='hover:bg-indigo-500'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={() => {}}>
              Subscribe
            </Button>
          </div>
        </div>
        <div className='flex-1 pl-5'>
          <ul className='flex flex-col gap-y-3'>
            {vocabularies.map((vocab) => (
              <button
                key={vocab.id}
                className='flex flex-col px-3 py-1 bg-gray-300 duration-300 hover:shadow hover:shadow-blue-500 hover:duration-300'
                onClick={() => {}}>
                <div className='flex content-start'>{vocab.name}</div>
                <div
                  id='sub'
                  className='flex w-full justify-between text-gray-600'>
                  <div className='flex'>{`${languages.get(
                    vocab.nativeLang
                  )} ↔ ${languages.get(vocab.translateLang)}`}</div>
                  <div className='flex'>
                    {vocab.wordsCount} word{vocab.wordsCount != 1 && 's'}
                  </div>
                </div>
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
