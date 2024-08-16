import { ChartBarIcon } from '@heroicons/react/24/outline';

import { useSortedWordsStore } from '@/hooks/stores/useSortedWordsStore';
import { useSearchWordStore } from '@/hooks/stores/useSearchWordStore';
import { Order, SortWordTypes } from '@/models/Sorted';
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
        />
        <div className='flex w-fil items-center'>
          <ChartBarIcon className='size-5 pr-0.5' />
          <select
            id='native_lang'
            className='bg-transparent outline-none'
            onChange={(e) => {
              const typeSort =
                SortWordTypes.find(
                  (tp) => tp.type.toString() === e.target.value
                ) || SortWordTypes[0];

              sortedWordsStore.setOrderType(typeSort.type, Order.DESC);
            }}>
            {SortWordTypes.map((tp) => (
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
