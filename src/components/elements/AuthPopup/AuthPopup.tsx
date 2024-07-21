import { useNavigate } from 'react-router-dom';

import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Button from '../Button';

export default function AuthPopup({ close }: { close: () => void }) {
  const navigate = useNavigate();

  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative w-80  bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between pl-4 py-1 border-b'>
              <h3 className='flex flex-row gap-x-2 items-center text-lg font-semibold text-gray-900'>
                <ExclamationCircleIcon className='size-5 text-yellow-500' />
                Access closed
              </h3>
              <button
                type='button'
                className='text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-600 text-sm w-6 h-6 mr-2 ms-auto inline-flex justify-center items-center'
                onClick={close}>
                <XMarkIcon className='size-5' />
              </button>
            </div>

            <form className='p-4'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <div className='flex text-center content-center mb-2 text-sm font-medium text-gray-900'>
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
        </div>
      </div>
    </div>
  );
}
