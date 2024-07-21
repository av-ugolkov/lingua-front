import List from '@/components/main/List';
import { useNotificationStore } from '@/components/notification/useNotificationStore';
import { useEffect } from 'react';

export default function HomePage() {
  const { clearNotifications } = useNotificationStore();

  useEffect(() => {
    return () => {
      clearNotifications();
    };
  }, []);

  return (
    <>
      <div className='flex p-4'>
        <List />
      </div>
    </>
  );
}
