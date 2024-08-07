import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function LockItem({
  accessID,
  size,
}: {
  accessID: number;
  size?: number;
}) {
  const s = size ? `size-${size}` : `size-4`;

  return (
    <>
      {accessID === 0 ? (
        <LockClosedIcon
          className={clsx(s, 'text-red-500')}
          title='Private'
        />
      ) : accessID === 1 ? (
        <LockOpenIcon
          className={clsx(s, 'text-yellow-500')}
          title='For subscribers'
        />
      ) : (
        accessID === 2 && (
          <LockOpenIcon
            className={clsx(s, 'text-green-500')}
            title='Public'
          />
        )
      )}
    </>
  );
}
