import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import {
  VocabularyState,
  useVocabulariesStore,
} from '@/hooks/stores/useVocabulariesStore';
import {
  RequestMethod,
  useFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';

export default function List() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const vocabulariesStore = useVocabulariesStore();
  const { funcFetch: fetchVocabularies } = useFetchWithToken(
    '/account/vocabularies',
    RequestMethod.GET
  );

  useEffect(() => {
    async function asyncFetchVocabularies() {
      const response = await fetchVocabularies({});
      if (response.ok) {
        let vocabularies: VocabularyState[] = [];
        response.data.forEach((item: any) => {
          vocabularies.push({
            id: item['id'],
            name: item['name'],
            accessID: item['access_id'],
            nativeLang: item['native_lang'],
            translateLang: item['translate_lang'],
            tags: item['tags'],
            userID: item['user_id'],
          });
        });
        vocabulariesStore.setVocabularies(vocabularies);
      } else {
        navigate('/');
      }
      setLoading(false);
    }
    asyncFetchVocabularies();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className='grid gap-10 grid-cols-[repeat(auto-fill,_384px)]'>
      {vocabulariesStore.vocabularies.map((item) => (
        <Card
          key={item.id}
          vocab={item}
          onClick={() => {
            navigate(`/vocabulary/${item.id}`);
          }}
        />
      ))}
    </div>
  );
}
