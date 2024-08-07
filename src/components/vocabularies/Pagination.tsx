import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import getPaginationItems from './getPaginationItems';
import ListBox, { IListBoxItem } from '../elements/ListBox';
import { useEffect, useState } from 'react';

const countsItemsPerPage = [5, 10, 15, 20, 25];

export default function Pagination({
  currentPage,
  countItems,
  setPageNum,
  countItemsPerPage,
}: {
  currentPage: number;
  countItems: number;
  setPageNum: (value: number) => void;
  countItemsPerPage: (value: number) => void;
}) {
  const [itemsPerPage, setItemsPerPage] = useState(countsItemsPerPage[0]);
  const maxPage = Math.ceil(countItems / itemsPerPage);
  const pageNums = getPaginationItems(currentPage, maxPage, 7);

  useEffect(() => {
    countItemsPerPage(itemsPerPage);
  }, []);

  function mapToCountItemsPerPage(): IListBoxItem[] {
    let items: IListBoxItem[] = [];
    countsItemsPerPage.forEach((item) => {
      items.push({ key: item.toString(), value: item.toString() });
    });
    return items;
  }

  return (
    <div className='flex min-w-[540px] items-center justify-between border border-gray-300 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 items-center justify-between'>
        <p className='text-sm min-w-24 text-black mr-1'>
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
        <nav
          aria-label='Pagination'
          className='isolate inline-flex -space-x-px shadow-sm'>
          <div
            onClick={() => {
              if (currentPage > 1) setPageNum(currentPage - 1);
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
              onClick={() => setPageNum(pageNum)}
              aria-current='page'
              className={clsx(
                'relative z-10 inline-flex items-center px-4 py-2 text-sm cursor-default select-none font-semibold text-black hover:bg-gray-400 hover:text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                pageNum === currentPage && 'bg-indigo-600 text-white'
              )}>
              {!isNaN(pageNum) ? pageNum : '...'}
            </div>
          ))}
          <div
            onClick={() => {
              if (currentPage < maxPage) setPageNum(currentPage + 1);
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
              items={mapToCountItemsPerPage()}
              defaultIndexValue={0}
              onChange={(value) => {
                setPageNum(1);
                setItemsPerPage(+value);
                countItemsPerPage(+value);
              }}
              classSelect='block w-fit bg-transparent pl-2 border border-gray-300 text-black text-sm focus:ring-primary-500 focus:border-primary-500'
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
