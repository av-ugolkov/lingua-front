import { Sorted, useSortedWordsStore } from '@/stores/useSortedWordsStore';
import { useSearchWordStore } from '@/stores/useSearchWordStore';
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface ISortType {
  name: string;
  type: Sorted;
}

const sortTypes: ISortType[] = [
  {
    name: 'Newest',
    type: Sorted.Newest,
  },
  {
    name: 'Oldest',
    type: Sorted.Oldest,
  },
  {
    name: 'Update asc',
    type: Sorted.UpdateAsc,
  },
  {
    name: 'Update desc',
    type: Sorted.UpdateDesc,
  },
  {
    name: 'A to Z',
    type: Sorted.AtoZ,
  },
  {
    name: 'Z to A',
    type: Sorted.ZtoA,
  },
];

export default function SearchAndOrder() {
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();

  return (
    <>
      <div className='flex justify-between max-h-7'>
        <div className='flex w-[30%] min-w-48 justify-between border-solid border-[1px] border-black'>
          <div className='ml-2'>
            <input
              type='text'
              className='flex p-0.5 bg-transparent border-none w-full outline-none whitespace-nowrap active:border-none empty:before:bg-gray-500'
              placeholder='Search'
              onChange={(e) => searchWordStore.setSearchWord(e.target.value)}
            />
          </div>
          {searchWordStore.searchWord === '' ? (
            <MagnifyingGlassIcon className='size-6 py-0.5 pr-2 pl-0.5' />
          ) : (
            <XMarkIcon
              onClick={() => searchWordStore.clearSearchWord()}
              className='size-6 py-0.5 pr-2 pl-0.5'
            />
          )}
        </div>
        <div className='flex w-36 items-center'>
          <ChartBarIcon className='size-5 pr-0.5' />
          <select
            id='native_lang'
            className='bg-transparent outline-none'
            onChange={(e) => {
              const typeSort =
                sortTypes.find((tp) => tp.type.toString() === e.target.value) ||
                sortTypes[0];

              sortedWordsStore.setOrderType(typeSort.type);
            }}>
            {sortTypes.map((tp) => (
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
