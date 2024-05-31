import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function DropdownButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative inline-block w-7 h-10 my-1 z-[3]'>
      <button
        className='flex w-full h-full justify-center align-middle font-semibold text-gray-900'
        onClick={() => {
          setOpen(!open);
        }}>
        <Image
          src='/s48/ellipsis-vertical.svg'
          alt='menu'
          width={28}
          height={28}
          aria-hidden='true'
        />
      </button>

      <div className={clsx(open ? 'visible' : 'hidden')}>
        <div className='absolute right-0 top-10 w-fit origin-top-right bg-gray-200 shadow-md shadow-blue-300'>
          <MenuButtonItem text='Share' />
          <MenuButtonItem text='Copy' />
          <MenuButtonItem text='Delete' />
        </div>
      </div>
    </div>
  );
}

function MenuButtonItem({ text }: { text: string }) {
  return (
    <button
      onClick={() => console.log('clicked', text)}
      type='button'
      className={
        'bg-gray-200 text-gray-900 block w-20 px-2 py-2 text-right text-sm hover:duration-200 hover:bg-gray-100 duration-500'
      }>
      {text}
    </button>
  );
}
