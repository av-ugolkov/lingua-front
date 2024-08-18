import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/elements/Button';
import { AuthStore, RequestMethod, useFetchFunc } from '@/hooks/fetch/useFetch';
import { useNotificationStore } from '@/components/notification/useNotificationStore';
import { setAccessToken } from '@/scripts/AuthToken';

export default function ForgotPsw() {
  const { notificationError } = useNotificationStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const { fetchFunc: fetchRecoveryPsw } = useFetchFunc(
    '/auth/recovery_password',
    RequestMethod.POST,
    AuthStore.NO
  );

  function recoveryPsw() {
    async function asyncRecoveryPsw() {
      const response = await fetchRecoveryPsw({
        body: JSON.stringify({ email: email }),
      });
      if (response.ok) {
        setAccessToken(response.data['access_token']);
        navigate('/');
      } else {
        notificationError(response.data);
      }
    }

    asyncRecoveryPsw();
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
                className='block text-sm font-medium leading-6 text-black'>
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
                  className='block w-full border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={recoveryPsw}>
                Create new password
              </Button>
            </div>
            <div>
              <Button
                bgColor='bg-zinc-600'
                hoverBgColor='hover:bg-zinc-500'
                focusOutlineColor='focus-visible:outline-zinc-600'
                callback={() => navigate('/sign_in')}>
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
