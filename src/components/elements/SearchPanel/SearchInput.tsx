import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from './useSearchStore';

export default function SearchInput() {
  const searchStore = useSearchStore();

  return (
    <>
      <div className='flex w-[30%] min-w-48 justify-between items-center border-solid border-[1px] border-black'>
        <div className='w-full mx-1'>
          <input
            type='text'
            name='search'
            className='flex p-0.5 bg-transparent border-none w-full outline-none whitespace-nowrap active:border-none'
            placeholder='Search'
            value={searchStore.searchValue}
            onChange={(e) => searchStore.setSearchValue(e.target.value)}
          />
        </div>
        {searchStore.searchValue === '' ? (
          <MagnifyingGlassIcon className='size-6 py-0.5 mx-1 px-0.5' />
        ) : (
          <XMarkIcon
            onClick={() => searchStore.setSearchValue('')}
            className='size-6 py-0.5 mx-1 px-0.5'
          />
        )}
      </div>
    </>
  );
}
