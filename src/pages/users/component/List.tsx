import { useEffect, useMemo, useState } from 'react';

import useFetch from '@/hooks/useFetch';
import { usePaginationStore } from '@/components/elements/Pagination/usePaginationStore';
import Pagination from '@/components/elements/Pagination/Pagination';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import Card from './Card';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import { clearVocabs } from '@/redux/vocabularies/slice';
import { useAppDispatch } from '@/hooks/redux';

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
  const dispatch = useAppDispatch();

  const query = useMemo<IQueryType>(
    () => [
      ['page', page],
      ['per_page', itemsPerPage],
      ['order', order],
      ['sort', sort],
      ['search', searchValue],
    ],
    [itemsPerPage, order, page, searchValue, sort]
  );
  const { response } = useFetch('/users', RequestMethod.GET, AuthStore.NO, {
    query: query,
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
      dispatch(clearVocabs());
    };
  }, [response, setCountItems, dispatch]);

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
