import React from 'react';
import clsx from 'clsx';

function Button({
  bgColor,
  hoverBgColor,
  focusOutlineColor,
  callback,
  children,
}: {
  bgColor: string;
  hoverBgColor: string;
  focusOutlineColor: string;
  callback: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={callback}
      className={clsx(
        bgColor,
        hoverBgColor,
        focusOutlineColor,
        `flex w-full h-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
      )}>
      {children}
    </button>
  );
}

export default Button;
