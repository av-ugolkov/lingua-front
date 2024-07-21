import { ChartBarIcon } from '@heroicons/react/24/outline';

import { useSortedWordsStore } from '@/hooks/stores/useSortedWordsStore';
import { useSearchWordStore } from '@/hooks/stores/useSearchWordStore';
import { SortTypes } from '@/models/Sorted';
import SearchInput from '../elements/SearchInput';

export default function SearchAndOrder() {
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();

  return (
    <>
      <div className='flex justify-between max-h-7'>
        <SearchInput
          searchValue={searchWordStore.searchWord}
          onChange={searchWordStore.setSearchWord}
          onClear={searchWordStore.clearSearchWord}
        />
        <div className='flex w-36 items-center'>
          <ChartBarIcon className='size-5 pr-0.5' />
          <select
            id='native_lang'
            className='bg-transparent outline-none'
            onChange={(e) => {
              const typeSort =
                SortTypes.find((tp) => tp.type.toString() === e.target.value) ||
                SortTypes[0];

              sortedWordsStore.setOrderType(typeSort.type);
            }}>
            {SortTypes.map((tp) => (
              <option
                value={tp.type}
                key={tp.type}>
                {tp.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
