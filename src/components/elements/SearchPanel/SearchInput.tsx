import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from './useSearchStore';
import { useEffect } from 'react';

export default function SearchInput() {
  const { searchValue, setSearchValue } = useSearchStore();

  useEffect(() => {
    return () => {
      setSearchValue('');
    };
  }, [setSearchValue]);

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
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {searchValue === '' ? (
          <MagnifyingGlassIcon className='size-6 py-0.5 mx-1 px-0.5' />
        ) : (
          <XMarkIcon
            onClick={() => setSearchValue('')}
            className='size-6 py-0.5 mx-1 px-0.5'
          />
        )}
      </div>
    </>
  );
}
