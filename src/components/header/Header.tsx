import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import api, { AuthStore } from '@/scripts/api';

export default function Header() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    async function asyncGetUser() {
      const response = await api.get('/user/id', AuthStore.USE);
      if (response.ok) {
        setIsAuth(true);
        setAccountName(response.data['nickname']);
      } else if (response.status === 401) {
        signOut();
      }
      setIsLoading(false);
    }

    function signOut() {
      setIsAuth(false);
      setAccountName('');
      setIsLoading(false);
    }

    asyncGetUser();
  }, []);

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
          name='Dictionaries'
          url='/dictionaries'
        />
        <HeaderBtn
          name='Vocabularies'
          url='/vocabularies'
        />
        <HeaderBtn
          name='Users'
          url='/users'
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
