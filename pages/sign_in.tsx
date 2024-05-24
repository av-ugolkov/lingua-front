import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import getBrowserSignature from '../scripts/get-browser-fingerprint';
import asyncRequire from '../scripts/asyncRequire';

import logo from '/assets/icons/logo-grey.png';
import SignBtn from '../components/sign/sign_btn';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function signIn() {
    asyncRequire('/auth/sign_in', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password),
        Fingerprint: getBrowserSignature(),
      },
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
            className='mx-auto h-44 w-auto'
            src={logo}
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            Sign in to your account
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'>
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <SignBtn
                name='Sign in'
                color='indigo'
                callback={signIn}
              />
            </div>
            <div>
              <SignBtn
                name='Back'
                color='zinc'
                callback={() => router.push('/')}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
