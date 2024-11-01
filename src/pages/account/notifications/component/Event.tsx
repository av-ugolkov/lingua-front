import Avatar from '@/components/elements/Avatar';
import { useAppSelector } from '@/hooks/redux';
import { getEvent, IEventData } from '@/redux/event/slice';

export default function Event({ id }: { id: string }) {
  const event = useAppSelector((state) => getEvent(state, id));

  return (
    <div className='flex flex-row min-w-fit w-full h-fit p-5 bg-blue-100 shadow-md shadow-blue-300'>
      <div className='flex flex-col justify-between pr-5 border-r border-black'>
        <div>
          <Avatar
            name={event.User.Name}
            className='size-16 text-4xl'
          />
          <div className='mt-5'>
            <div className='flex justify-between mb-3'>
              <span className='font-bold'>Last visit:</span>
              <span>
                {new Date(event.User.LastVisitedAt).toLocaleDateString('uk')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full h-fit'>{createMsg(event)}</div>
    </div>
  );
}

function createMsg(event: IEventData): JSX.Element {
  switch (event.Type) {
    case 'vocab_created':
    case 'vocab_deleted':
    case 'vocab_updated':
      return <div></div>;
    case 'vocab_word_created':
      return (
        <div>
          New word <b>{event.Payload.get('dict_word')}</b> was <b>added</b> in
          the vocabulary <b>{event.Payload.get('vocab_title')}</b>. You can
          watch it.
        </div>
      );
    case 'vocab_word_deleted':
      return (
        <div>
          The word <b>{event.Payload.get('dict_word')}</b> was <b>deleted</b>{' '}
          from the vocabulary <b>{event.Payload.get('vocab_title')}</b>.
        </div>
      );
    case 'vocab_word_updated':
      return (
        <div>
          The word <b>{event.Payload.get('dict_word')}</b> was <b>updated</b> in
          the vocabulary <b>{event.Payload.get('vocab_title')}</b>. You can
          watch it.
        </div>
      );
    default:
      return <div></div>;
  }
}
