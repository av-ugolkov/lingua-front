import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/elements/Button';
import { fetchData } from '@/scripts/fetch/fetchData';

export default function SignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSendCode, setIsSendCode] = useState(false);

  function signUp() {
    fetchData('/user/sign_up', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: email.substring(0, email.indexOf('@')),
        code: code,
        password: password,
      }),
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        //notification.value.ErrorNotification(data);
      });
  }

  function sendCode() {
    fetchData('/auth/send_code', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
    <div className='flex min-w-80 min-h-full justify-center px-6 py-12 lg:px-80 text-gray-600'>
      <div className='w-[520px] justify-center shadow-lg shadow-blue-300 px-10 py-10'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto w-32 h-32'
            src='/logo-grey.png'
            alt='logo'
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
                className='block text-sm font-medium leading-6 text-black'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                    <input
                      id='code'
                      name='code'
                      type='integer'
                      onChange={(e) => setCode(e.target.value)}
                      required
                      className='block w-full rounded-md border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='block w-full rounded-md border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
        </div>
      </div>
    </div>
  );
}
