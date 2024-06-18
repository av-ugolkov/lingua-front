import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderBtn from './header_btn';
import Account from './Account';
import { fetchData, IResponseData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import LoadingEmpty from '../Loading/Empty';

export default function Header({ failback }: { failback?: () => void }) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    refreshToken(
      abortController.signal,
      (token) => {
        const abortController = new AbortController();
        setIsLoading(true);
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
            failback?.();
          })
          .finally(() => {
            setIsLoading(false);
          });
      },
      () => {
        setIsAuth(false);
        setIsLoading(false);
        setAccountName('');
        failback?.();
      }
    );

    return () => {
      abortController.abort();
    };
  }, [failback]);

  if (isLoading) {
    return <LoadingEmpty />;
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
          src='/public/logo-grey.png'
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
