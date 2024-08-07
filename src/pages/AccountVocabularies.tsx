import { useState } from 'react';

import List from '@/components/user_vocabularies/List';
import Button from '@/components/elements/Button';
import Create from '@/components/user_vocabularies/Create';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import {
  useVocabulariesStore,
  VocabularyState,
} from '@/hooks/stores/useVocabulariesStore';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();
  const { funcFetch: fetchCreateVocabulary } = useFetch(
    `/account/vocabulary`,
    RequestMethod.POST,
    AuthStore.USE
  );

  function createVocabulary(vocab: VocabularyState) {
    async function asyncFetchCreateVocabulary() {
      const body = JSON.stringify({
        name: vocab.name,
        access_id: vocab.accessID,
        native_lang: vocab.nativeLang,
        translate_lang: vocab.translateLang,
        description: vocab.description,
        tags: [],
      });
      const response = await fetchCreateVocabulary({
        body: body,
      });
      if (response.ok) {
        const newVocab: VocabularyState = {
          id: response.data['id'],
          name: vocab.name,
          accessID: vocab.accessID,
          nativeLang: vocab.nativeLang,
          translateLang: vocab.translateLang,
          description: vocab.description,
          tags: vocab.tags,
          userID: vocab.userID,
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
