import React, { useState } from 'react';

import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

import fetchData from '@/scripts/fetchData';
import refreshToken from '@/scripts/middleware/refreshToken';
import DropdownButton from '../elements/dropdown-button';

export default function Card({
  id,
  name,
  nativeLang,
  translateLang,
}: {
  id: string;
  name: string;
  nativeLang: string;
  translateLang: string;
}) {
  const [title, setTitle] = useState(name);

  return (
    <div className='flex flex-col bg-gray-300 w-96 min-w-96 h-96 shadow-md shadow-blue-300 text-center'>
      <div className='flex align-middle justify-center'>
        <div className='inline-block w-full cursor-default bg-gray-300 h-10 text-center font-semibold content-center text-xl ml-7 my-1 border-b-2 border-black'>
          {title}
        </div>
        <DropdownButton />
      </div>

      <div className='flex justify-center items-center mt-1 gap-x-2'>
        <label>{nativeLang}</label>
        <ChevronDoubleRightIcon className={'flex size-5'} />
        <label>{translateLang}</label>
      </div>
      <div
        className='flex relative w-96 h-80'
        onClick={() => {
          console.log('open vocabulary');
        }}>
        {/* {words.map((word, key) => (
          <div
            className='item'
            key={key}>
            <div>{word}</div>
            <div className='font-weight-300'>{word.pronunciation}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

function renameVocabulary(id: string, vocabularyName: string) {
  const abortController = new AbortController();

  refreshToken(abortController.signal)
    .then((token) => {
      fetchData(
        '/account/vocabulary',
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ id: id }),
        },
        new Map<string, string>([['name', vocabularyName]])
      )
        .then((response) => {
          // notification.value.SuccessNotification('Success');
        })
        .catch((error) => {
          // notification.value.ErrorNotification(data);
          console.error(error.message);
        });
    })
    .catch((error) => {
      // setIsAuth(false);
      // setAccountName('');
      // router.push('/');
    });
}
