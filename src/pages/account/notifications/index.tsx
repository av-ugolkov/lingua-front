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
      respEvents.data['events'].map((e: any) => {
        events.push({
          ID: e['ID'],
          CreatedAt: e['CreatedAt'],
          UserID: e['UserID'],
          Msg: e['Payload'] || '',
          Watched: e['Watched'] || false,
        });
      });
      dispatch(setEvents(events));
    }
  }, [dispatch, respEvents]);

  return (
    <>
      <div className='flex flex-col gap-y-2'>
        {events.map((e: IEventData) => {
          console.log(e.ID);
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
