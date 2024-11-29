import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/elements/Button';
import api, { AuthStore } from '@/scripts/api';
import AuthInput from '@/components/elements/Auth/AuthInput';
import GoogleButton from '@/components/google/button';
import { toastError } from '@/redux/toasts/slice';
import { useAppDispatch } from '@/hooks/redux';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSendCode, setIsSendCode] = useState(false);

  function signUp() {
    api
      .post('/auth/sign_up', AuthStore.NO, {
        body: JSON.stringify({
          email: email,
          username: email.substring(0, email.indexOf('@')),
          code: +code,
          password: password,
        }),
      })
      .then((resp) => {
        if (resp.ok) {
          navigate('/');
        } else {
          dispatch(toastError(resp.err));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function sendCode() {
    api
      .post('/auth/send_code', AuthStore.NO, {
        body: JSON.stringify({ email: email }),
      })
      .then(() => {
        setIsSendCode(true);
      })
      .catch((error) => {
        console.error(error);
        //notification.value.ErrorNotification(data);
      });
  }

  return (
    <div className='flex min-w-80 min-h-full justify-center px-6 py-6 lg:px-80 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-5'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto w-32 h-32'
            src='/logo-grey.png'
            alt='logo'
          />
          <h2 className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight'>
            Sign up to create a new account
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
                Email address
              </label>
              <AuthInput
                id='email'
                value={email}
                type='email'
                autoComplete='email'
                placeholder='Enter your email address'
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={sendCode}>
                Send code
              </Button>
            </div>
            {isSendCode ? (
              <div className='space-y-6'>
                <div className='space-y-1'>
                  <div>
                    <div className='flex items-center justify-between'>
                      <label
                        htmlFor='code'
                        className='block text-sm font-medium leading-6 text-black'>
                        Code
                      </label>
                    </div>
                    <AuthInput
                      id='code'
                      value={code}
                      type='integer'
                      placeholder='Code'
                      onChange={(value) => setCode(value)}
                    />
                  </div>
                  <div>
                    <div className='flex items-center justify-between'>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium leading-6 text-black'>
                        Password
                      </label>
                    </div>
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
                    callback={signUp}>
                    Sign up
                  </Button>
                </div>
              </div>
            ) : null}
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
