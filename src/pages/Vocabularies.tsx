import { useState } from 'react';

import List from '@/components/vocabularies/list';
import Button from '@/components/elements/button';
import Create from '@/components/vocabularies/create';
import { useVocabulariesStore } from '@/stores/useVocabulariesStore';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();

  vocabulariesStore.fetchVocabularies();

  return (
    <>
      <div className='p-5'>
        <div className='flex justify-center items-center w-48 h-8 mb-5'>
          <Button
            bgColor='bg-indigo-600'
            hoverBgColor='hover:bg-indigo-500'
            focusOutlineColor='focus-visible:outline-indigo-600'
            callback={() => {
              setIsShowCreatePopup((prev) => !prev);
              console.log(isShowCreatePopup);
            }}>
            Create vocabularies
          </Button>
        </div>
        <List />
      </div>
      {isShowCreatePopup && (
        <Create closeCallback={() => setIsShowCreatePopup(false)} />
      )}
    </>
  );
}
