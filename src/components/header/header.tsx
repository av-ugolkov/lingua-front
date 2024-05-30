'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import HeaderBtn from './header_btn';

import Avatar from './avatar';
import refreshToken from '@/scripts/middleware/auth';
import asyncRequire from '@/scripts/asyncRequire';

export default function Header() {
  const router = useRouter();
  const [accountName, setAccountName] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    refreshToken(
      abortController.signal,
      (token) => {
        asyncRequire('/user/id', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
          signal: abortController.signal,
        })
          .then(async (response) => {
            let data = await response.json();
            if (response.ok) {
              setIsAuth(true);
              setAccountName(data.name);
            } else {
              console.error(data);
              // notification.value.ErrorNotification(data);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      },
      () => {
        setIsAuth(false);
        setAccountName('');
        router.push('/');
      }
    );

    return () => {
      abortController.abort();
    };
  }, [router]);

  return (
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
        {isAuth ? (
          <div className='flex items-center'>
            <HeaderBtn
              name='My vocabularies'
              url='/vocabularies'
            />
            <Avatar
              name={accountName}
              callback={() => {}}
            />
          </div>
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
