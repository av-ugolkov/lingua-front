import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import getPaginationItems from './getPaginationItems';

export default function Pagination({
  currentPage,
  countItems,
  itemsPerPage,
  setPageNum,
  nextPage,
  previusPage,
}: {
  currentPage: number;
  countItems: number;
  itemsPerPage: number;
  setPageNum: (value: number) => void;
  nextPage: (value: number) => void;
  previusPage: (value: number) => void;
}) {
  const maxPage = Math.ceil(countItems / itemsPerPage);

  const pageNums = getPaginationItems(currentPage, maxPage, 7);

  return (
    <div className='flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between lg:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50'>
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50'>
          Next
        </a>
      </div>
      <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-between'>
        <div>
          <p className='text-sm text-black'>
            Showing{' '}
            <span className='font-medium'>
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className='font-medium'>
              {Math.min(countItems, itemsPerPage * currentPage)}
            </span>{' '}
            of <span className='font-medium'>{countItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label='Pagination'
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
            <div
              onClick={() => {
                if (currentPage > 1) previusPage(currentPage - 1);
              }}
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon
                aria-hidden='true'
                className='h-5 w-5'
              />
            </div>
            {pageNums.map((pageNum, ind) => (
              <div
                key={ind}
                onClick={() => setPageNum(pageNum)}
                aria-current='page'
                className={clsx(
                  'relative z-10 inline-flex items-center px-4 py-2 text-sm cursor-default select-none font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                  pageNum === currentPage && 'bg-indigo-600 text-white'
                )}>
                {!isNaN(pageNum) ? pageNum : '...'}
              </div>
            ))}
            <div
              onClick={() => {
                if (currentPage < maxPage) nextPage(currentPage + 1);
              }}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon
                aria-hidden='true'
                className='h-5 w-5'
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
