import { useState } from 'react';

import List from '@/components/vocabularies/List';
import Button from '@/components/elements/Button';
import Create from '@/components/vocabularies/Create';
import {
  RequestMethod,
  useFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';
import {
  useVocabulariesStore,
  VocabularyState,
} from '@/hooks/stores/useVocabulariesStore';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();
  const { funcFetch: fetchCreateVocabulary } = useFetchWithToken(
    `/account/vocabulary`,
    RequestMethod.POST
  );

  function createVocabulary(vocab: VocabularyState) {
    async function asyncFetchCreateVocabulary() {
      const body = JSON.stringify({
        name: vocab.name,
        native_lang: vocab.nativeLang,
        translate_lang: vocab.translateLang,
        tags: [],
      });
      const response = await fetchCreateVocabulary({
        body: body,
      });
      if (response.ok) {
        const newVocab = {
          id: response.data['id'],
          name: response.data['name'],
          nativeLang: response.data['native_lang'],
          translateLang: response.data['translate_lang'],
          tags: response.data['tags'] || [],
          userId: response.data['user_id'],
        };
        vocabulariesStore.addVocabulary(newVocab);
        setIsShowCreatePopup(false);
      } else {
        console.error(response);
      }
    }

    asyncFetchCreateVocabulary();
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
            }}>
            Create vocabularies
          </Button>
        </div>
        <List />
      </div>
      {isShowCreatePopup && (
        <Create
          addCallback={(newVocab) => {
            createVocabulary(newVocab);
          }}
          closeCallback={() => setIsShowCreatePopup(false)}
        />
      )}
    </>
  );
}
