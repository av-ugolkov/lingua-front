import { useNavigate } from 'react-router-dom';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import Button from '../Button';
import CloseBtn from '@/components/vocabularies/CloseBtn';
import BgLock from '../BgLock';

export default function AuthPopup({ close }: { close: () => void }) {
  const navigate = useNavigate();

  return (
    <BgLock>
      <div className='relative w-80 bg-white shadow-md shadow-blue-300'>
        <div className='flex items-center justify-between pl-4 pr-2 py-1 border-b'>
          <h3 className='flex flex-row gap-x-2 items-center text-lg font-semibold text-black'>
            <ExclamationCircleIcon className='size-5 text-yellow-500' />
            Access closed
          </h3>
          <CloseBtn closeCallback={close} />
        </div>

        <form className='p-4'>
          <div className='grid gap-4 mb-4 grid-cols-2'>
            <div className='col-span-2'>
              <div className='flex text-center content-center mb-2 text-sm text-black font-medium'>
                You can sign in or sign up.
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-x-3'>
            <Button
              bgColor='bg-indigo-600'
              hoverBgColor='hover:bg-indigo-500'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={() => {
                navigate('/sign_up');
              }}>
              Sign Up
            </Button>
            <Button
              bgColor='bg-indigo-600'
              hoverBgColor='hover:bg-indigo-500'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={() => {
                navigate('/sign_in');
              }}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </BgLock>
  );
}
