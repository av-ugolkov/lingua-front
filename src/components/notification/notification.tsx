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
  useNotificationStore,
} from './useNotificationStore';
import clsx from 'clsx';
import { useEffect } from 'react';

export default function Notification({
  notification,
  timeout,
}: {
  notification: NotificationData;
  timeout: number;
}) {
  const { removeNotification } = useNotificationStore();

  useEffect(() => {
    setTimeout(() => {
      removeNotification(notification.id);
    }, timeout);
  }, []);

  return (
    <>
      <div
        className={clsx(
          'flex w-96 h-fit p-2 my-1 justify-between',
          color(notification.type)
        )}>
        <div className='flex items-center gap-x-1'>
          {icon(notification.type)}
          <div>{notification.msg}</div>
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
      return 'bg-blue-500';
    case NotificationType.Warning:
      return 'bg-yellow-500';
    case NotificationType.Success:
      return 'bg-green-500';
    default:
      return 'bg-red-500';
  }
};
