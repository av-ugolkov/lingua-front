import { useSearchWordStore } from '@/stores/useSearchWordStore';
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const typesSort: string[] = [
  'Newest',
  'Oldest',
  'Update asc',
  'Update desc',
  'A to Z',
  'Z to A',
];

const typeSort = 'Newest';

function sortWords() {
  switch (typeSort) {
    case 'Newest':
      //   sortedStore.update(Sorted.Newest)
      break;
    // case 'Oldest':
    //   //   sortedStore.update(Sorted.Oldest)
    //   break;
    // case 'Update asc':
    //   //   sortedStore.update(Sorted.UpdateAsc)
    //   break;
    // case 'Update desc':
    //   //   sortedStore.update(Sorted.UpdateDesc)
    //   break;
    // case 'A to Z':
    //   //   sortedStore.update(Sorted.AtoZ)
    //   break;
    // case 'Z to A':
    //   //   sortedStore.update(Sorted.ZtoA)
    //   break;
  }
}

export default function SearchAndOrder() {
  const searchWordStore = useSearchWordStore();

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
            onChange={sortWords}>
            {typesSort.map((tp) => (
              <option
                value={tp}
                key={tp}>
                {tp}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
