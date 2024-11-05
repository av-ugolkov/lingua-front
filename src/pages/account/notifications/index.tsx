import useFetch from '@/hooks/useFetch.ts';
import { AuthStore, RequestMethod } from '@/scripts/api.ts';
import { useEffect } from 'react';
import Event from './component/Event';
import { IEventData, setEvents } from '@/redux/event/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

export default function Notifications() {
  const dispatch = useAppDispatch();
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
      <div className='flex flex-col mt-5 gap-y-5'>
        {events.map((e: IEventData) => {
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
