import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import HeaderBtn from './header_btn';

import logo from '/assets/icons/logo-grey.png';
import Avatar from './avatar';

const isAuth: boolean = false;

export default function Header() {
  const router = useRouter();

  return (
    <header className='flex justify-between align-text-center bg-white shadow shadow-blue-300 min-w-max p-1'>
      <div
        className='flex items-center'
        onClick={() => {
          console.log('clicked');
          router.push('/');
        }}>
        <Image
          className='ml-1 mr-2'
          src={logo}
          width={32}
          height={32}
          alt='logo'
          unoptimized
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
              name='admin'
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
