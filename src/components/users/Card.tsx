import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Avatar from '../header/Avatar';
import Button from '../elements/Button';
import {
  AuthStore,
  RequestMethod,
  useFetch,
  useFetchFunc,
} from '@/hooks/fetch/useFetch';
import VocabTag from './VocabTag';
import { AccessID } from '@/models/Access';
import { useNotificationStore } from '../notification/useNotificationStore';
import { getUserID, isActiveToken } from '@/scripts/AuthToken';
import { IUser } from './List';

export interface IVocab {
  id: string;
  name: string;
  accessID: AccessID;
  nativeLang: string;
  translateLang: string;
  wordsCount: number;
}

export default function Card(user: IUser) {
  const uid = getUserID();
  const [vocabularies, setVocabularies] = useState<IVocab[]>([]);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const { notificationSuccess, notificationError } = useNotificationStore();
  const { isLoading: isLoadingUser, response: responseUser } = useFetch(
    '/vocabularies/user',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    { query: `user_id=${user.id}` }
  );
  const { fetchFunc: fetchCheck } = useFetchFunc(
    '/subscriber/check',
    RequestMethod.GET,
    AuthStore.USE
  );

  const { fetchFunc: fetchSubscribe } = useFetchFunc(
    '/user/subscribe',
    RequestMethod.POST,
    AuthStore.USE
  );
  const { fetchFunc: fetchUnsubscribe } = useFetchFunc(
    '/user/unsubscribe',
    RequestMethod.POST,
    AuthStore.USE
  );

  function userSubscribe(subUserID: string) {
    async function asyncSubscribe() {
      const response = await fetchSubscribe({
        body: JSON.stringify({ id: subUserID }),
      });
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
      const response = await fetchUnsubscribe({
        body: JSON.stringify({ id: subUserID }),
      });
      if (response.ok) {
        notificationSuccess(`You unsubscribed from ${user.name}`);
      } else {
        notificationError(response.data);
      }
    }
    asyncUnsubscribe();
  }

  useEffect(() => {
    if (responseUser.ok) {
      responseUser.data.forEach((item: any) => {
        setVocabularies((prev) => [
          ...prev,
          {
            id: item['id'],
            name: item['name'],
            accessID: item['access_id'],
            nativeLang: item['native_lang'],
            translateLang: item['translate_lang'],
            wordsCount: item['words_count'],
          },
        ]);
      });
    }

    return () => {
      setVocabularies([]);
    };
  }, [responseUser]);

  useEffect(() => {
    async function asyncCheck() {
      const response = await fetchCheck({
        query: `subscriber_id=${user.id}`,
      });
      if (response.ok) {
        setIsSubscribe(response.data['is_subscriber']);
      }
    }
    if (isActiveToken()) {
      asyncCheck();
    }
  }, [fetchCheck, user.id]);

  if (isLoadingUser) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-row h-fit p-5 bg-blue-100 shadow-md shadow-blue-300'>
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
          <div>
            <Button
              bgColor={clsx(
                uid === '' || uid === user.id
                  ? 'bg-gray-400'
                  : isSubscribe
                  ? 'bg-violet-600'
                  : 'bg-indigo-600'
              )}
              hoverBgColor={clsx(
                uid === '' || uid === user.id
                  ? 'hover:bg-gray-400'
                  : isSubscribe
                  ? 'hover:bg-violet-500'
                  : 'hover:bg-indigo-500'
              )}
              focusOutlineColor={clsx(
                uid === '' || uid === user.id
                  ? 'focus-visible:outline-gray-600'
                  : isSubscribe
                  ? 'focus-visible:outline-violet-600'
                  : 'focus-visible:outline-indigo-600'
              )}
              callback={() => {
                if (isSubscribe) {
                  userUnsubscribe(user.id);
                } else {
                  userSubscribe(user.id);
                }
              }}
              disabled={uid === '' || uid === user.id}>
              {isSubscribe ? 'Unsubscribe' : 'Subscribe'}
            </Button>
          </div>
        </div>
        <div className='flex-1 pl-5'>
          <ul className='flex flex-col gap-y-3'>
            {vocabularies.map((vocab) => (
              <VocabTag
                key={vocab.id}
                {...vocab}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
