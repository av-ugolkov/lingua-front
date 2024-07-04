import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import {
  RequestMethod,
  useFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export default function Header() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const { funcFetch: fetchUser } = useFetchWithToken(
    '/user/id',
    RequestMethod.GET
  );

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    async function asyncFetchUser() {
      const response = await fetchUser({});
      if (response.ok) {
        setIsAuth(true);
        setAccountName(response.data['name']);
      } else {
        setIsAuth(false);
        setAccountName('');
      }
      setLoading(false);
    }

    asyncFetchUser();
  }, [authStore.accessToken]);

  if (loading) {
    return <div></div>;
  }

  return (
    <header className='flex justify-between align-text-center bg-white shadow shadow-blue-300 min-w-max px-3 py-1 sticky top-0 z-50'>
      <div
        className='flex items-center'
        onClick={() => {
          navigate('/');
        }}>
        <img
          className='mr-2 w-8 h-8'
          src='/logo-grey.png'
          alt='logo'
        />
        <h1 className='text-3xl font-bold text-gray-600 cursor-default select-none'>
          Lingua Evo
        </h1>
      </div>
      <div className='flex content-center'>
        <HeaderBtn
          name='About'
          url='/about'
        />
        <HeaderBtn
          name='Contact'
          url='/contact'
        />
        <Account
          isAuth={isAuth}
          accountName={accountName}
        />
      </div>
    </header>
  );
}
