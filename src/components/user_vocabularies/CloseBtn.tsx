import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseBtn({
  closeCallback,
}: {
  closeCallback: () => void;
}) {
  return (
    <button
      type='button'
      className='bg-transparent text-sm text-black w-6 h-6 ms-auto hover:bg-gray-400 hover:text-white inline-flex justify-center items-center'
      onClick={closeCallback}>
      <XMarkIcon className='size-5' />
    </button>
  );
}
