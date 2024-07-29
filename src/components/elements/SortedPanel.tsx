import { ISortType, Order, Sorted } from '@/models/Sorted';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

export default function SortedPanel({
  currentSortedType,
  sortedTypes,
  setSorted,
}: {
  currentSortedType: Sorted;
  sortedTypes: ISortType[];
  setSorted: (value: Sorted, type: Order) => void;
}) {
  const [typeSort, setTypeSort] = useState(currentSortedType);
  const [order, setOrder] = useState(Order.DESC);
  const [scaleX, setScaleX] = useState(1);

  return (
    <div className='flex w-full h-full items-center'>
      <button
        className='w-6 h-6 hover:text-blue-400 hover:duration-300 duration-300'
        onClick={() => {
          if (scaleX === 1) {
            setScaleX(-1);
          } else {
            setScaleX(1);
          }
          setOrder(scaleX === 1 ? Order.DESC : Order.ASC);
          setSorted(typeSort, order);
        }}>
        <ChartBarIcon
          className={clsx('min-w-6 pr-0.5', `scale-x-[${scaleX}]`)}
        />
      </button>
      <select
        id='sort_panel'
        className='bg-transparent outline-none'
        onChange={(e) => {
          const typeSort =
            sortedTypes.find((tp) => tp.type.toString() === e.target.value) ||
            sortedTypes[0];
          setTypeSort(typeSort.type);
          setSorted(typeSort.type, order);
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
