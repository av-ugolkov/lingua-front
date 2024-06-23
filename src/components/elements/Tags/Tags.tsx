export default function Tags({
  tags,
  placeholder,
  onAddTag,
}: {
  tags: string[];
  placeholder: string;
  onAddTag: (tag: string) => void;
}) {
  return (
    <div className='flex flex-wrap p-0 m-0 w-full'>
      <ul
        id='tags'
        className='flex flex-wrap list-none p-0 mt-2'>
        {tags.map((tag) => (
          <li className='mr-2 mb-2 rounded-xl bg-gray-300 px-2 py-1 text-sm font-semibold'>
            {tag}
          </li>
        ))}
      </ul>
      <input
        className='flex-1 h-8 min-w-12 border-solid border-1 border-black rounded-xl focus:border-none'
        type='text'
        id='input-tag'
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
