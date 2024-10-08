import { useEffect, useState } from 'react';
import ShortCard from '@/components/elements/Vocabulary/ShortCard';
import { AuthStore, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';

export interface Vocab {
  id: string;
  name: string;
  description: string;
  wordsCount: number;
  userID: string;
  userName: string;
  accessID: number;
  nativeLang: string;
  translateLang: string;
}

export default function RecommendedVocabs() {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);

  const { isLoading, response: respRecomendVocabs } = useFetch(
    '/vocabularies/recommended',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  useEffect(() => {
    if (respRecomendVocabs.ok) {
      const vocabs: Vocab[] = [];
      respRecomendVocabs.data.forEach((item: any) => {
        vocabs.push({
          id: item['id'],
          name: item['name'],
          userID: item['user_id'],
          userName: item['user_name'],
          accessID: item['access_id'],
          nativeLang: item['native_lang'],
          translateLang: item['translate_lang'],
          description: item['description'],
          wordsCount: item['words_count'],
        });
      });
      setVocabs(vocabs);
    }
  }, [respRecomendVocabs]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <section className='bg-blue-100 p-8 mt-8 shadow-md shadow-blue-300 text-center'>
      <h1 className='text-4xl'>Learn Foreign Words</h1>
      <p>Expand your vocabulary easily and effectively!</p>
      <div className='flex w-full justify-center mt-5'>
        <div className='flex gap-x-3 font-bold'>
          {vocabs.length === 0 ? (
            <p>No recommended vocabularies</p>
          ) : (
            vocabs.map((vocab) => (
              <ShortCard
                key={vocab.id}
                {...vocab}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
