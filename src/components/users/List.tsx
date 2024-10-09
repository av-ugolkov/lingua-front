import { useEffect, useState } from 'react';

import useFetch from '@/hooks/useFetch';
import { usePaginationStore } from '../elements/Pagination/usePaginationStore';
import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';
import Card from './Card';
import Pagination from '../elements/Pagination/Pagination';
import { AuthStore, RequestMethod } from '@/scripts/api';

export interface IUser {
  id: string;
  name: string;
  role: string;
  lastVisited: Date;
}

export default function List() {
  const { page, itemsPerPage, setCountItems } = usePaginationStore();
  const { searchValue } = useSearchStore();
  const { sort, order } = useSortedStore();
  const [users, setUsers] = useState<IUser[]>([]);

  const { response } = useFetch('/users', RequestMethod.GET, AuthStore.NO, {
    query: new Map([
      ['page', `${page}`],
      ['per_page', `${itemsPerPage}`],
      ['order', `${order}`],
      ['sort', `${sort}`],
      ['search', searchValue],
    ]),
  });

  useEffect(() => {
    if (response.ok) {
      const users: IUser[] = [];
      response.data['users'].forEach((item: any) => {
        users.push({
          id: item['id'],
          name: item['name'],
          role: item['role'],
          lastVisited: new Date(item['last_visited']),
        });
      });
      setUsers(users);
      setCountItems(response.data['count_users']);
    }

    return () => {
      setUsers([]);
    };
  }, [response, setCountItems]);

  return (
    <>
      <div className='grid w-full gap-y-5 grid-cols-1'>
        {users.map((item) => (
          <Card
            key={item.id}
            {...item}
          />
        ))}
        <Pagination />
      </div>
    </>
  );
}
