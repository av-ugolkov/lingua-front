import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortUserTypes } from '@/models/Sorted';
import List from '@/components/users/List';

export default function Users() {
  return (
    <>
      <div className='flex w-full justify-between py-5'>
        <SearchInput />
        <SortedPanel sortedTypes={SortUserTypes} />
      </div>
      <List />
    </>
  );
}
