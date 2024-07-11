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

export interface Vocab {
  id: string;
  name: string;
  description: string;
  userID: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const vocabsEmpty: Vocab[] = [];

const countsItemsPerPage = [10, 15, 25, 50];

export default function List() {
  const authStore = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const [sortedType, setSortedType] = useState(SortTypes[0]);
  const [pageNum, setPageNum] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [countItemsPerPage, setCountItemsPerPage] = useState(
    countsItemsPerPage[0]
  );
  const [vocabs, setVocabs] = useState(vocabsEmpty);

  useEffect(() => {
    async function asyncFetchData() {
      if (!authStore.isActiveToken()) {
        const respToken = await refreshToken();
        if (respToken.ok) {
          authStore.setAccessToken(respToken.data);
        } else {
          return {
            ok: respToken.ok,
            status: respToken.status,
            data: respToken.data,
          };
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
        ])
      );

      if (response.ok) {
        response.data.forEach((item: any) =>
          setVocabs((vocabs) => [
            ...vocabs,
            {
              id: item['id'],
              name: item['name'],
              userID: item['user_id'],
              accessID: item['access_id'],
              nativeLang: item['native_lang'],
              translateLang: item['translate_lang'],
              description: item['description'],
              tags: item['tags'],
              createdAt: new Date(item['created_at']),
              updatedAt: new Date(item['updated_at']),
            },
          ])
        );
        setCountItems(vocabs.length);
      } else {
        console.error(response);
      }
    }

    asyncFetchData();

    return () => {
      setVocabs(vocabsEmpty);
    };
  }, [countItemsPerPage, searchValue, pageNum, sortedType]);

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
              id='type_sorted'
              items={mapToSortedType()}
              onChange={(value) => {
                const typeSort =
                  SortTypes.find((tp) => tp.type.toString() === value) ||
                  SortTypes[0];

                setSortedType(typeSort);
              }}
              classSelect='block w-fit p-1 ml-2 bg-transparent border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500'
            />
            <ListBox
              id='count_items'
              items={mapToCountItemsPerPage()}
              onChange={(value) => setCountItemsPerPage(value as any)}
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
        <Pagination
          currentPage={pageNum}
          countItems={countItems}
          itemsPerPage={countItemsPerPage}
          setPageNum={setPageNum}
          nextPage={setPageNum}
          previusPage={setPageNum}
        />
      </div>
    </>
  );
}
