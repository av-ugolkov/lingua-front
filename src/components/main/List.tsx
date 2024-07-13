import { useEffect, useState } from 'react';

import { useAuthStore } from '@/hooks/stores/useAuthStore';
import { fetchData } from '@/scripts/fetch/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import Card from './Card';
import ListBox, { IListBoxItem } from './ListBox';
import { SortTypes } from '@/models/Sorted';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import SearchInput from '../elements/SearchInput';
import Pagination from './Pagination';
import { useFetchLanguages } from '@/hooks/fetch/useFetchLanguages';

export interface Vocab {
  id: string;
  name: string;
  description: string;
  userID: string;
  userName: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const vocabsEmpty: Vocab[] = [];
const countsItemsPerPage = [5, 10, 15, 20, 25];

export default function List() {
  const authStore = useAuthStore();
  const fetchLanguages = useFetchLanguages();
  const [languages, setLanguages] = useState([{ lang: 'Any', code: 'any' }]);

  const [searchValue, setSearchValue] = useState('');
  const [sortedType, setSortedType] = useState(SortTypes[0]);
  const [pageNum, setPageNum] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [nativeLang, setNativeLang] = useState('any');
  const [translateLang, setTranslateLang] = useState('any');
  const [countItemsPerPage, setCountItemsPerPage] = useState(
    countsItemsPerPage[0]
  );
  const [vocabs, setVocabs] = useState(vocabsEmpty);

  useEffect(() => {
    if (fetchLanguages.size > 0) {
      fetchLanguages.forEach((v, k) => {
        setLanguages((prev) => [
          ...prev,
          {
            lang: v,
            code: k,
          },
        ]);
      });
    }
  }, [fetchLanguages]);

  useEffect(() => {
    async function asyncFetchData() {
      if (!authStore.isActiveToken()) {
        const respToken = await refreshToken();
        if (respToken.ok) {
          authStore.setAccessToken(respToken.data);
        }
      }
      const token = authStore.getAccessToken();
      const response = await fetchData(
        '/vocabularies',
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
        new Map<string, any>([
          ['page', pageNum],
          ['per_page', countItemsPerPage],
          ['search', searchValue],
          ['order', sortedType.type],
          ['native_lang', nativeLang],
          ['translate_lang', translateLang],
        ])
      );

      if (response.ok) {
        response.data['vocabularies'].forEach((item: any) => {
          setVocabs((vocabs) => [
            ...vocabs,
            {
              id: item['id'],
              name: item['name'],
              userID: item['user_id'],
              userName: item['user_name'],
              accessID: item['access_id'],
              nativeLang: item['native_lang'],
              translateLang: item['translate_lang'],
              description: item['description'],
              tags: item['tags'],
              createdAt: new Date(item['created_at']),
              updatedAt: new Date(item['updated_at']),
            },
          ]);
        });
        setCountItems(response.data['total_count']);
      } else {
        console.error(response);
      }
    }

    asyncFetchData();

    return () => {
      setVocabs(vocabsEmpty);
      setCountItems(0);
    };
  }, [
    countItemsPerPage,
    searchValue,
    pageNum,
    sortedType,
    nativeLang,
    translateLang,
  ]);

  function mapToCountItemsPerPage(): IListBoxItem[] {
    let items: IListBoxItem[] = [];
    countsItemsPerPage.forEach((item) => {
      items.push({ key: item.toString(), value: item.toString() });
    });
    return items;
  }

  function mapToSortedType(): IListBoxItem[] {
    let items: IListBoxItem[] = [];
    SortTypes.forEach((item) => {
      items.push({ key: item.type.toString(), value: item.name });
    });
    return items;
  }

  function mapToLanguages(): IListBoxItem[] {
    let items: IListBoxItem[] = [];
    languages.forEach((item) => {
      items.push({ key: item.code, value: item.lang });
    });
    return items;
  }

  return (
    <>
      <div className='grid gap-5 grid-cols-1 min-w-full'>
        <div className='flex justify-between'>
          <div>
            <SearchInput
              searchValue={searchValue}
              onChange={(value) => {
                setSearchValue(value);
              }}
              onClear={() => {
                setSearchValue('');
              }}
            />
          </div>
          <div className='flex justify-end items-center'>
            <AdjustmentsHorizontalIcon className='size-5' />
            <ListBox
              id='native_language'
              items={mapToLanguages()}
              onChange={(value) => {
                const lang =
                  languages.find((tp) => tp.lang === value) || languages[0];
                setNativeLang(lang.code);
              }}
              classSelect='block w-fit p-1 ml-2 bg-transparent border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ListBox
              id='translate_language'
              items={mapToLanguages()}
              onChange={(value) => {
                const lang =
                  languages.find((tp) => tp.lang === value) || languages[0];
                setTranslateLang(lang.code);
              }}
              classSelect='block w-fit p-1 ml-2 bg-transparent border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ListBox
              id='type_sorted'
              items={mapToSortedType()}
              onChange={(value) => {
                const typeSort =
                  SortTypes.find((tp) => tp.name === value) || SortTypes[0];
                setSortedType(typeSort);
              }}
              classSelect='block w-fit p-1 ml-2 bg-transparent border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ListBox
              id='count_items'
              items={mapToCountItemsPerPage()}
              onChange={(value) => {
                setPageNum(1);
                setCountItemsPerPage(+value);
              }}
              classSelect='block w-fit p-1 ml-3 bg-transparent border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500'
            />
          </div>
        </div>
        {vocabs.map((item) => (
          <Card
            key={item.id}
            vocab={item}
          />
        ))}
        {vocabs.length !== 0 && (
          <Pagination
            currentPage={pageNum}
            countItems={countItems}
            itemsPerPage={countItemsPerPage}
            setPageNum={setPageNum}
            nextPage={setPageNum}
            previusPage={setPageNum}
          />
        )}
      </div>
    </>
  );
}
