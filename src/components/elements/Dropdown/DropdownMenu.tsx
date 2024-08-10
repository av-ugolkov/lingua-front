import { useState } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import Transition from '../Transition';
import clsx from 'clsx';

export default function DropdownMenu({
  title,
  baseSize,
  children,
}: {
  title?: string;
  baseSize: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx('relative inline-block z-[3]', baseSize)}
      title={title}>
      <button
        className='flex w-full h-full items-center font-semibold text-black'
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        onClick={() => setOpen(!open)}>
        <EllipsisVerticalIcon className='size-7' />
      </button>

      <Transition
        show={open}
        duration={300}>
        <div className='absolute right-1 w-fit origin-top-right bg-gray-300 shadow-md shadow-blue-300'>
          {children}
        </div>
      </Transition>
    </div>
  );
}
