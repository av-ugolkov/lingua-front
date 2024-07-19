import { useEffect, useState } from 'react';

import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { Vocab } from './List';
import RightPanel from './RightPanel';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { useFetch, RequestMethod, AuthStore } from '@/hooks/fetch/useFetch';
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../notification/useNotificationStore';

export default function Card({ vocab }: { vocab: Vocab }) {
  const { notificationWarning } = useNotificationStore();
  const navigate = useNavigate();
  const { languages, fetchLanguages } = useLanguagesStore();
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(true);
  const { funcFetch: fetchOpenVocabulary } = useFetch(
    '/vocabulary',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  const { funcFetch: fetchCopyVocabulary } = useFetch(
    '/vocabulary/copy',
    RequestMethod.POST,
    AuthStore.USE
  );

  const { funcFetch: fetchSubscribeToCreator } = useFetch(
    '/account/subscribe',
    RequestMethod.POST,
    AuthStore.USE
  );

  useEffect(() => {
    if (languages.size > 0) {
      setLoading(false);
    } else {
      fetchLanguages();
    }
  }, [languages]);

  if (loading) {
    return <div></div>;
  }

  async function CopyVocabulary() {
    const response = await fetchCopyVocabulary({
      body: JSON.stringify({ id: vocab.id }),
    });
    if (response.ok) {
      console.log(response.data);
    } else {
      console.warn(response);
    }
  }

  async function SubscribeToCreator() {
    const response = await fetchSubscribeToCreator({
      body: JSON.stringify({ user_id: vocab.userID }),
    });
    if (response.ok) {
      console.log(response.data);
    } else {
      console.warn(response);
    }
  }

  async function OpenVocabulary() {
    const response = await fetchOpenVocabulary({
      queries: new Map<string, string>([['id', vocab.id]]),
    });
    if (response.ok) {
      navigate(`/vocabulary/${response.data['id']}`);
    } else {
      notificationWarning(response.data);
    }
  }

  return (
    <div className='flex bg-gray-300 h-fit shadow shadow-blue-300'>
      <div className='flex w-0'>
        <div className='relative size-5 top-1 left-1'>
          {vocab.accessID === 0 ? (
            <LockClosedIcon
              className='size-5 text-red-500'
              title='Private'
            />
          ) : vocab.accessID === 1 ? (
            <LockOpenIcon
              className='size-5 text-yellow-500'
              title='For subscribers'
            />
          ) : (
            vocab.accessID === 2 && (
              <LockOpenIcon
                className='size-5 text-green-500'
                title='Public'
              />
            )
          )}
        </div>
      </div>
      <button
        className='flex flex-col w-full justify-around items-center mx-1'
        onClick={() => {
          OpenVocabulary();
        }}>
        <div className='flex w-full justify-center items-center my-2 gap-1'>
          <div>
            <span className='text-lg font-bold'>{vocab.name}</span>
          </div>
          <div>
            from{' '}
            <span className='text-lg font-bold'>
              {languages.get(vocab.nativeLang)}
            </span>
          </div>
          <div>
            to{' '}
            <span className='text-lg font-bold'>
              {languages.get(vocab.translateLang)}
            </span>
          </div>
          <div>
            with <span className='text-lg font-bold'>{vocab.wordsCount}</span>{' '}
            words
          </div>
        </div>
        <div className='flex w-full justify-center items-center'>
          <div>{vocab.description || 'No description'}</div>
        </div>
        <div className='flex bottom-12 w-full justify-start items-center mt-2'>
          <div className='text-sm text-gray-500'>
            Created by <span className='font-bold'>{vocab.userName}</span>
            {' at '}
            {vocab.updatedAt.toLocaleDateString('en-GB')}
          </div>
        </div>
      </button>
      <div className='content-center h-28'>
        <RightPanel
          onCopy={() => {
            if (authStore.isActiveToken()) {
              CopyVocabulary();
            } else {
              console.log('Please login first');
            }
          }}
          onSubscribe={() => {
            if (authStore.isActiveToken()) {
              SubscribeToCreator();
            } else {
              console.log('Please login first');
            }
          }}
        />
      </div>
    </div>
  );
}
