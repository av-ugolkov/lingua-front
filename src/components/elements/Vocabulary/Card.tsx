import { useEffect, useState } from 'react';

import AuthPopup from '../Auth/AuthPopup';
import LockItem from '../LockItem';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import {
  ArrowTopRightOnSquareIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Tag from '../Tags/Tag';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownItem from '../Dropdown/Item';
import ArrowBothSide from '@/assets/ArrowBothSide';

const CountRequestWords = '12';

export interface Vocab {
  id: string;
  name: string;
  description: string;
  wordsCount: number;
  userID: string;
  userName: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IWord {
  value: string;
  pronunciation: string;
}

export default function Card({
  id,
  authStore,
}: {
  id: string;
  authStore: AuthStore;
}) {
  const [vocab, setVocab] = useState<Vocab>({} as Vocab);
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const { languages } = useLanguagesStore();
  const [words, setWords] = useState<IWord[]>([]);
  const { funcFetch: fetchVocab } = useFetch(
    '/vocabulary/info',
    RequestMethod.GET,
    authStore
  );
  const { funcFetch: fetchRandomWords } = useFetch(
    '/vocabulary/words/random',
    RequestMethod.GET,
    authStore
  );

  useEffect(() => {
    async function asyncFetchVocab() {
      const response = await fetchVocab({ queries: new Map([['id', id]]) });
      if (response.ok) {
        setVocab({
          id: response.data['id'],
          name: response.data['name'],
          userID: response.data['user_id'],
          userName: response.data['user_name'],
          accessID: response.data['access_id'],
          nativeLang: response.data['native_lang'],
          translateLang: response.data['translate_lang'],
          description: response.data['description'],
          wordsCount: response.data['words_count'],
          tags: response.data['tags'],
          createdAt: new Date(response.data['created_at']),
          updatedAt: new Date(response.data['updated_at']),
        });
      } else {
        console.warn(response.data);
      }
    }
    asyncFetchVocab();
  }, [id]);

  useEffect(() => {
    async function asyncFetchRandomWords() {
      const response = await fetchRandomWords({
        queries: new Map([
          ['vocab_id', id],
          ['limit', CountRequestWords],
        ]),
      });
      if (response.ok) {
        response.data.forEach((item: any) => {
          setWords((words) => [
            ...words,
            {
              value: item['native']['text'],
              pronunciation: item['native']['pronunciation'],
            },
          ]);
        });
      } else {
        console.error(response.data);
      }
    }

    asyncFetchRandomWords();

    return () => {
      setWords([]);
    };
  }, []);

  return (
    <>
      <div className='flex flex-col justify-between items-start w-full px-5 py-4 bg-blue-100 shadow-md shadow-blue-300'>
        <div className='flex w-full justify-between'>
          <div className='flex gap-x-1 items-center'>
            <h2 className='flex items-center mr-1 text-xl'>{vocab.name}</h2>
            <LockItem accessID={vocab.accessID} />
          </div>
          <DropdownMenu baseSize='w-7 h-7'>
            <DropdownItem onClick={() => {}}>
              Open
              <ArrowTopRightOnSquareIcon className='size-5' />
            </DropdownItem>
            <DropdownItem onClick={() => {}}>
              Copy
              <DocumentDuplicateIcon className='size-5' />
            </DropdownItem>
          </DropdownMenu>
        </div>
        <div className='flex w-full text-gray-500'>{vocab.description}</div>
        <div className='flex flex-wrap w-full gap-1 mt-2'>
          {words.map((word) => (
            <Tag
              key={word.value}
              value={word.value}
            />
          ))}
        </div>
        <div className='flex flex-col w-full border-t border-black mt-2 pt-2'>
          <div className='flex justify-between items-center text-gray-500'>
            <div className='flex'>
              <p className='m-0'>{languages.get(vocab.nativeLang)}</p>
              <ArrowBothSide className='w-5 mx-1' />
              <p className='m-0'>{languages.get(vocab.translateLang)}</p>
            </div>
            <p className='m-0'>
              {vocab.wordsCount} word{vocab.wordsCount != 1 && 's'}
            </p>
          </div>
          <div className='flex justify-between items-center text-gray-500'>
            <p className='m-0'>{vocab.userName}</p>
            <p className='m-0'>{vocab.createdAt?.toLocaleString('en-GB')}</p>
          </div>
        </div>
      </div>
      {isShowSignInUpPopup && (
        <AuthPopup close={() => setIsShowSignInUpPopup(false)} />
      )}
    </>
  );
}
