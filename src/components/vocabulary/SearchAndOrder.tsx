import { ChartBarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const typesSort: string[] = [
  'Newest',
  'Oldest',
  'Update asc',
  'Update desc',
  'A to Z',
  'Z to A',
];

let typeSort = 'Newest';
let searchString = '';

function sortWords() {
  switch (typeSort) {
    case 'Newest':
      //   sortedStore.update(Sorted.Newest)
      break;
    case 'Oldest':
      //   sortedStore.update(Sorted.Oldest)
      break;
    case 'Update asc':
      //   sortedStore.update(Sorted.UpdateAsc)
      break;
    case 'Update desc':
      //   sortedStore.update(Sorted.UpdateDesc)
      break;
    case 'A to Z':
      //   sortedStore.update(Sorted.AtoZ)
      break;
    case 'Z to A':
      //   sortedStore.update(Sorted.ZtoA)
      break;
  }
}

function searchWord() {
  //   let inputEl = document.getElementById('search_panel');
  //   searchString = inputEl?.innerText || '';
  //   searchStore.update(searchString)
}

export default function SearchAndOrder() {
  return (
    <>
      <div className='flex justify-between max-h-7'>
        <div className='flex w-[30%] min-w-48 justify-between border-solid border-[1px] border-black rounded-xl'>
          {/* <span
            id='search_panel'
            className='flex p-0.5 border-none w-full outline-none whitespace-nowrap active:border-none empty:before:bg-gray-500' //input font_subword'
            role='textbox'
            onKeyUp={searchWord}
            contentEditable>
            {searchString}
          </span> */}
          <div className='ml-2'>
            <input
              type='text'
              className='flex p-0.5 bg-transparent border-none w-full outline-none whitespace-nowrap active:border-none empty:before:bg-gray-500'
              placeholder='Search'
            />
          </div>
          <MagnifyingGlassIcon
            onClick={searchWord}
            className='size-6 py-0.5 pr-2 pl-0.5'
          />
        </div>
        <div className='flex w-36 align-middle'>
          <ChartBarIcon className='size-5 pr-0.5' />
          <select
            v-model='typeSort'
            id='native_lang'
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
