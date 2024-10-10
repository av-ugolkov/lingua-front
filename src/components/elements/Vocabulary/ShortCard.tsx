import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { useNotificationStore } from '../../notification/useNotificationStore';
import { AccessID, AccessStatus } from '@/models/Access';
import { getAccessToken } from '@/scripts/AuthToken';
import LockItem from '../LockItem';
import AuthPopup from '../Auth/AuthPopup';
import NotificationBtn from '@/components/elements/Vocabulary/NotificationBtn.tsx';
import api, { AuthStore } from '@/scripts/api';
import { IVocab } from '@/pages/users/component/Card';

export default function ShortCard({
  id,
  name,
  accessID,
  nativeLang,
  translateLang,
  wordsCount,
}: IVocab) {
  const navigate = useNavigate();
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const { languages } = useLanguagesStore();
  const { notificationWarning } = useNotificationStore();

  if (languages.size == 0) {
    return <></>;
  }

  function openVocabulary() {
    if (getAccessToken() === '') {
      setIsShowSignInUpPopup(true);
      return;
    } else if (accessID === AccessID.Subscribers) {
      asyncVocabAccess();
    } else {
      navigate(`/vocabulary/${id}`);
    }
  }

  async function asyncVocabAccess() {
    const response = await api.get(
      '/vocabulary/access/user',
      AuthStore.OPTIONAL,
      { query: new Map([['id', id]]) }
    );
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
    }
  }

  return (
    <>
      <button
        key={id}
        className='flex flex-col px-3 py-1 bg-gray-300 border border-gray-400 duration-300 hover:shadow hover:shadow-blue-500 hover:duration-300'
        onClick={openVocabulary}>
        <div className='flex w-full justify-between'>
          <div className='flex gap-x-1'>
            <div className='flex content-start'>{name}</div>
            <LockItem
              accessID={accessID}
              size={5}
            />
          </div>
          <div className='flex w-6 items-center'>
            <NotificationBtn id={id} />
          </div>
        </div>
        <div
          id='sub'
          className='flex w-full min-w-60 justify-between gap-x-4 text-gray-600'>
          <div className='flex'>{`${languages.get(
            nativeLang
          )} ↔ ${languages.get(translateLang)}`}</div>
          <div className='flex'>
            {wordsCount} word{wordsCount != 1 && 's'}
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
    </>
  );
}
