import { useEffect, useState } from 'react';

import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import { Vocab } from './List';
import RightPanel from './RightPanel';

export default function Card({ vocab }: { vocab: Vocab }) {
  const { languages, fetchLanguages } = useLanguagesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (languages.size > 0) {
      setLoading(false);
    } else {
      fetchLanguages();
    }
  }, [languages]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className='flex bg-gray-300 h-fit shadow shadow-blue-300'>
      <div className='flex flex-col w-full justify-around items-center mx-4'>
        <div className='flex w-full justify-center items-center my-2 gap-1'>
          <div>
            <span className='text-lg font-bold'>{vocab.name}</span>
          </div>
          <div>
            from{' '}
            <span className='text-lg font-bold'>
              {languages.get(vocab.nativeLang)}
            </span>
          </div>
          <div>
            to{' '}
            <span className='text-lg font-bold'>
              {languages.get(vocab.translateLang)}
            </span>
          </div>
          <div>
            with <span className='text-lg font-bold'>{vocab.wordsCount}</span>{' '}
            words
          </div>
        </div>
        <div className='flex w-full justify-center items-center'>
          <div>{vocab.description || 'No description'}</div>
        </div>
        <div className='flex bottom-12 w-full justify-start items-center mt-2'>
          <div className='text-sm text-gray-500'>
            Created by <span className='font-bold'>{vocab.userName}</span>
            {' at '}
            {vocab.updatedAt.toLocaleDateString('en-GB')}
          </div>
        </div>
      </div>
      <div className='content-center h-28'>
        <RightPanel
          onCopy={() => {}}
          onLike={() => {}}
          onDislike={() => {}}
        />
      </div>
    </div>
  );
}
