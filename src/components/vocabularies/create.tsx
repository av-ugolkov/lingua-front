import React from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Button from '../elements/button';

export default function Create({
  closeCallback,
}: {
  closeCallback: () => void;
}) {
  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between p-4 border-b rounded-t'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Create new vocabulary
              </h3>
              <button
                type='button'
                className='text-gray-900 bg-transparent hover:bg-gray-400 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                onClick={closeCallback}>
                <XMarkIcon className='size-5' />
              </button>
            </div>
            <form className='p-4'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Vocabulary name'
                    required={true}
                  />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='category'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Source language
                  </label>
                  <select
                    id='category'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'>
                    <option
                      disabled
                      defaultValue=''>
                      Translation language
                    </option>
                    <option value='TV'>TV/Monitors</option>
                    <option value='PC'>PC</option>
                    <option value='GA'>Gaming/Console</option>
                    <option value='PH'>Phones</option>
                  </select>
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='category'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Second
                  </label>
                  <select
                    id='category'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'>
                    <option
                      disabled
                      defaultValue=''>
                      Select language
                    </option>
                    <option value='TV'>TV/Monitors</option>
                    <option value='PC'>PC</option>
                    <option value='GA'>Gaming/Console</option>
                    <option value='PH'>Phones</option>
                  </select>
                </div>
              </div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={closeCallback}>
                <PlusIcon className='size-5 font-extrabold ' />
                Add new vocabulary
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
