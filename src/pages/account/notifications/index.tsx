import useFetch from '@/hooks/useFetch.ts';
import { AuthStore, RequestMethod } from '@/scripts/api.ts';
import { useEffect, useState } from 'react';
import Event from './component/Event';
import { IEventData, setEvents } from '@/redux/event/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

export default function Notifications() {
  const dispatch = useAppDispatch();
  const [hideViewEvents, setHideViewEvents] = useState(
    localStorage.getItem('hideViewEvents') === 'true' ? true : false
  );
  const { events } = useAppSelector((state) => state.events);
  const { response: respEvents } = useFetch(
    '/events',
    RequestMethod.GET,
    AuthStore.USE
  );

  useEffect(() => {
    if (respEvents.ok) {
      const events: IEventData[] = [];
      respEvents.data.map((e: any) => {
        events.push({
          ID: e['id'],
          User: {
            ID: e['user']['id'] || '',
            Name: e['user']['name'],
            LastVisitedAt: e['user']['last_visit_at'],
            Role: e['user']['role'],
          },
          Type: e['type'],
          Payload: new Map<string, any>(Object.entries(e['payload'])),
          CreatedAt: e['created_at'],
          Watched: e['watched'],
        });
      });
      dispatch(setEvents(events));
    }
  }, [dispatch, respEvents]);

  return (
    <>
      <div className='flex justify-between my-5'>
        <label
          htmlFor='events_watched'
          className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            id='events_watched'
            className='peer sr-only'
            checked={hideViewEvents}
            onChange={(e) => {
              setHideViewEvents(e.target.checked);
              localStorage.setItem(
                'hideViewEvents',
                e.target.checked.toString()
              );
            }}
          />
          <div className="h-6 w-11 bg-indigo-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:bg-indigo-600 after:shadow after:transition-all after:content-[''] hover:bg-indigo-300 peer-checked:bg-indigo-400 peer-checked:after:translate-x-full peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"></div>
          <div className='ml-3'>Hide viewed events</div>
        </label>
      </div>
      <div className='flex flex-col my-5 gap-y-5'>
        {events.map((e: IEventData) => {
          if (hideViewEvents && e.Watched) {
            return null;
          }
          return (
            <Event
              key={e.ID}
              id={e.ID}
            />
          );
        })}
      </div>
    </>
  );
}
