import React, { useState } from 'react';
import {
  TrashIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

import Transition from './transition';

export default function DropdownButton() {
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
          <MenuButtonItem disable={true}>
            Share
            <ShareIcon className='size-5' />
          </MenuButtonItem>
          <MenuButtonItem disable={true}>
            Copy <DocumentDuplicateIcon className='size-5 ' />
          </MenuButtonItem>
          <MenuButtonItem>
            Delete
            <TrashIcon className='size-5' />
          </MenuButtonItem>
        </div>
      </Transition>
    </div>
  );
}

function MenuButtonItem({
  disable,
  children,
}: {
  disable?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disable}
      onClick={() => console.log('clicked', children?.toString)}
      type='button'
      className={
        'inline-flex gap-x-1 disabled:hover:bg-gray-200 disabled:text-gray-400 bg-gray-200 text-gray-900 w-20 px-2 py-2 justify-end text-sm hover:duration-200 hover:bg-gray-100 duration-500'
      }>
      {children}
    </button>
  );
}
