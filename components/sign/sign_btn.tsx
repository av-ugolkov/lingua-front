import React from 'react';

export default function SignBtn({
  name,
  bgColor,
  hoverBgColor,
  focusOutlineColor,
  callback,
}) {
  return (
    <button
      type='button'
      onClick={callback}
      className={`flex w-full justify-center rounded-md ${bgColor} px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:${hoverBgColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:${focusOutlineColor}`}>
      {name}
    </button>
  );
}
