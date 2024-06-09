'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import HeaderBtn from './header_btn';
import Account from './Account';
import fetchData, { IResponseData } from '@/scripts/fetchData';
import refreshToken from '@/scripts/middleware/refreshToken';
import LoadingEmpty from '../Loading/Empty';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    refreshToken(abortController.signal)
      .then((token: string) => {
        if (token != '') {
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
            });
        } else {
          setIsAuth(false);
          setAccountName('');
          router.push('/');
        }
      })
      .catch((error: Error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [isLoading, isAuth, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<LoadingEmpty />}>
      <header className='flex justify-between align-text-center bg-white shadow shadow-blue-300 min-w-max p-1'>
        <div
          className='flex items-center'
          onClick={() => {
            console.log('clicked');
            router.push('/');
          }}>
          <Image
            className='ml-1 mr-2 w-8 h-8'
            src='/logo-grey.png'
            width={32}
            height={32}
            alt='logo'
          />
          <h1 className='text-3xl font-bold text-gray-600 cursor-default select-none'>
            Lingua
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
    </Suspense>
  );
}
