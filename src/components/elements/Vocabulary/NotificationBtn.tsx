import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

import { getUserID, isActiveToken } from '@/scripts/AuthToken.ts';
import api, { AuthStore } from '@/scripts/api';

export default function NotificationBtn({
  id,
  notif,
}: {
  id: string;
  notif: boolean;
}) {
  const [isNotif, setNotif] = useState(notif);

  function setNotificationVocab() {
    async function asyncSetNotificationVocab() {
      const resp = await api.post('/notifications/vocabulary', AuthStore.USE, {
        query: [
          ['user_id', getUserID()],
          ['vocab_id', id],
        ],
      });
      if (resp.ok) {
        setNotif(resp.data['notification']);
      }
    }

    asyncSetNotificationVocab();
  }

  if (!isActiveToken()) {
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
      {isNotif ? (
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
