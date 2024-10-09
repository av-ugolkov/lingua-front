import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import getPaginationItems from './getPaginationItems';
import ListBox, { IListBoxItem } from '../ListBox';
import { usePaginationStore } from './usePaginationStore';

const countsItemsPerPage: IListBoxItem[] = [
  { key: '5', value: '5' },
  { key: '10', value: '10' },
  { key: '15', value: '15' },
  { key: '20', value: '20' },
  { key: '25', value: '25' },
];

export default function Pagination() {
  const { page, setPage, countItems, itemsPerPage, setItemsPerPage } =
    usePaginationStore();
  const maxPage = Math.ceil(countItems / itemsPerPage);
  const pageNums = getPaginationItems(page, maxPage, 7);

  if (countItems == 0) {
    return <div></div>;
  }

  return (
    <div className='flex min-w-[540px] items-center justify-between border border-gray-300 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 items-center justify-between'>
        <p className='text-sm min-w-24 text-black mr-1'>
          Showing{' '}
          <span className='font-medium'>{(page - 1) * itemsPerPage + 1}</span>{' '}
          to{' '}
          <span className='font-medium'>
            {Math.min(countItems, itemsPerPage * page)}
          </span>{' '}
          of <span className='font-medium'>{countItems}</span> results
        </p>
        <nav
          aria-label='Pagination'
          className='isolate inline-flex -space-x-px shadow-sm'>
          <div
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className='relative inline-flex items-center p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-400 hover:text-white focus:z-20 focus:outline-offset-0'>
            <span className='sr-only'>Previous</span>
            <ChevronLeftIcon
              aria-hidden='true'
              className='h-5 w-5'
            />
          </div>
          {pageNums.map((pageNum, ind) => (
            <div
              key={ind}
              onClick={() => setPage(pageNum)}
              aria-current='page'
              className={clsx(
                'relative z-10 inline-flex items-center px-4 py-2 text-sm cursor-default select-none font-semibold text-black hover:bg-gray-400 hover:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                pageNum === page && 'bg-indigo-600 text-white'
              )}>
              {!isNaN(pageNum) ? pageNum : '...'}
            </div>
          ))}
          <div
            onClick={() => {
              if (page < maxPage) setPage(page + 1);
            }}
            className='relative inline-flex items-center p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-400 hover:text-white focus:z-20 focus:outline-offset-0'>
            <span className='sr-only'>Next</span>
            <ChevronRightIcon
              aria-hidden='true'
              className='h-5 w-5'
            />
          </div>
          <div className='flex pl-5'>
            <ListBox
              id='count_items'
              items={countsItemsPerPage}
              indexValue={countsItemsPerPage.findIndex(
                (item) => item.value === `${itemsPerPage}`
              )}
              onChange={(value) => {
                setPage(1);
                setItemsPerPage(+value);
              }}
              classSelect='block w-fit bg-transparent pl-2 border border-gray-300 text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
          </div>
        </nav>
      </div>
    </div>
  );
}