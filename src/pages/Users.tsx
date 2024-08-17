import { useEffect, useState } from 'react';

import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import Card from '@/components/users/Card';
import Pagination from '@/components/vocabularies/Pagination';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { SortUserTypes } from '@/models/Sorted';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';

export interface IUser {
  id: number;
  name: string;
  role: string;
  lastVisited: Date;
}

export default function Users() {
  const [pageNum, setPageNum] = useState(1);
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);
  const { searchValue } = useSearchStore();
  const { sort, order } = useSortedStore();
  const [users, setUsers] = useState<IUser[]>([]);

  const { isLoading, response } = useFetch(
    '/users',
    RequestMethod.GET,
    AuthStore.NO,
    {
      query: `page=${pageNum}&per_page=${countItemsPerPage}&order=${order}&sort=${sort}&search=${searchValue}`,
    }
  );

  useEffect(() => {
    if (response.ok) {
      response.data['users'].forEach((item: any) => {
        setUsers((users) => [
          ...users,
          {
            id: item['id'],
            name: item['name'],
            role: item['role'],
            lastVisited: new Date(item['last_visited']),
          },
        ]);
      });
      setCountItems(response.data['count_users']);
    }
  }, [response]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className='grid p-4 min-w-[540px] w-full gap-5 grid-cols-1'>
      <div className='flex justify-between'>
        <SearchInput />
        <SortedPanel sortedTypes={SortUserTypes} />
      </div>
      <div>
        {users.map((item) => (
          <Card
            key={item.id}
            {...item}
          />
        ))}
      </div>
      <Pagination
        currentPage={pageNum}
        countItems={countItems}
        setPageNum={setPageNum}
        countItemsPerPage={(value) => {
          setCountItemsPerPage(value);
        }}
      />
    </div>
  );
}
