import SearchInput from '@/components/elements/SearchInput';
import SortedPanel from '@/components/elements/SortedPanel';
import List from '@/components/vocabularies/List';
import ListBox, { IListBoxItem } from '@/components/elements/ListBox';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { Order, Sorted, SortWordTypes } from '@/models/Sorted';
import {
  ChevronDoubleRightIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function Vocabularies() {
  const { languages: languagesStore, fetchLanguages } = useLanguagesStore();
  const [languages, setLanguages] = useState([{ lang: 'Any', code: 'any' }]);
  const [searchValue, setSearchValue] = useState('');
  const [sortedType, setSortedType] = useState(SortWordTypes[1].type);
  const [orderType, setOrterType] = useState(Order.DESC);
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
    } else {
      fetchLanguages();
    }
  }, [languagesStore]);

  function mapToLanguages(): IListBoxItem[] {
    let items: IListBoxItem[] = [];
    languages.forEach((item) => {
      items.push({ key: item.code, value: item.lang });
    });
    return items;
  }

  return (
    <div className='grid p-4 min-w-[540px] w-full gap-5 grid-cols-1'>
      <div className='flex justify-between'>
        <div className='flex justify-start'>
          <SearchInput
            searchValue={searchValue}
            onChange={(value) => {
              setSearchValue(value);
            }}
          />
          <div className='flex items-center ml-3'>
            <LanguageIcon className='size-6 mr-1' />
            <ListBox
              id='native_language'
              items={mapToLanguages()}
              defaultIndexValue={0}
              onChange={(value) => {
                const lang =
                  languages.find((tp) => tp.lang === value) || languages[0];
                setNativeLang(lang.code);
              }}
              classSelect='block w-fit p-1 bg-transparent border border-black text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ChevronDoubleRightIcon className='size-6 mx-1' />
            <ListBox
              id='translate_language'
              items={mapToLanguages()}
              defaultIndexValue={0}
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
          <SortedPanel
            sortedType={sortedType}
            sortedTypes={SortWordTypes}
            order={orderType}
            setSorted={(value: Sorted, type: Order) => {
              setSortedType(value);
              setOrterType(type);
            }}
          />
        </div>
      </div>
      <List
        searchValue={searchValue}
        sortType={sortedType}
        orderType={orderType}
        nativeLang={nativeLang}
        translateLang={translateLang}
      />
    </div>
  );
}
