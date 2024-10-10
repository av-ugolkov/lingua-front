import { useEffect, useMemo, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

import { getUserID, isActiveToken } from '@/scripts/AuthToken.ts';
import api, { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';

export default function NotificationBtn({ id }: { id: string }) {
  const [isAlarm, setAlarm] = useState(false);

  const queryGetNotification = useMemo<IQueryType>(
    () => [
      ['user_id', getUserID()],
      ['vocab_id', id],
    ],
    [id]
  );
  const { isLoading, response: respGetNotification } = useFetch(
    '/notifications/vocabulary',
    RequestMethod.GET,
    AuthStore.USE,
    {
      query: queryGetNotification,
    }
  );

  useEffect(() => {
    if (respGetNotification.ok) {
      setAlarm(respGetNotification.data['notification']);
    }
  }, [respGetNotification.data, respGetNotification.ok]);

  function setNotificationVocab() {
    async function asyncSetNotificationVocab() {
      const resp = await api.post('/notifications/vocabulary', AuthStore.USE, {
        query: [
          ['user_id', getUserID()],
          ['vocab_id', id],
        ],
      });
      if (resp.ok) {
        setAlarm(resp.data['notification']);
      }
    }

    asyncSetNotificationVocab();
  }

  if (isLoading) {
    return <></>;
  } else if (!isActiveToken()) {
    return (
      <div
        className='w-full text-gray-400'
        title='You need SingIn'>
        <BellIcon />
      </div>
    );
  }

  return (
    <div
      className='w-full duration-300 hover:scale-150 hover:duration-300'
      onClick={(event) => {
        setNotificationVocab();
        event.stopPropagation();
      }}>
      {isAlarm ? (
        <BellAlertIcon
          className='text-green-500'
          title='ON'
        />
      ) : (
        <BellIcon
          className='text-red-500'
          title='OFF'
        />
      )}
    </div>
  );
}
