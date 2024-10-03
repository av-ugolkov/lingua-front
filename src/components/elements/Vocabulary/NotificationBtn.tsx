import { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

import { getUserID, isActiveToken } from '@/scripts/AuthToken.ts';
import api, { AuthStore } from '@/scripts/api';

export default function NotificationBtn({ id }: { id: string }) {
  const [isAlarm, setAlarm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchFunc: getFetchFunc } = api.get(
    '/notifications/vocabulary',
    AuthStore.USE
  );
  const { fetchFunc: setFetchFunc } = api.post(
    '/notifications/vocabulary',
    AuthStore.USE
  );

  useEffect(() => {
    async function asyncGetNotification() {
      const respGetNotification = await getFetchFunc({
        query: `user_id=${getUserID()}&vocab_id=${id}`,
      });
      if (respGetNotification.ok) {
        setAlarm(respGetNotification.data['notification']);
      }
      setIsLoading(false);
    }
    if (isActiveToken()) {
      asyncGetNotification();
    } else {
      setIsLoading(false);
    }
  }, [getFetchFunc, id]);

  function setNotificationVocab() {
    async function asyncSetNotificationVocab() {
      const resp = await setFetchFunc({
        query: `user_id=${getUserID()}&vocab_id=${id}`,
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
