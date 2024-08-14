import { AccessID } from '@/models/Access';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function LockItem({
  accessID,
  size,
}: {
  accessID: AccessID;
  size?: number;
}) {
  const s = size ? `size-${size}` : `size-4`;

  return (
    <>
      {accessID === AccessID.Private ? (
        <LockClosedIcon
          className={clsx(s, 'text-red-500')}
          title='Private'
        />
      ) : accessID === AccessID.Subscribers ? (
        <LockOpenIcon
          className={clsx(s, 'text-yellow-500')}
          title='For subscribers'
        />
      ) : (
        accessID === AccessID.Public && (
          <LockOpenIcon
            className={clsx(s, 'text-green-500')}
            title='Public'
          />
        )
      )}
    </>
  );
}
