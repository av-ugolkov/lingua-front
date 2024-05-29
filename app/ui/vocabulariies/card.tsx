import React, { useState } from 'react';
import Image from 'next/image';

import asyncRequire from '../../../scripts/asyncRequire';
import refreshToken from '../../../scripts/middleware/auth';

import edit from '/assets/icons/s48/edit-2.svg';
import chevronsRight from '/assets/icons/s48/chevrons-right.svg';
import deleteIcon from '/assets/icons/s48/delete.svg';

export default function Card({ id, name, nativeLang, translateLang }) {
  const [title, setTitle] = useState(name);

  return (
    <div className='bg-gray-500 w-80 h-96'>
      <div className='item-title'>
        <input
          className='title-edit'
          type='text'
          maxLength={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onFocus={() => setTitle(title)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setTitle(title);
            }
          }}
          onBlur={() => renameVocabulary(id, title)}
        />
        <Image
          src={edit}
          alt='edit'
        />
      </div>
      <div className='lang_code'>
        <label>{nativeLang}</label>
        <Image
          className='chevron'
          src={chevronsRight}
          alt='arrow'
        />
        <label>{translateLang}</label>
      </div>
      <div
        className='content'
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
      <div
        className='delete-vocabulary'
        onClick={() => {
          console.log('removeVocabulary');
        }}>
        <Image
          src={deleteIcon}
          alt='delete'
        />
      </div>
    </div>
  );
}

function renameVocabulary(id: string, vocabularyName: string) {
  const abortController = new AbortController();

  refreshToken(
    abortController.signal,
    (token) => {
      asyncRequire(
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
        .then(async (response) => {
          let data = await response.json();
          if (response.ok) {
            // notification.value.SuccessNotification('Success');
          } else {
            // notification.value.ErrorNotification(data);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
    () => {
      // setIsAuth(false);
      // setAccountName('');
      // router.push('/');
    }
  );
}
