import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { ISortType, Order } from '@/models/Sorted';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setOrderType } from '@/redux/search_and_order/slice';

export default function SortedPanel({
  sortedTypes,
}: {
  sortedTypes: ISortType[];
}) {
  const { sort, order } = useAppSelector((state) => state.searchAndOrder);
  const dispatch = useAppDispatch();
  const [scaleX, setScaleX] = useState(-1);

  useEffect(() => {
    dispatch(setOrderType({ s: sortedTypes[0].type, o: Order.DESC }));
  }, [sortedTypes, dispatch]);

  return (
    <div className='flex h-full items-center'>
      <button
        className='w-6 h-6 hover:text-blue-400 hover:duration-300 duration-300'
        onClick={() => {
          if (scaleX === 1) {
            setScaleX(-1);
            dispatch(setOrderType({ s: sort, o: Order.DESC }));
          } else {
            setScaleX(1);
            dispatch(setOrderType({ s: sort, o: Order.ASC }));
          }
        }}>
        <ChartBarIcon
          className={clsx(
            'min-w-6 pr-0.5',
            scaleX === 1 ? 'scale-x-1' : 'scale-x-[-1]'
          )}
        />
      </button>
      <select
        id='sort_panel'
        className='bg-transparent outline-none'
        onChange={(e) => {
          const typeSort =
            sortedTypes.find((tp) => tp.type.toString() === e.target.value) ||
            sortedTypes[0];
          dispatch(setOrderType({ s: typeSort.type, o: order }));
        }}>
        {sortedTypes.map((tp) => (
          <option
            value={tp.type}
            key={tp.type}>
            {tp.name}
          </option>
        ))}
      </select>
    </div>
  );
}
