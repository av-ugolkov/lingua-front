import { useAppSelector } from '@/hooks/redux';
import { getEvent } from '@/redux/event/slice';

export default function Event({ id }: { id: string }) {
  const event = useAppSelector((state) => getEvent(state, id));

  console.log(event);

  return (
    <>
      <div className='flex w-full h-fit bg-white'>{event.ID}</div>
    </>
  );
}
