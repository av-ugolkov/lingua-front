import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import Avatar from '@/components/elements/Avatar';
import Button from '@/components/elements/Button';
import ShortCard from '@/components/elements/Vocabulary/ShortCard';
import useFetch from '@/hooks/useFetch';
import { useNotificationStore } from '@/components/notification/useNotificationStore';
import { getUserID, isActiveToken } from '@/scripts/AuthToken';
import { IUser } from './List';
import api, { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import { VocabularyData } from '@/models/Vocabulary';
import { useAppDispatch } from '@/hooks/redux';
import { setVocabs } from '@/redux/vocabularies/slice';

export default function Card(user: IUser) {
  const uid = getUserID();
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [userVocabs, setUserVocabs] = useState<VocabularyData[]>([]);
  const { notificationSuccess, notificationError } = useNotificationStore();
  const dispatch = useAppDispatch();

  const queryVocabUser = useMemo<IQueryType>(
    () => [['user_id', user.id]],
    [user.id]
  );
  const { isLoading: isLoadingUser, response: responseUser } = useFetch(
    '/vocabularies/user',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    { query: queryVocabUser }
  );

  async function fetchSubscribe(subUserID: string) {
    return api.post('/user/subscribe', AuthStore.USE, {
      body: JSON.stringify({ id: subUserID }),
    });
  }
  async function fetchUnsubscribe(subUserID: string) {
    return api.post('/user/unsubscribe', AuthStore.USE, {
      body: JSON.stringify({ id: subUserID }),
    });
  }

  function userSubscribe(subUserID: string) {
    async function asyncSubscribe() {
      const response = await fetchSubscribe(subUserID);
      if (response.ok) {
        notificationSuccess(`You subscribed to ${user.name}`);
      } else {
        notificationError(response.data);
      }
    }
    asyncSubscribe();
  }

  function userUnsubscribe(subUserID: string) {
    async function asyncUnsubscribe() {
      const response = await fetchUnsubscribe(subUserID);
      if (response.ok) {
        notificationSuccess(`You unsubscribed from ${user.name}`);
      } else {
        notificationError(response.data);
      }
    }
    asyncUnsubscribe();
  }

  function subscribeBtn(uid: string, userID: string, isSubscribe: boolean) {
    if (isSubscribe) {
      return (
        <Button
          bgColor={clsx(
            uid === '' || uid === userID ? 'bg-gray-400' : 'bg-violet-600'
          )}
          hoverBgColor={clsx(
            uid === '' || uid === userID
              ? 'hover:bg-gray-400'
              : 'hover:bg-violet-500'
          )}
          focusOutlineColor={clsx(
            uid === '' || uid === userID
              ? 'focus-visible:outline-gray-600'
              : 'focus-visible:outline-violet-600'
          )}
          callback={() => {
            userUnsubscribe(userID);
          }}
          disabled={uid === '' || uid === userID}>
          Unsubscribe
        </Button>
      );
    }
    return (
      <Button
        bgColor={clsx(
          uid === '' || uid === userID ? 'bg-gray-400' : 'bg-indigo-600'
        )}
        hoverBgColor={clsx(
          uid === '' || uid === userID
            ? 'hover:bg-gray-400'
            : 'hover:bg-indigo-500'
        )}
        focusOutlineColor={clsx(
          uid === '' || uid === userID
            ? 'focus-visible:outline-gray-600'
            : 'focus-visible:outline-indigo-600'
        )}
        callback={() => {
          userSubscribe(userID);
        }}
        disabled={uid === '' || uid === userID}>
        Subscribe
      </Button>
    );
  }

  useEffect(() => {
    if (responseUser.ok) {
      const vocabs: VocabularyData[] = [];
      responseUser.data.forEach((item: any) => {
        vocabs.push({
          id: item['id'],
          name: item['name'],
          accessID: item['access_id'],
          nativeLang: item['native_lang'],
          translateLang: item['translate_lang'],
          tags: item['tags'] || [],
          description: item['description'] || '',
          wordsCount: item['words_count'],
          isNotification: item['notification'],
        });
      });
      setUserVocabs(vocabs);
      dispatch(setVocabs(vocabs));
    }
  }, [responseUser, dispatch]);

  useEffect(() => {
    async function asyncCheck() {
      const response = await api.get('/subscriber/check', AuthStore.USE, {
        query: [['subscriber_id', user.id]],
      });
      if (response.ok) {
        setIsSubscribe(response.data['is_subscriber']);
      }
    }
    if (isActiveToken()) {
      asyncCheck();
    }
  }, [user.id]);

  if (isLoadingUser) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-row min-w-fit w-full h-fit p-5 bg-blue-100 shadow-md shadow-blue-300'>
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
          <div>{subscribeBtn(uid, user.id, isSubscribe)}</div>
        </div>
        <div className='flex-1 pl-5'>
          <ul className='flex flex-col gap-y-3'>
            {userVocabs.map((vocab) => (
              <ShortCard
                key={vocab.id}
                id={vocab.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
