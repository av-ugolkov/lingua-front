import { useEffect, useState } from 'react';

import List from '@/pages/account/vocabularies/component/List';
import Button from '@/components/elements/Button';
import Create from '@/pages/account/vocabularies/component/Create';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import { VocabularyData } from '@/models/Vocabulary.ts';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import ListBox, { IListBoxItem } from '@/components/elements/ListBox';
import ArrowBothSide from '@/assets/ArrowBothSide';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { SortWordTypes } from '@/models/Sorted';
import api, { AuthStore } from '@/scripts/api';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const { languages: languagesStore } = useLanguagesStore();
  const [languages, setLanguages] = useState([{ lang: 'Any', code: 'any' }]);
  const [nativeLang, setNativeLang] = useState('any');
  const [translateLang, setTranslateLang] = useState('any');

  const vocabulariesStore = useVocabulariesStore();
  const { fetchFunc: fetchCreateVocabulary } = api.post(
    `/vocabulary`,
    AuthStore.USE
  );

  useEffect(() => {
    if (languagesStore.size > 0) {
      languagesStore.forEach((v, k) => {
        setLanguages((prev) => [
          ...prev,
          {
            lang: v,
            code: k,
          },
        ]);
      });
    }
  }, [languagesStore]);

  function createVocabulary(vocab: VocabularyData) {
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
        const newVocab: VocabularyData = {
          id: response.data['id'],
          name: vocab.name,
          accessID: vocab.accessID,
          nativeLang: vocab.nativeLang,
          translateLang: vocab.translateLang,
          description: vocab.description,
          tags: vocab.tags,
          userID: vocab.userID,
          words: [],
        };
        vocabulariesStore.addVocabulary(newVocab);
        setIsShowCreatePopup(false);
      } else {
        console.error(response);
      }
    }

    asyncFetchCreateVocabulary();
  }

  function mapToLanguages(): IListBoxItem[] {
    const items: IListBoxItem[] = [];
    languages.forEach((item) => {
      items.push({ key: item.code, value: item.lang });
    });
    return items;
  }

  return (
    <>
      <div className='flex justify-center items-center w-48 h-8 my-5'>
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
      <div className='flex justify-between pb-5'>
        <div className='flex justify-start'>
          <SearchInput />
          <div className='flex items-center ml-3'>
            <LanguageIcon className='size-6 mr-1' />
            <ListBox
              id='native_language'
              items={mapToLanguages()}
              indexValue={0}
              onChange={(value) => {
                const lang =
                  languages.find((tp) => tp.lang === value) || languages[0];
                setNativeLang(lang.code);
              }}
              classSelect='block w-fit p-1 bg-transparent border border-black text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ArrowBothSide className='size-6 mx-1' />
            <ListBox
              id='translate_language'
              items={mapToLanguages()}
              indexValue={0}
              onChange={(value) => {
                const lang =
                  languages.find((tp) => tp.lang === value) || languages[0];
                setTranslateLang(lang.code);
              }}
              classSelect='block w-fit p-1 bg-transparent border border-black text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
          </div>
        </div>
        <div className='flex justify-end items-center'>
          <SortedPanel sortedTypes={SortWordTypes} />
        </div>
      </div>
      <List
        nativeLang={nativeLang}
        translateLang={translateLang}
      />
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
