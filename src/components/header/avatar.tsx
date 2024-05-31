import React from 'react';

export default function Avatar({
  name,
  callback,
}: {
  name: string;
  callback: () => void;
}) {
  return (
    <div
      onClick={callback}
      className='inline-block cursor-pointer text-center content-center bg-gray-300 h-8 w-8 ml-1 mr-2 rounded-full hover:shadow-md hover:duration-200 hover:shadow-blue-400 duration-1000'>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
