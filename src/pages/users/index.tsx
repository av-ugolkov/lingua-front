import { useEffect } from 'react';

import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortUserTypes } from '@/models/Sorted';
import List from './component/List';
import { clearVocabs } from '@/redux/vocabularies/slice';
import { useAppDispatch } from '@/hooks/redux';
import Pagination from '@/components/elements/Pagination/Pagination';

export default function Users() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearVocabs());
    };
  }, [dispatch]);

  return (
    <>
      <div className='flex w-full justify-between py-5'>
        <SearchInput />
        <SortedPanel sortedTypes={SortUserTypes} />
      </div>
      <List />
      <Pagination />
    </>
  );
}
