'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import HeaderBtn from './header_btn';
import Account from './Account';
import { fetchData, IResponseData } from '@/scripts/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import LoadingEmpty from '../Loading/Empty';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    console.log('useEffect');
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
            console.log('useEffect_1');
            setIsAuth(true);
            setAccountName(resp.data.name);
            setIsLoading(false);
          })
          .catch((error: Error) => {
            console.log('useEffect_2');
            console.error(error);
            setIsLoading(false);
          });
      },
      () => {
        console.log('useEffect_3');
        setIsAuth(false);
        setIsLoading(false);
        setAccountName('');
        router.push('/');
      }
    );

    return () => {
      abortController.abort();
    };
  }, [router]);

  if (isLoading) {
    return <LoadingEmpty />;
  }

  return (
    <header className='flex justify-between align-text-center bg-white shadow shadow-blue-300 min-w-max px-3 py-1'>
      <div
        className='flex items-center'
        onClick={() => {
          console.log('clicked');
          router.push('/');
        }}>
        <Image
          className='mr-2 w-8 h-8'
          src='/logo-grey.png'
          width={32}
          height={32}
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
