import SearchInput from '@/components/elements/SearchInput';
import SortedPanel from '@/components/elements/SortedPanel';
import Card from '@/components/users/Card';
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
  const [sortedType, setSortedType] = useState(SortUserTypes[1].type);
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
      const response = await fetchUsers({});

      if (response.ok) {
        var users: IUser[] = [];
        response.data.forEach((item: any) => {
          users.push({
            id: item['id'],
            name: item['name'],
            role: item['role'],
            lastVisited: new Date(item['last_visited']),
          });
        });
        setUsers(users);
      } else {
        console.log(response.data);
      }
    }
    asyncFetchUsers();
  }, [searchValue]);

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
          <Card {...item} />
        ))}
      </div>
    </div>
  );
}
