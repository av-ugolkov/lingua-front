import clsx from 'clsx';
import React from 'react';

export default function Avatar({
  name,
  className,
  callback,
}: {
  name: string;
  className?: string;
  callback: () => void;
}) {
  return (
    <div
      onClick={callback}
      className={clsx(
        className,
        'inline-block cursor-pointer text-center content-center bg-gray-300 h-8 w-8 rounded-full hover:shadow-md hover:duration-200 hover:shadow-blue-400 duration-1000'
      )}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
