import {
  DocumentDuplicateIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

export default function RightPanel({
  onCopy,
  onLike,
  onDislike,
}: {
  onCopy: () => void;
  onLike: () => void;
  onDislike: () => void;
}) {
  return (
    <div className='flex flex-col h-28 justify-between bg-gray-200 py-2'>
      <button className='w-6 h-6'>
        <DocumentDuplicateIcon
          className='w-6 h-6 text-blue-500 duration-300 hover:text-blue-700 hover:duration-300'
          onClick={onCopy}
        />
      </button>
      <button className='w-6 h-6'>
        <HandThumbUpIcon
          className='w-6 h-6 text-green-500 duration-300 hover:text-green-700 hover:duration-300'
          onClick={onLike}
        />
      </button>
      <button className='w-6 h-6'>
        <HandThumbDownIcon
          className='w-6 h-6 text-red-500 duration-300 hover:text-red-700 hover:duration-300'
          onClick={onDislike}
        />
      </button>
    </div>
  );
}
