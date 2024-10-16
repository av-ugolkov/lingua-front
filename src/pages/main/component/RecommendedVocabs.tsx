import { useEffect } from 'react';
import ShortCard from '@/components/elements/Vocabulary/ShortCard';
import { AuthStore, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { VocabularyData } from '@/models/Vocabulary';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearVocabs, setVocabs } from '@/redux/vocabularies/slice';

export default function RecommendedVocabs() {
  const vocabs = useAppSelector((state) => state.vocabs);
  const dispatch = useAppDispatch();
  const { isLoading, response: respRecomendVocabs } = useFetch(
    '/vocabularies/recommended',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  useEffect(() => {
    if (respRecomendVocabs.ok) {
      const vocabs: VocabularyData[] = [];
      respRecomendVocabs.data.forEach((item: any) => {
        vocabs.push({
          id: item['id'],
          name: item['name'],
          userID: item['user_id'],
          userName: item['user_name'],
          accessID: item['access_id'],
          nativeLang: item['native_lang'],
          translateLang: item['translate_lang'],
          tags: item['tags'] || [],
          description: item['description'],
          wordsCount: item['words_count'],
          isNotification: item['is_notification'],
        });
      });
      dispatch(setVocabs(vocabs));
    }

    return () => {
      dispatch(clearVocabs());
    };
  }, [respRecomendVocabs, dispatch]);

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
                id={vocab.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
