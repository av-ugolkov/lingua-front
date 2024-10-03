import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import api, { AuthStore } from '@/scripts/api';
import { isActiveToken } from '@/scripts/AuthToken';

export default function Header() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchFunc: fetchGetUser } = api.get('/user/id', AuthStore.USE);

  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    async function asyncGetUser() {
      const response = await fetchGetUser();
      if (response.ok) {
        setIsAuth(true);
        setAccountName(response.data['name']);
      } else if (response.status === 401) {
        setIsAuth(false);
        setAccountName('');
      }
      setIsLoading(false);
    }

    if (isActiveToken()) {
      asyncGetUser();
    } else {
      setIsAuth(false);
      setAccountName('');
      setIsLoading(false);
    }
  }, [fetchGetUser]);

  if (isLoading) {
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
