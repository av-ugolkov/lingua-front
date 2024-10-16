import { useEffect } from 'react';
import clsx from 'clsx';

import Notification from './notification';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSettings } from '@/redux/notifications/slice';

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
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(setSettings({ max }));
  }, [max, dispatch]);

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
