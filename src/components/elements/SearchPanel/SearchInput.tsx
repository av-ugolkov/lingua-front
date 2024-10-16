import { useEffect } from 'react';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSearchValue } from '@/redux/search_and_order/slice';

export default function SearchInput() {
  const { searchValue } = useAppSelector((state) => state.searchAndOrder);
  const disptach = useAppDispatch();

  useEffect(() => {
    return () => {
      disptach(setSearchValue(''));
    };
  }, [disptach]);

  return (
    <>
      <div className='flex w-[30%] min-w-48 justify-between items-center border-solid border-[1px] border-black'>
        <div className='w-full mx-1'>
          <input
            type='text'
            name='search'
            className='flex p-0.5 bg-transparent border-none w-full outline-none whitespace-nowrap active:border-none'
            placeholder='Search'
            value={searchValue}
            onChange={(e) => disptach(setSearchValue(e.target.value))}
          />
        </div>
        {searchValue === '' ? (
          <MagnifyingGlassIcon className='size-6 py-0.5 mx-1 px-0.5' />
        ) : (
          <XMarkIcon
            onClick={() => disptach(setSearchValue(''))}
            className='size-6 py-0.5 mx-1 px-0.5'
          />
        )}
      </div>
    </>
  );
}
