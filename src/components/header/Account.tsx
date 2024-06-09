'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import HeaderBtn from './header_btn';
import Avatar from './avatar';
import refreshToken from '@/scripts/middleware/refreshToken';
import fetchData, { IResponseData } from '@/scripts/fetchData';

const abortController = new AbortController();
const getToken = refreshToken(abortController.signal);

export default function Account({
  isAuth,
  accountName,
}: {
  isAuth: boolean;
  accountName: string;
}) {
  return (
    <>
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
    </>
  );
}
