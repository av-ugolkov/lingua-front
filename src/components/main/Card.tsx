import { Vocab } from './List';

export default function Card({ vocab }: { vocab: Vocab }) {
  return (
    <div className='flex bg-gray-300 h-16 shadow shadow-blue-300'>
      <div className='flex w-full justify-around items-center mx-4'>
        <div>{vocab.name}</div>
        <div>{vocab.nativeLang}</div>
        <div>{vocab.translateLang}</div>
        <div>{vocab.userID}</div>
        <div>{vocab.description}</div>
        <div>{vocab.updatedAt.toLocaleString('en-GB')}</div>
      </div>
    </div>
  );
}
