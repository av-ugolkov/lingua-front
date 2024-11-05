import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthPopup from '../Auth/AuthPopup';
import LockItem from '../LockItem';
import Tag from '../Tags/Tag';
import ArrowBothSide from '@/assets/ArrowBothSide';
import { AccessID, AccessStatus } from '@/models/Access';
import { getAccessToken } from '@/scripts/AuthToken';
import Menu from './Menu';
import api, { AuthStore } from '@/scripts/api';
import { getCreateDate, getVocab, getWords } from '@/redux/vocabularies/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getLang } from '@/redux/languages/slice';
import { toastWarning } from '@/redux/toasts/slice';

export default function FullCard({
  id,
  authStore,
}: {
  id: string;
  authStore: AuthStore;
}) {
  const navigate = useNavigate();
  const [isShowSignInUpPopup, setIsShowSignInUpPopup] = useState(false);
  const vocab = useAppSelector((state) => getVocab(state, id));
  const nativeLang = useAppSelector((state) =>
    getLang(state, vocab.nativeLang)
  );
  const translateLang = useAppSelector((state) =>
    getLang(state, vocab.translateLang)
  );
  const createdAt = useAppSelector((state) => getCreateDate(state, id));
  const words = useAppSelector((state) => getWords(state, id));
  const dispatch = useAppDispatch();

  function openVocabulary() {
    if (vocab.accessID !== AccessID.Public && getAccessToken() === '') {
      setIsShowSignInUpPopup(true);
      return;
    } else if (vocab.accessID === AccessID.Subscribers) {
      asyncVocabAccess();
    } else {
      navigate(`/vocabulary/${id}`);
    }
  }

  async function asyncVocabAccess() {
    const response = await api.get('/vocabulary/access/user', authStore, {
      query: [['id', id]],
    });
    if (response.ok) {
      const access = response.data['access'];
      switch (access) {
        case AccessStatus.Forbidden:
          dispatch(toastWarning('Forbidden'));
          break;
        case AccessStatus.Read:
        case AccessStatus.Edit:
          navigate(`/vocabulary/${id}`);
          break;
      }
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
            <h2 className='flex items-center mr-1 text-xl'>{vocab.name}</h2>
            <LockItem accessID={vocab.accessID} />
          </div>
        </div>
        <div className='flex w-full text-gray-500'>{vocab.description}</div>
        <div className='flex flex-wrap w-full gap-1 mt-2'>
          {words.map((word) => (
            <Tag
              key={word}
              value={word}
            />
          ))}
        </div>
        <div className='flex flex-col w-full border-t border-black mt-2 pt-2'>
          <div className='flex justify-between items-center text-gray-500'>
            <div className='flex'>
              <p className='m-0'>{nativeLang}</p>
              <ArrowBothSide className='w-5 mx-1' />
              <p className='m-0'>{translateLang}</p>
            </div>
            <p className='m-0'>
              {vocab.wordsCount} word
              {vocab.wordsCount != 1 && 's'}
            </p>
          </div>
          <div className='flex justify-between items-center text-gray-500'>
            <p className='m-0 font-bold'>{vocab.userName}</p>
            <p className='m-0'>{createdAt}</p>
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
