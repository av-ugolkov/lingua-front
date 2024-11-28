import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@/pages/account/vocabularies/component/List';
import Button from '@/components/elements/Button';
import Create from '@/pages/account/vocabularies/component/Create';
import { VocabularyData } from '@/models/Vocabulary.ts';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import ListBox, { IListBoxItem } from '@/components/elements/ListBox';
import ArrowBothSide from '@/assets/ArrowBothSide';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { SortWordTypes } from '@/models/Sorted';
import api, { AuthStore } from '@/scripts/api';
import { RootState } from '@/redux/store/store';
import { addVocab } from '@/redux/vocabularies/slice';

export default function Vocabularies() {
  const [isShowCreatePopup, setIsShowCreatePopup] = useState(false);
  const languages = useSelector((state: RootState) => state.langStore.langs);
  const [listLangs, setListLangs] = useState([{ lang: 'Any', code: 'any' }]);
  const [nativeLang, setNativeLang] = useState('any');
  const [translateLang, setTranslateLang] = useState('any');
  const dispatch = useDispatch();

  useEffect(() => {
    if (languages.length > 0) {
      languages.forEach((lang) => {
        setListLangs((prev) => [...prev, lang]);
      });
    }

    return () => {
      setListLangs([{ lang: 'Any', code: 'any' }]);
    };
  }, [languages]);

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
      const response = await api.post(`/vocabulary`, AuthStore.USE, {
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
        dispatch(addVocab(newVocab));
        setIsShowCreatePopup(false);
      } else {
        console.error(response);
      }
    }

    asyncFetchCreateVocabulary();
  }

  function mapToLanguages(): IListBoxItem[] {
    const items: IListBoxItem[] = [];
    listLangs.forEach((item) => {
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
              indexValue={listLangs.findIndex(
                (lang) => lang.code === nativeLang
              )}
              onChange={(value) => {
                const lang =
                  listLangs.find((tp) => tp.lang === value) || listLangs[0];
                setNativeLang(lang.code);
              }}
              classSelect='block w-fit p-1 bg-transparent border border-black text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ArrowBothSide className='size-6 mx-1' />
            <ListBox
              id='translate_language'
              items={mapToLanguages()}
              indexValue={listLangs.findIndex(
                (lang) => lang.code === translateLang
              )}
              onChange={(value) => {
                const lang =
                  listLangs.find((tp) => tp.lang === value) || listLangs[0];
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
