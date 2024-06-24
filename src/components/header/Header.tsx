import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './HeaderBtn';
import Account from './Account';
import { fetchData, IResponseData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';

export default function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    refreshToken(
      abortController.signal,
      (token) => {
        const abortController = new AbortController();
        fetchData('/user/id', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
          signal: abortController.signal,
        })
          .then((resp: IResponseData) => {
            setIsAuth(true);
            setAccountName(resp.data.name);
          })
          .catch((error: Error) => {
            console.error(error);
            navigate('/');
          });
      },
      () => {
        setIsAuth(false);
        setAccountName('');
        navigate('/');
      }
    );

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
