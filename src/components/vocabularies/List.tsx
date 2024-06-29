import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import {
  VocabularyState,
  useVocabulariesStore,
} from '@/hooks/stores/useVocabulariesStore';
import { useGetFetchWithToken } from '@/hooks/fetch/useFetchWithToken';

export default function List() {
  const navigate = useNavigate();
  const vocabulariesStore = useVocabulariesStore();
  const { response, loading } = useGetFetchWithToken('/account/vocabularies');

  useEffect(() => {
    if (!loading) {
      if (response.ok) {
        let vocabularies: VocabularyState[] = [];
        response.data.forEach((item: any) => {
          vocabularies.push({
            id: item['id'],
            name: item['name'],
            nativeLang: item['native_lang'],
            translateLang: item['translate_lang'],
            tags: item['tags'],
            userId: item['user_id'],
          });
        });
        vocabulariesStore.setVocabularies(vocabularies);
      }
    }
  }, [loading]);

  if (loading) {
    return <div></div>;
  }

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
            navigate(`/vocabulary/${item.id}`);
          }}
        />
      ))}
    </div>
  );
}
