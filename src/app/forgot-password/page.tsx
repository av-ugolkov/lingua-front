'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Button from '@/components/elements/button';
import asyncRequire from '@/scripts/asyncRequire';

export default function ForgotPsw() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  function recoveryPsw() {
    asyncRequire('/auth/recovery_password', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(async (response) => {
        let data = await response.json();
        if (response.ok) {
          localStorage.setItem('access_token', data.access_token);
          router.push('/');
        } else {
          console.error(data);
          //notification.value.ErrorNotification(data);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className='flex min-w-80 min-h-full justify-center px-6 py-12 lg:px-8 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-10'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image
            className='mx-auto w-auto'
            src='/logo-grey.png'
            width={128}
            height={128}
            alt='Logo'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            Recovery password
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            action='#'
            method='POST'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <Button
                name='Create new password'
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={recoveryPsw}
              />
            </div>
            <div>
              <Button
                name='Back'
                bgColor='bg-zinc-600'
                hoverBgColor='hover:bg-zinc-500'
                focusOutlineColor='focus-visible:outline-zinc-600'
                callback={() => router.push('/sign_in')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
