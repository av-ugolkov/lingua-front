import { IVocab } from './Card';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { useNavigate } from 'react-router-dom';
import LockItem from '../elements/LockItem';
import { AccessID, AccessStatus } from '@/models/Access';
import { AuthStore, RequestMethod, useFetchFunc } from '@/hooks/fetch/useFetch';
import { getAccessToken } from '@/scripts/AuthToken';
import { useNotificationStore } from '../notification/useNotificationStore';
import { useState } from 'react';
import AuthPopup from '../elements/Auth/AuthPopup';

export default function VocabTag({
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
  const { fetchFunc: fetchVocabAccess } = useFetchFunc(
    '/vocabulary/access/user',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

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
    const response = await fetchVocabAccess({ query: `id=${id}` });
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
    <>
      <button
        key={id}
        className='flex flex-col px-3 py-1 bg-gray-300 border border-gray-400 duration-300 hover:shadow hover:shadow-blue-500 hover:duration-300'
        onClick={openVocabulary}>
        <div className='flex w-full justify-between'>
          <div className='flex content-start'>{name}</div>
          <LockItem
            accessID={accessID}
            size={5}
          />
        </div>
        <div
          id='sub'
          className='flex w-full justify-between text-gray-600'>
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
