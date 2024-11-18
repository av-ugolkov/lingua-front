import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/elements/Button';
import AuthInput from '@/components/elements/Auth/AuthInput';
import { setAccessToken } from '@/scripts/AuthToken';
import api, { AuthStore } from '@/scripts/api';
import { useAppDispatch } from '@/hooks/redux';
import { toastError } from '@/redux/toasts/slice';
import GoogleButton from '@/components/google/button';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    const respData = await api.post('/auth/sign_in', AuthStore.NO, {
      headers: { Authorization: `Basic ${btoa(username + ':' + password)}` },
    });
    if (respData.ok) {
      setAccessToken(respData.data.access_token);
      navigate('/');
    } else {
      dispatch(toastError(respData.err));
    }
  }

  return (
    <div className='flex min-w-80 min-h-full justify-center px-6 py-6 lg:px-8 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-5'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto w-32 h-32'
            src='/logo-grey.png'
            alt='logo'
          />
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
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
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-black'>
                Password
              </label>
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
              <div className='flex justify-end text-sm'>
                <Link
                  to='/forgot_password'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'>
                  Forgot password?
                </Link>
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
          <span className='flex items-center my-5'>
            <span className='h-px flex-1 bg-black'></span>
            <span className='shrink-0 px-6'>Or</span>
            <span className='h-px flex-1 bg-black'></span>
          </span>
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}
