import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Tags({
  id,
  tags,
  placeholder,
  onAddTag,
  onRemoveTag,
}: {
  id: string;
  tags: string[];
  placeholder: string;
  onAddTag: (tag: string) => void;
  onRemoveTag: (ind: number) => void;
}) {
  return (
    <div className='flex flex-wrap w-full'>
      <div
        id={id}
        className='flex flex-row flex-wrap mb-2'>
        {tags.map((tag, ind) => (
          <span
            key={tag}
            className='flex h-auto items-center px-1 mb-2 mr-2 text-wrap bg-gray-200 shadow shadow-blue-300'>
            {tag}
            <XMarkIcon
              className='min-w-5 w-5 h-5 ml-1 hover:shadow hover:shadow-blue-400'
              onClick={() => onRemoveTag(ind)}
            />
          </span>
        ))}
      </div>
      <input
        className='inline-block w-72 h-6 px-2 border-none shadow shadow-blue-300 border-black outline-blue-300'
        type='text'
        name='tag'
        placeholder={placeholder}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            onAddTag(event.currentTarget.value);
            event.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
}
