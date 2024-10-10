import { useEffect, useState } from 'react';

import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import List from '@/pages/vocabularies/component/List';
import ListBox, { IListBoxItem } from '@/components/elements/ListBox';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { SortWordTypes } from '@/models/Sorted';
import { LanguageIcon } from '@heroicons/react/24/outline';
import ArrowBothSide from '@/assets/ArrowBothSide';

export default function Vocabularies() {
  const { languages: languagesStore } = useLanguagesStore();
  const [languages, setLanguages] = useState([{ lang: 'Any', code: 'any' }]);
  const [nativeLang, setNativeLang] = useState('any');
  const [translateLang, setTranslateLang] = useState('any');

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

  function mapToLanguages(): IListBoxItem[] {
    const items: IListBoxItem[] = [];
    languages.forEach((item) => {
      items.push({ key: item.code, value: item.lang });
    });
    return items;
  }

  return (
    <>
      <div className='flex justify-between py-5'>
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
    </>
  );
}
