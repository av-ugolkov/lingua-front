import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPopup from '../Auth/AuthPopup';
import LockItem from '../LockItem';
import {
  AuthStore,
  RequestMethod,
  useFetch,
  useFetchFunc,
} from '@/hooks/fetch/useFetch';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import Tag from '../Tags/Tag';
import ArrowBothSide from '@/assets/ArrowBothSide';
import { AccessID } from '@/models/Access';
import { getAccessToken } from '@/scripts/AuthToken';

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
  const navigate = useNavigate();
  const [vocab, setVocab] = useState<Vocab>({} as Vocab);
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const { languages } = useLanguagesStore();
  const [words, setWords] = useState<IWord[]>([]);
  const { response: respVocabInfo } = useFetch(
    '/vocabulary/info',
    RequestMethod.GET,
    authStore,
    {
      query: `id=${id}`,
    }
  );
  const { response: respRandomWords } = useFetch(
    '/vocabulary/words/random',
    RequestMethod.GET,
    authStore,
    { query: `id=${id}&limit=${CountRequestWords}` }
  );
  const { fetchFunc: fetchVocabAccess } = useFetchFunc(
    '/vocabulary/access/user',
    RequestMethod.GET,
    authStore
  );

  useEffect(() => {
    if (respVocabInfo.ok) {
      setVocab({
        id: respVocabInfo.data['id'],
        name: respVocabInfo.data['name'],
        userID: respVocabInfo.data['user_id'],
        userName: respVocabInfo.data['user_name'],
        accessID: respVocabInfo.data['access_id'],
        nativeLang: respVocabInfo.data['native_lang'],
        translateLang: respVocabInfo.data['translate_lang'],
        description: respVocabInfo.data['description'],
        wordsCount: respVocabInfo.data['words_count'],
        tags: respVocabInfo.data['tags'],
        createdAt: new Date(respVocabInfo.data['created_at']),
        updatedAt: new Date(respVocabInfo.data['updated_at']),
      });
    }
  }, [respVocabInfo]);

  useEffect(() => {
    if (respRandomWords.ok) {
      respRandomWords.data.forEach((item: any) => {
        setWords((words) => [
          ...words,
          {
            value: item['native']['text'],
            pronunciation: item['native']['pronunciation'],
          },
        ]);
      });
    }
    return () => {
      setWords([]);
    };
  }, [respRandomWords]);

  function openVocabulary() {
    if (getAccessToken() === '') {
      setIsShowSignInUpPopup(true);
      return;
    } else if (vocab.accessID === AccessID.Subscribers) {
      asyncVocabAccess();
    } else {
      navigate(`/vocabulary/${id}`);
    }
  }

  async function asyncVocabAccess() {
    const response = await fetchVocabAccess({ query: `id=${id}` });
    if (response.ok) {
      console.warn(response.data);
    } else {
      console.error(response.data);
    }
  }

  return (
    <div className='relative bg-blue-100 shadow-md shadow-blue-300 duration-300 hover:shadow-lg hover:shadow-blue-400 hover:duration-300'>
      <button
        className='flex flex-col justify-between items-start w-full px-5 py-4'
        onClick={openVocabulary}>
        <div className='flex gap-x-1 items-center'>
          <h2 className='flex items-center mr-1 text-xl'>{vocab.name}</h2>
          <LockItem accessID={vocab.accessID} />
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
            <p className='m-0 font-bold'>{vocab.userName}</p>
            <p className='m-0'>{vocab.createdAt?.toLocaleString('en-GB')}</p>
          </div>
        </div>
      </button>
      {isShowSignInUpPopup && (
        <AuthPopup
          close={() => {
            setIsShowSignInUpPopup(false);
          }}
        />
      )}
    </div>
  );
}
