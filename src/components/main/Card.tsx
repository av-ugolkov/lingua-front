import { useFetchLanguages } from '@/hooks/fetch/useFetchLanguages';
import { Vocab } from './List';
import { useEffect, useState } from 'react';

export default function Card({ vocab }: { vocab: Vocab }) {
  const fetchLanguages = useFetchLanguages();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchLanguages.size > 0) {
      setLoading(false);
    }
  }, [fetchLanguages]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className='flex bg-gray-300 h-16 shadow shadow-blue-300'>
      <div className='flex w-full justify-around items-center mx-4'>
        <div>{vocab.name}</div>
        <div>{fetchLanguages.get(vocab.nativeLang)}</div>
        <div>{fetchLanguages.get(vocab.translateLang)}</div>
        <div>{vocab.userName}</div>
        <div>{vocab.description}</div>
        <div>{vocab.updatedAt.toLocaleString('en-GB')}</div>
      </div>
    </div>
  );
}
