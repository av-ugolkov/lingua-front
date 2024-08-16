import { ISortType, Order, Sorted } from '@/models/Sorted';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';

export default function SortedPanel({
  sortedType,
  sortedTypes,
  order,
  setSorted,
}: {
  sortedType: Sorted;
  sortedTypes: ISortType[];
  order: Order;
  setSorted: (value: Sorted, type: Order) => void;
}) {
  const [scaleX, setScaleX] = useState(-1);

  return (
    <div className='flex h-full items-center'>
      <button
        className='w-6 h-6 hover:text-blue-400 hover:duration-300 duration-300'
        onClick={() => {
          if (scaleX === 1) {
            setScaleX(-1);
            setSorted(sortedType, Order.DESC);
          } else {
            setScaleX(1);
            setSorted(sortedType, Order.ASC);
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
        defaultValue={sortedType}
        onChange={(e) => {
          const typeSort =
            sortedTypes.find((tp) => tp.type.toString() === e.target.value) ||
            sortedTypes[0];
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
