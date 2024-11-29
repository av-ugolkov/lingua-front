import { useEffect, useState } from 'react';

import Avatar from '../elements/Avatar';
import Menu from './Menu';
import useFetch from '@/hooks/useFetch';
import { AuthStore, RequestMethod } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCount } from '@/redux/event/slice';

export default function Account({ accountName }: { accountName: string }) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { count: countEvents } = useAppSelector((state) => state.events);

  const { response: respCountEvents } = useFetch(
    '/events/count',
    RequestMethod.GET,
    AuthStore.USE
  );

  useEffect(() => {
    if (respCountEvents.ok) {
      dispatch(setCount(respCountEvents.data['count']));
    }
  }, [dispatch, respCountEvents]);

  return (
    <>
      <div className='flex items-center'>
        <Avatar
          nickname={accountName}
          className='size-8 ml-2'
          callback={() => setIsShowMenu(!isShowMenu)}
        />
        {countEvents > 0 && (
          <span className='relative flex h-3 w-3 top-3 right-8'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-indigo-500'></span>
          </span>
        )}
      </div>
      {isShowMenu && <Menu />}
    </>
  );
}
