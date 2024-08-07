import SearchInput from '@/components/elements/SearchInput';
import SortedPanel from '@/components/elements/SortedPanel';
import Card from '@/components/users/Card';
import Pagination from '@/components/vocabularies/Pagination';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { Order, Sorted, SortUserTypes } from '@/models/Sorted';
import { useEffect, useState } from 'react';

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
  const [sortedType, setSortedType] = useState(SortUserTypes[0].type);
  const [orderType, setOrterType] = useState(Order.DESC);
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const { funcFetch: fetchUsers } = useFetch(
    '/users',
    RequestMethod.GET,
    AuthStore.NO
  );

  useEffect(() => {
    async function asyncFetchUsers() {
      const response = await fetchUsers({
        queries: new Map<string, any>([
          ['page', pageNum],
          ['per_page', countItemsPerPage],
          ['search', searchValue],
          ['sort', sortedType],
          ['order', orderType],
        ]),
      });

      if (response.ok) {
        var users: IUser[] = [];
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
      } else {
        console.log(response.data);
      }
    }
    asyncFetchUsers();
  }, [pageNum, countItemsPerPage, orderType, sortedType, searchValue]);

  return (
    <div className='grid p-4 min-w-[540px] w-full gap-5 grid-cols-1'>
      <div className='flex justify-between'>
        <SearchInput
          searchValue={searchValue}
          onChange={setSearchValue}
        />
        <SortedPanel
          sortedType={sortedType}
          sortedTypes={SortUserTypes}
          order={orderType}
          setSorted={(value: Sorted, type: Order) => {
            setSortedType(value);
            setOrterType(type);
          }}
        />
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
