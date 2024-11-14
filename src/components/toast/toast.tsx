import { useEffect } from 'react';

import clsx from 'clsx';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ToastData, ToastType, removeToast } from '@/redux/toasts/slice';
import { useAppDispatch } from '@/hooks/redux';

export default function Notification({
  toastData,
  timeout,
}: {
  toastData: ToastData;
  timeout: number;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(toastData.id));
    }, timeout);
  }, [toastData.id, timeout, dispatch]);

  return (
    <>
      <div
        className={clsx(
          'flex flex-row w-fit h-fit p-2 my-1 justify-between',
          color(toastData.type)
        )}>
        <div className='flex items-center gap-x-1'>
          {icon(toastData.type)}
          <div className='w-[340px] text-wrap break-words overflow-clip'>
            {toastData.msg}
          </div>
        </div>
        <button onClick={() => dispatch(removeToast(toastData.id))}>
          <XMarkIcon className='w-5 h-5' />
        </button>
      </div>
    </>
  );
}

const icon = (type: string) => {
  switch (type) {
    case ToastType.Info:
      return <InformationCircleIcon className='w-6 min-w-6 h-6' />;
    case ToastType.Warning:
      return <ExclamationCircleIcon className='w-6 min-w-6 h-6' />;
    case ToastType.Success:
      return <CheckCircleIcon className='w-6 min-w-6 h-6' />;
    default:
      return <XCircleIcon className='w-6 min-w-6 h-6' />;
  }
};

const color = (type: string) => {
  switch (type) {
    case ToastType.Info:
      return 'bg-blue-500 opacity-90';
    case ToastType.Warning:
      return 'bg-yellow-500 opacity-90';
    case ToastType.Success:
      return 'bg-green-500 opacity-90';
    default:
      return 'bg-red-500 opacity-90';
  }
};
