import { XMarkIcon } from '@heroicons/react/24/outline';
import Tag from './Tag';

export default function Tags({
  id,
  tags,
  placeholder,
  disabled,
  onAddTag,
  onRemoveTag,
}: {
  id: string;
  tags: string[];
  placeholder: string;
  disabled?: boolean;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}) {
  return (
    <div className='flex flex-wrap w-full'>
      <div
        id={id}
        className='flex flex-row flex-wrap'>
        {tags.length === 0
          ? disabled && (
              <div className='text-gray-400'>
                <Tag
                  key='empty'
                  value='Empty'></Tag>
              </div>
            )
          : tags.map((tag, ind) => (
              <Tag
                key={ind}
                className='mr-2 mb-2'
                value={tag}>
                <XMarkIcon
                  className='min-w-5 w-5 h-5 ml-1 hover:shadow hover:shadow-blue-500'
                  onClick={() => onRemoveTag(tag)}
                />
              </Tag>
            ))}
      </div>
      {!disabled && (
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
      )}
    </div>
  );
}
