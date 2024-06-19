import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import Transition from '../transition';

export default function DropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative inline-block w-7 h-10 my-1 z-[3]'>
      <button
        className='flex w-full h-full items-center font-semibold text-gray-900'
        onClick={() => {
          setOpen(!open);
        }}>
        <EllipsisVerticalIcon className='size-7' />
      </button>

      <Transition
        show={open}
        duration={500}>
        <div className='absolute right-1 w-fit origin-top-right bg-gray-200 shadow-md shadow-blue-300'>
          {children}
        </div>
      </Transition>
    </div>
  );
}