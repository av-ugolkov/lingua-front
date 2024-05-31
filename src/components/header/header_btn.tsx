import React from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderBtn({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const router = useRouter();

  return (
    <button
      className='mx-1 hover:shadow-sm hover:duration-200 hover:shadow-blue-400 duration-1000 text-gray-600 font-bold py-1 px-3'
      onClick={() => router.push(url)}>
      {name}
    </button>
  );
}
