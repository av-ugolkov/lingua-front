import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export default function Header() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const { funcFetch: fetchUser } = useFetch(
    '/user/id',
    RequestMethod.GET,
    AuthStore.USE
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
    <header className='flex justify-between align-text-center bg-white shadow shadow-blue-300 min-w-max px-3 py-1'>
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
        <HeaderBtn
          name='Users'
          url='/users'
        />
        <HeaderBtn
          name='Vocabularies'
          url='/vocabularies'
        />
        {isAuth ? (
          <Account accountName={accountName} />
        ) : (
          <div className='flex'>
            <HeaderBtn
              name='Sign Up'
              url='/sign_up'
            />
            <HeaderBtn
              name='Sign In'
              url='/sign_in'
            />
          </div>
        )}
      </div>
    </header>
  );
}
