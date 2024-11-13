import { useEffect, useMemo, useState } from 'react';

import useFetch from '@/hooks/useFetch';
import Pagination from '@/components/elements/Pagination/Pagination';
import Card from './Card';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCountItems } from '@/redux/pagination/slice';

export interface IUser {
  id: string;
  nickname: string;
  role: string;
  lastVisited: Date;
}

export default function List() {
  const { page, itemsPerPage } = useAppSelector((state) => state.pagination);
  const { searchValue, sort, order } = useAppSelector(
    (state) => state.searchAndOrder
  );
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
          nickname: item['nickname'],
          role: item['role'],
          lastVisited: new Date(item['last_visited']),
        });
      });
      setUsers(users);
      dispatch(setCountItems(response.data['count_users']));
    }
    return () => {
      setUsers([]);
    };
  }, [response, dispatch]);

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
