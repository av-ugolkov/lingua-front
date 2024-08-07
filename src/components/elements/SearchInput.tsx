import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchInput({
  searchValue,
  onChange,
}: {
  searchValue: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <div className='flex w-[30%] min-w-48 justify-between items-center border-solid border-[1px] border-black'>
        <div className='ml-1'>
          <input
            type='text'
            name='search'
            className='flex p-0.5 bg-transparent border-none w-full outline-none whitespace-nowrap active:border-none'
            placeholder='Search'
            value={searchValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        {searchValue === '' ? (
          <MagnifyingGlassIcon className='size-6 py-0.5 mr-1 pl-0.5' />
        ) : (
          <XMarkIcon
            onClick={() => onChange('')}
            className='size-6 py-0.5 mr-1 pl-0.5'
          />
        )}
      </div>
    </>
  );
}
