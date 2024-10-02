import { useNavigate } from 'react-router-dom';

import { useNotificationStore } from '../notification/useNotificationStore';
import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  Cog8ToothIcon,
  EnvelopeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { deleteAccessToken } from '@/scripts/AuthToken';
import api, { AuthStore } from '@/scripts/api';

export default function Menu() {
  const navigate = useNavigate();
  const { notificationWarning } = useNotificationStore();
  const { fetchFunc: signOut } = api.post('/auth/sign_out', AuthStore.USE);

  return (
    <div className='fixed top-12 right-2 w-48 h-fit bg-gray-300 shadow-lg shadow-blue-300 z-[5]'>
      <div className='flex flex-col'>
        {MenuButton(
          'My vocabularies',
          <BookOpenIcon className='w-5 h-5 ml-2' />,
          () => {
            navigate('/account/vocabularies');
          }
        )}
        {MenuButton(
          'Notifications',
          <EnvelopeIcon className='w-5 h-5 ml-2' />,
          () => {
            navigate('/account/notifications');
          }
        )}
        {MenuButton(
          'Subscribers',
          <UserGroupIcon className='w-5 h-5 ml-2' />,
          () => {
            navigate('/account/subscribers');
          }
        )}
        {MenuButton(
          'Settings',
          <Cog8ToothIcon className='w-5 h-5 ml-2' />,
          () => {
            navigate('/account/settings');
          }
        )}
        {MenuButton(
          'Sign Out',
          <ArrowLeftStartOnRectangleIcon className='w-5 h-5 ml-2' />,
          () => {
            async function asyncLogout() {
              const response = await signOut();
              if (response.ok) {
                deleteAccessToken();
                navigate('/');
                window.location.reload();
              } else {
                notificationWarning(response.data);
              }
            }

            asyncLogout();
          }
        )}
      </div>
    </div>
  );
}

function MenuButton(
  label: string,
  icon: JSX.Element,
  callback: () => void
): JSX.Element {
  return (
    <button
      className='flex w-full px-4 py-2 select-none justify-end duration-500 hover:bg-gray-400 hover:text-white hover:duration-300'
      onClick={callback}>
      {label}
      {icon}
    </button>
  );
}
