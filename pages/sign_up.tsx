import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

import logo from '/assets/icons/logo-grey.png';
import SignBtn from '../components/sign/sign_btn';

const isSendCode: boolean = false;

export default function SignIn() {
  const router = useRouter();

  function sendCode() {}

  function signUp() {}

  return (
    <div className='flex min-w-80 min-h-full justify-center px-6 py-12 lg:px-80 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-10'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image
            className='mx-auto h-44 w-44 object-scale-down'
            src={logo}
            alt='Lingua Evo'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
            Sign up to create a new account
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
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <SignBtn
                name='Send code'
                color='indigo'
                callback={sendCode}
              />
            </div>
            {!isSendCode ? (
              <div className='space-y-6'>
                <div>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium leading-6 text-gray-900'>
                      Password
                    </label>
                  </div>
                  <div className='mt-2'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div>
                  <SignBtn
                    name='Sign up'
                    color='indigo'
                    callback={signUp}
                  />
                </div>
              </div>
            ) : null}
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
