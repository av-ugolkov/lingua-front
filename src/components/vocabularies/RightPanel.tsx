import {
  DocumentDuplicateIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

export default function RightPanel({
  onCopy,
  onSubscribe,
}: {
  onCopy: () => void;
  onSubscribe: () => void;
}) {
  return (
    <div className='flex flex-col h-28 justify-evenly bg-gray-200'>
      <button className='w-6 h-6'>
        <DocumentDuplicateIcon
          className='w-6 h-6 text-blue-500 duration-300 hover:text-blue-700 hover:duration-300'
          onClick={onCopy}
          title='Copy'
        />
      </button>
      <button className='w-6 h-6'>
        <UserPlusIcon
          className='w-6 h-6 text-green-500 duration-300 hover:text-green-700 hover:duration-300'
          onClick={onSubscribe}
          title='Subscribe'
        />
      </button>
    </div>
  );
}
