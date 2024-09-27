import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import { VocabularyData } from "@/models/Vocabulary.ts";

export default function List() {
  const navigate = useNavigate();
  const { vocabularies, setVocabularies } = useVocabulariesStore();
  const { isLoading, response } = useFetch(
    '/account/vocabularies',
    RequestMethod.GET,
    AuthStore.USE
  );

  useEffect(() => {
    if (response.ok) {
      const vocabularies: VocabularyData[] = [];
      response.data.forEach((item: any) => {
        vocabularies.push({
          id: item['id'],
          name: item['name'],
          accessID: item['access_id'],
          nativeLang: item['native_lang'],
          translateLang: item['translate_lang'],
          description: item['description'],
          tags: item['tags'],
          userID: item['user_id'],
        });
      });
      setVocabularies(vocabularies);
    } else if (!isLoading) {
      navigate('/');
    }
  }, [isLoading, response, navigate, setVocabularies]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className='grid gap-10 grid-cols-[repeat(auto-fill,_384px)]'>
      {vocabularies.map((item) => (
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
