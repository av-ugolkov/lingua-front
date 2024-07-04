import { useState } from 'react';
import Button from '../elements/Button';

export default function Rename({
  name,
  saveCallback,
  cancelCallback,
}: {
  name: string;
  saveCallback: (newName: string) => void;
  cancelCallback: () => void;
}) {
  const [newName, setNewName] = useState(name);

  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between p-4 border-b rounded-t'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Rename vocabulary
              </h3>
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
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex gap-x-4'>
                <Button
                  bgColor='bg-indigo-600'
                  hoverBgColor='hover:bg-indigo-500'
                  focusOutlineColor='focus-visible:outline-indigo-600'
                  callback={() => saveCallback(newName)}>
                  Save
                </Button>
                <Button
                  bgColor='bg-gray-600'
                  hoverBgColor='hover:bg-indigo-500'
                  focusOutlineColor='focus-visible:outline-indigo-600'
                  callback={cancelCallback}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
