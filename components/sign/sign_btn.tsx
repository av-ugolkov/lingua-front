import clsx from 'clsx';
import React from 'react';

export default function SignBtn({ name, color, callback }) {
  return (
    <button
      type='button'
      onClick={callback}
      className={`flex w-full justify-center rounded-md bg-${color}-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`}>
      {name}
    </button>
  );
}
