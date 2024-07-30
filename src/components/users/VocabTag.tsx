import Tag from '../elements/Tags/Tag';

export default function VocabTag({ id, value }: { id: string; value: string }) {
  return (
    <button
      onClick={() => {
        console.log(id, value);
      }}>
      <Tag
        value={value}
        className='duration-300 hover:bg-gray-600 hover:text-white hover:duration-300'
      />
    </button>
  );
}
