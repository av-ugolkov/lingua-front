import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AccessID, AccessStatus } from '@/models/Access';
import { getAccessToken } from '@/scripts/AuthToken';
import LockItem from '../LockItem';
import AuthPopup from '../Auth/AuthPopup';
import NotificationBtn from '@/components/elements/Vocabulary/NotificationBtn.tsx';
import api, { AuthStore } from '@/scripts/api';
import { RootState } from '@/redux/store/store';
import { getLang } from '@/redux/languages/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getVocab } from '@/redux/vocabularies/slice';
import { notificationWarning } from '@/redux/notifications/slice';

export default function ShortCard({ id }: { id: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const languages = useSelector((state: RootState) => state.langs);
  const vocab = useAppSelector((state) => getVocab(state, id));
  const nativeLang = useAppSelector((state) =>
    getLang(state, vocab.nativeLang)
  );
  const translateLang = useAppSelector((state) =>
    getLang(state, vocab.translateLang)
  );

  if (languages.length === 0) {
    return <></>;
  }

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
    const response = await api.get(
      '/vocabulary/access/user',
      AuthStore.OPTIONAL,
      { query: [['id', id]] }
    );
    if (response.ok) {
      const access = response.data['access'];
      switch (access) {
        case AccessStatus.Forbidden:
          dispatch(notificationWarning('Forbidden'));
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
            <div className='flex content-start'>{vocab.name}</div>
            <LockItem
              accessID={vocab.accessID}
              size={5}
            />
          </div>
          <div className='flex w-6 items-center'>
            <NotificationBtn
              id={id}
              notif={vocab.isNotification || false}
            />
          </div>
        </div>
        <div
          id='sub'
          className='flex w-full min-w-60 justify-between gap-x-4 text-gray-600'>
          <div className='flex'>{`${nativeLang} ↔ ${translateLang}`}</div>
          <div className='flex'>
            {vocab.wordsCount} word{vocab.wordsCount != 1 && 's'}
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
