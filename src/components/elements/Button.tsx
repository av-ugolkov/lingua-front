import React from 'react';
import clsx from 'clsx';

export default function Button({
  bgColor,
  hoverBgColor,
  focusOutlineColor,
  callback,
  disabled,
  children,
}: {
  bgColor: string;
  hoverBgColor: string;
  focusOutlineColor: string;
  callback: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
      <button
          type='button'
          onClick={callback}
          disabled={disabled}
          className={clsx(
              bgColor,
              hoverBgColor,
              focusOutlineColor,
              `flex w-full h-full justify-center items-center px-3 py-1.5 text-sm text-nowrap font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
          )}>
        {children}
      </button>
  );
}