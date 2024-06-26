import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchData } from '@/scripts/fetchData';
import Button from '@/components/elements/button';
import { setLocalStorage } from '@/scripts/localStorage';

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    const respData = await fetchData('/auth/sign_in', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(username + ':' + password)}`,
      },
    });
    if (respData.ok) {
      setLocalStorage('access_token', respData.data.access_token);
      navigate('/');
    } else {
      console.error(respData);
    }
  }

  return (
    <div className='flex min-w-80 min-h-full justify-center px-6 py-12 lg:px-8 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-10'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto w-32 h-32'
            src='/logo-grey.png'
            alt='logo'
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
                Email address / User name
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
                  className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                  <Link
                    to='/forgot_password'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    Forgot password?
                  </Link>
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
                  className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={signIn}>
                Sign in
              </Button>
            </div>
            <div>
              <Button
                bgColor='bg-zinc-600'
                hoverBgColor='hover:bg-zinc-500'
                focusOutlineColor='focus-visible:outline-zinc-600'
                callback={() => navigate('/')}>
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
