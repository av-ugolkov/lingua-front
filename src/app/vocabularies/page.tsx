'use client';
import React, { useState } from 'react';

import Header from '@/components/header/header';
import List from '@/components/vocabularies/list';
import Button from '@/components/elements/button';
import Create from '@/components/vocabularies/create';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);

  return (
    <div>
      <Header />
      <div className='flex justify-center items-center w-48 h-8'>
        <Button
          bgColor='bg-indigo-600'
          hoverBgColor='hover:bg-indigo-500'
          focusOutlineColor='focus-visible:outline-indigo-600'
          name='Create vocabularies'
          callback={() => {
            setIsShowCreatePopup((prev) => !prev);
            console.log(isShowCreatePopup);
          }}
        />
      </div>
      <List />
      {isShowCreatePopup && (
        <Create closeCallback={() => setIsShowCreatePopup(false)} />
      )}
    </div>
  );
}
