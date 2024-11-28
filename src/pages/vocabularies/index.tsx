import { useEffect, useState } from 'react';

import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import List from '@/pages/vocabularies/component/List';
import ListBox, { IListBoxItem } from '@/components/elements/ListBox';
import { SortWordTypes } from '@/models/Sorted';
import { LanguageIcon } from '@heroicons/react/24/outline';
import ArrowBothSide from '@/assets/ArrowBothSide';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { getLangs } from '@/redux/languages/slice';

export default function Vocabularies() {
  const languages = useSelector((state: RootState) => getLangs(state));
  const [listLangs, setListLangs] = useState([{ lang: 'Any', code: 'any' }]);
  const [nativeLang, setNativeLang] = useState('any');
  const [translateLang, setTranslateLang] = useState('any');

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

  function mapToLanguages(): IListBoxItem[] {
    const items: IListBoxItem[] = [];
    listLangs.forEach((item) => {
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
                  listLangs.find((tp) => tp.lang === value) || listLangs[0];
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
    </>
  );
}
