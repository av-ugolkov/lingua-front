import { useEffect, useState } from 'react';

import { useSearchStore } from '../elements/SearchPanel/useSearchStore';
import { useSortedStore } from '../elements/SortAndOrder/useSortedStore';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import Card from './Card';
import Pagination from '../vocabularies/Pagination';

export interface IUser {
  id: string;
  name: string;
  role: string;
  lastVisited: Date;
}

export default function List() {
  const [pageNum, setPageNum] = useState(1);
  const [countItemsPerPage, setCountItemsPerPage] = useState(5);
  const [countItems, setCountItems] = useState(0);
  const { searchValue } = useSearchStore();
  const { sort, order, setDefaultOrderType } = useSortedStore();
  const [users, setUsers] = useState<IUser[]>([]);

  const { response } = useFetch('/users', RequestMethod.GET, AuthStore.NO, {
    query: `page=${pageNum}&per_page=${countItemsPerPage}&order=${order}&sort=${sort}&search=${searchValue}`,
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
      setDefaultOrderType();
    };
  }, [response, setDefaultOrderType]);

  return (
    <>
      {users.map((item) => (
        <Card
          key={item.id}
          {...item}
        />
      ))}
      <Pagination
        currentPage={pageNum}
        countItems={countItems}
        setPageNum={setPageNum}
        countItemsPerPage={setCountItemsPerPage}
      />
    </>
  );
}
