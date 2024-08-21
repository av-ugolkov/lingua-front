import clsx from 'clsx';
import Notification from './notification';
import { useNotificationStore } from './useNotificationStore';
import { useEffect } from 'react';

export interface ContainerSettings {
  position: 'top' | 'bottom' | 'middle';
  side: 'left' | 'right' | 'center';
  timeout: number;
  max: number;
}

export default function NotificationContainer({
  position,
  side,
  timeout,
  max,
}: ContainerSettings) {
  const { notifications, setSettings } = useNotificationStore();

  useEffect(() => {
    setSettings({ max });
  }, [max, setSettings]);

  return (
    <div className='relative w-full h-full'>
      <div
        className={clsx(
          'fixed z-20 justify-end items-start p-2',
          setPosition(position),
          setSide(side)
        )}>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            timeout={timeout}
          />
        ))}
      </div>
    </div>
  );
}

const setPosition = (position: string) => {
  switch (position) {
    case 'top':
      return 'top-0';
    case 'bottom':
      return 'bottom-0';
    case 'middle':
      return 'top-1/2 -translate-y-1/2';
  }
};

const setSide = (side: string) => {
  switch (side) {
    case 'left':
      return 'left-0';
    case 'right':
      return 'right-0';
    case 'center':
      return 'left-1/2 -translate-x-1/2';
  }
};
