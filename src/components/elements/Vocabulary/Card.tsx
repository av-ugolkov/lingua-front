import { useEffect, useState } from 'react';

import AuthPopup from '../Auth/AuthPopup';
import LockItem from '../LockItem';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

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
  const { funcFetch: fetchVocab } = useFetch(
    '/vocabulary/info',
    RequestMethod.GET,
    authStore
  );

  useEffect(() => {
    async function asyncFetchVocab() {
      const response = await fetchVocab({ queries: new Map([['id', id]]) });
      console.log(response.data);
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

  return (
    <>
      <div className='flex justify-between items-start w-full px-5 py-4 shadow-md shadow-blue-500'>
        <div className='flex-1'>
          <div className='flex gap-x-1 items-center'>
            <h2 className='flex items-center mr-1'>{vocab.name}</h2>
            <LockItem accessID={vocab.accessID} />
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            <span className='word-item'>Sophisticated</span>
            <span className='word-item'>Endeavour</span>
            <span className='word-item'>Quintessential</span>
            <span className='word-item'>Ephemeral</span>
            <span className='word-item'>Ubiquitous</span>
          </div>
          <div className='border-t border-black my-2 pt-2'>
            <div className='flex justify-between items-center text-gray-500'>
              <p className='m-0'>{`${languages.get(
                vocab.nativeLang
              )} ↔ ${languages.get(vocab.translateLang)}`}</p>
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

        <button
          className='menu-button'
          onClick={() => {}}>
          <EllipsisVerticalIcon className='size-6' />
        </button>
      </div>
      {isShowSignInUpPopup && (
        <AuthPopup close={() => setIsShowSignInUpPopup(false)} />
      )}
    </>
  );
}
