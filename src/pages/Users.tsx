import SearchInput from '@/components/elements/SearchInput';
import SortedPanel from '@/components/elements/SortedPanel';
import { AuthStore, RequestMethod, useFetch } from '@/hooks/fetch/useFetch';
import { Order, Sorted, SortUserTypes } from '@/models/Sorted';
import { useEffect, useState } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  countWords: number;
  createdAt: string;
  lastVisited: string;
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
            email: item['email'],
            role: item['role'],
            countWords: item['count_words'],
            createdAt: item['created_at'],
            lastVisited: item['last_visited'],
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
    <>
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
      {users.map((item) => (
        <div>{item.name}</div>
      ))}
    </>
  );
}
