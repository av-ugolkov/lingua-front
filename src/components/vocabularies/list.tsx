import { useNavigate } from 'react-router-dom';

import Card from './card';
import { useVocabulariesStore } from '@/stores/useVocabulariesStore';

export default function List() {
  const navigate = useNavigate();
  const vocabulariesStore = useVocabulariesStore();

  return (
    <div className='grid gap-10 grid-cols-[repeat(auto-fill,_384px)]'>
      {vocabulariesStore.vocabularies.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.name}
          nativeLang={item.nativeLang}
          translateLang={item.translateLang}
          onClick={() => {
            navigate(`/vocabulary/${item.name}`);
          }}
        />
      ))}
    </div>
  );
}
