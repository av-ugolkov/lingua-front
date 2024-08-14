import { useEffect, useState } from 'react';

import { IUser } from '@/pages/Users';
import Avatar from '../header/Avatar';
import Button from '../elements/Button';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import VocabTag from './VocabTag';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { AccessID } from '@/models/Access';

export interface IVocab {
  id: string;
  name: string;
  accessID: AccessID;
  nativeLang: string;
  translateLang: string;
  wordsCount: number;
}

export default function Card(user: IUser) {
  const [vocabularies, setVocabularies] = useState<IVocab[]>([]);
  const { languages } = useLanguagesStore();
  const { funcFetch: fetchVocabularies } = useFetch(
    '/vocabularies/user',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  if (languages.size == 0) {
    return <></>;
  }

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
                className='size-16 text-4xl'
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
              <VocabTag
                key={vocab.id}
                {...vocab}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
