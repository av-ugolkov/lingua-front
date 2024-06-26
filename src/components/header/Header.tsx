import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import { getFetchDataWithToken } from '@/scripts/fetchData';

export default function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    async function asyncFetchData() {
      const respData = await getFetchDataWithToken(
        '/user/id',
        abortController.signal
      );
      if (respData.ok) {
        setIsAuth(true);
        setAccountName(respData.data.name);
      } else {
        console.error(respData);
        setIsAuth(false);
        setAccountName('');
        navigate('/');
      }
    }

    asyncFetchData();

    return () => {
      abortController.abort();
    };
  }, []);

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
