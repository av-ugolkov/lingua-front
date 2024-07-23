import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { fetchData } from '@/scripts/fetch/fetchData';
import Button from '@/components/elements/Button';
import { useAuthStore } from '@/hooks/stores/useAuthStore';
import AuthInput from '@/components/elements/Auth/AuthInput';

export default function SignIn() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
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
      authStore.setAccessToken(respData.data.access_token);
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
                className='block text-sm font-medium leading-6 text-black'>
                Email address / User name
              </label>
              <div className='mt-2'>
                <AuthInput
                  id='email'
                  value={username}
                  type='email'
                  autoComplete='email'
                  placeholder='Enter your email address / user name'
                  onChange={(value) => setUsername(value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-black'>
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
                <AuthInput
                  id='password'
                  value={password}
                  type='password'
                  autoComplete='current-password'
                  placeholder='Enter your password'
                  onChange={(value) => setPassword(value)}
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
