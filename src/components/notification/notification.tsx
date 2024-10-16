import { useEffect } from 'react';

import clsx from 'clsx';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  NotificationData,
  NotificationType,
  removeNotification,
} from '@/redux/notifications/slice';
import { useAppDispatch } from '@/hooks/redux';

export default function Notification({
  notification,
  timeout,
}: {
  notification: NotificationData;
  timeout: number;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, timeout);
  }, [notification.id, timeout, dispatch]);

  return (
    <>
      <div
        className={clsx(
          'flex flex-row w-fit h-fit p-2 my-1 justify-between',
          color(notification.type)
        )}>
        <div className='flex items-center gap-x-1'>
          {icon(notification.type)}
          <div className='w-[340px] text-wrap break-words overflow-clip'>
            {notification.msg}
          </div>
        </div>
        <button onClick={() => removeNotification(notification.id)}>
          <XMarkIcon className='w-5 h-5' />
        </button>
      </div>
    </>
  );
}

const icon = (type: string) => {
  switch (type) {
    case NotificationType.Info:
      return <InformationCircleIcon className='w-6 min-w-6 h-6' />;
    case NotificationType.Warning:
      return <ExclamationCircleIcon className='w-6 min-w-6 h-6' />;
    case NotificationType.Success:
      return <CheckCircleIcon className='w-6 min-w-6 h-6' />;
    default:
      return <XCircleIcon className='w-6 min-w-6 h-6' />;
  }
};

const color = (type: string) => {
  switch (type) {
    case NotificationType.Info:
      return 'bg-blue-500 opacity-90';
    case NotificationType.Warning:
      return 'bg-yellow-500 opacity-90';
    case NotificationType.Success:
      return 'bg-green-500 opacity-90';
    default:
      return 'bg-red-500 opacity-90';
  }
};
