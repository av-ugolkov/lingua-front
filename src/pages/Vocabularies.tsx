import { useEffect, useState } from 'react';

import List from '@/components/vocabularies/List';
import Button from '@/components/elements/Button';
import Create from '@/components/vocabularies/Create';
import { useVocabulariesStore } from '@/stores/useVocabulariesStore';
import { useGetFetchWithToken } from '@/hooks/fetch/useFetchWithToken';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();
  const { response, loading } = useGetFetchWithToken('/account/vocabularies');

  useEffect(() => {
    if (response.ok) {
      vocabulariesStore.setVocabularies(response.data);
    }
  }, []);

  if (loading) {
    return <div></div>;
  }

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
        <Create
          addCallback={() => setIsShowCreatePopup(false)}
          closeCallback={() => setIsShowCreatePopup(false)}
        />
      )}
    </>
  );
}
