import { IVocab } from './Card';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { useNavigate } from 'react-router-dom';
import LockItem from '../elements/LockItem';

export default function VocabTag({
  id,
  name,
  accessID,
  nativeLang,
  translateLang,
  wordsCount,
}: IVocab) {
  const navigate = useNavigate();
  const { languages } = useLanguagesStore();

  if (languages.size == 0) {
    return <></>;
  }

  return (
    <button
      key={id}
      className='flex flex-col px-3 py-1 bg-gray-300 duration-300 hover:shadow hover:shadow-blue-500 hover:duration-300'
      onClick={() => {
        navigate(`/vocabulary/${id}`);
      }}>
      <div className='flex w-full justify-between'>
        <div className='flex content-start'>{name}</div>
        <LockItem
          accessID={accessID}
          size={5}
        />
      </div>
      <div
        id='sub'
        className='flex w-full justify-between text-gray-600'>
        <div className='flex'>{`${languages.get(nativeLang)} ↔ ${languages.get(
          translateLang
        )}`}</div>
        <div className='flex'>
          {wordsCount} word{wordsCount != 1 && 's'}
        </div>
      </div>
    </button>
  );
}
