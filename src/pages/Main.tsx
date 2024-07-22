import { useNotificationStore } from '@/components/notification/useNotificationStore';
import { useEffect } from 'react';

export default function HomePage() {
  const { clearNotifications } = useNotificationStore();

  useEffect(() => {
    return () => {
      clearNotifications();
    };
  }, []);

  return <></>;
}
