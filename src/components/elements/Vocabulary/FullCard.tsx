import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPopup from '../Auth/AuthPopup';
import LockItem from '../LockItem';
import Tag from '../Tags/Tag';
import ArrowBothSide from '@/assets/ArrowBothSide';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { AccessID, AccessStatus } from '@/models/Access';
import { getAccessToken } from '@/scripts/AuthToken';
import { useNotificationStore } from '@/components/notification/useNotificationStore';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore.ts';
import Menu from './Menu';
import api, { AuthStore } from '@/scripts/api';

export default function FullCard({
  id,
  authStore,
}: {
  id: string;
  authStore: AuthStore;
}) {
  const navigate = useNavigate();
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const { languages } = useLanguagesStore();
  const { notificationWarning } = useNotificationStore();
  const { getVocabulary, getWords } = useVocabulariesStore();

  const { fetchFunc: fetchVocabAccess } = api.get(
    '/vocabulary/access/user',
    authStore
  );

  function openVocabulary() {
    if (
      getVocabulary(id).accessID !== AccessID.Public &&
      getAccessToken() === ''
    ) {
      setIsShowSignInUpPopup(true);
      return;
    } else if (getVocabulary(id).accessID === AccessID.Subscribers) {
      asyncVocabAccess();
    } else {
      navigate(`/vocabulary/${id}`);
    }
  }

  async function asyncVocabAccess() {
    const response = await fetchVocabAccess({ query: new Map([['id', id]]) });
    if (response.ok) {
      const access = response.data['access'];
      switch (access) {
        case AccessStatus.Forbidden:
          notificationWarning('Forbidden');
          break;
        case AccessStatus.Read:
        case AccessStatus.Edit:
          navigate(`/vocabulary/${id}`);
          break;
      }
      console.warn(response.data);
    }
  }

  return (
    <div className='relative bg-blue-100 shadow-md shadow-blue-300 duration-300 hover:shadow-lg hover:shadow-blue-400 hover:duration-300'>
      <div className='absolute top-2 right-1'>
        <Menu
          key={id}
          vocabID={id}
        />
      </div>
      <button
        className='flex flex-col justify-between items-start w-full px-6 py-5'
        onClick={openVocabulary}>
        <div className='flex w-full justify-between'>
          <div className='flex gap-x-1 items-center'>
            <h2 className='flex items-center mr-1 text-xl'>
              {getVocabulary(id).name}
            </h2>
            <LockItem accessID={getVocabulary(id).accessID} />
          </div>
        </div>
        <div className='flex w-full text-gray-500'>
          {getVocabulary(id).description}
        </div>
        <div className='flex flex-wrap w-full gap-1 mt-2'>
          {getWords(id).map((word) => (
            <Tag
              key={word}
              value={word}
            />
          ))}
        </div>
        <div className='flex flex-col w-full border-t border-black mt-2 pt-2'>
          <div className='flex justify-between items-center text-gray-500'>
            <div className='flex'>
              <p className='m-0'>
                {languages.get(getVocabulary(id).nativeLang)}
              </p>
              <ArrowBothSide className='w-5 mx-1' />
              <p className='m-0'>
                {languages.get(getVocabulary(id).translateLang)}
              </p>
            </div>
            <p className='m-0'>
              {getVocabulary(id).wordsCount} word
              {getVocabulary(id).wordsCount != 1 && 's'}
            </p>
          </div>
          <div className='flex justify-between items-center text-gray-500'>
            <p className='m-0 font-bold'>{getVocabulary(id).userName}</p>
            <p className='m-0'>
              {getVocabulary(id).createdAt?.toLocaleString('en-GB')}
            </p>
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
