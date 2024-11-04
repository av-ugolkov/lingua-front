import Avatar from '@/components/elements/Avatar';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  getEvent,
  IEventData,
  setCount,
  updateEvent,
} from '@/redux/event/slice';
import { toastError } from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

export default function Event({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const countEvents = useAppSelector((state) => state.events.count);
  const event = useAppSelector((state) => getEvent(state, id));

  function onWatch() {
    async function asyncOnWatch() {
      const resp = await api.post('/event/watched', AuthStore.USE, {
        query: [['event_id', event.ID]],
      });
      if (resp.ok) {
        dispatch(updateEvent({ ...event, Watched: true }));
        dispatch(setCount(countEvents - 1));
      } else {
        dispatch(toastError(resp.data));
      }
    }

    asyncOnWatch();
  }

  return (
    <div className='flex w-full p-5 bg-blue-100 shadow-md shadow-blue-300'>
      <div className='flex flex-col justify-between w-fit pr-5 border-r border-black'>
        <div className='flex justify-center pb-3'>
          <Avatar
            name={event.User.Name}
            className='size-16 text-4xl'
          />
        </div>
        <div className='flex justify-center'>{event.User.Name}</div>
      </div>
      <div className='relative w-full ml-3'>
        <div className='flex mr-6'>{createMsg(event)}</div>
        <div className='absolute top-0 right-0'>
          {event.Watched ? (
            <EnvelopeOpenIcon className='w-5 h-5' />
          ) : (
            <EnvelopeIcon
              className='w-5 h-5 text-indigo-600'
              onClick={onWatch}
            />
          )}
        </div>
        <div className='absolute bottom-0 right-0 text-gray-500'>
          {new Date(event.CreatedAt).toLocaleString('uk')}
        </div>
      </div>
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
          New word{' '}
          <b className='text-indigo-700'>{event.Payload.get('dict_word')}</b>{' '}
          was <b>added</b> in the vocabulary{' '}
          <b className='text-indigo-700'>{event.Payload.get('vocab_title')}</b>.
          You can watch it.
        </div>
      );
    case 'vocab_word_deleted':
      return (
        <div>
          The word{' '}
          <b className='text-indigo-700'>{event.Payload.get('dict_word')}</b>{' '}
          was <b>deleted</b> from the vocabulary{' '}
          <b className='text-indigo-700'>{event.Payload.get('vocab_title')}</b>.
        </div>
      );
    case 'vocab_word_updated':
      return (
        <div>
          The word{' '}
          <b className='text-indigo-700'>{event.Payload.get('dict_word')}</b>{' '}
          was <b>updated</b> in the vocabulary{' '}
          <b className='text-indigo-700'>{event.Payload.get('vocab_title')}</b>.
          You can watch it.
        </div>
      );
    case 'vocab_word_renamed':
      return (
        <div>
          The word{' '}
          <b className='text-indigo-700'>{event.Payload.get('dict_word')}</b>{' '}
          was <b>renamed</b> in the vocabulary{' '}
          <b className='text-indigo-700'>{event.Payload.get('vocab_title')}</b>.
          You can watch it.
        </div>
      );
    default:
      return <div></div>;
  }
}
