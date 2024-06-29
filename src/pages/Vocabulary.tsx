import { useNavigate, useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';
import {
  EmptyVocabulary,
  useVocabulariesStore,
} from '@/stores/useVocabulariesStore';
import { useVocabWordsStore } from '@/stores/useVocabWordsStore';
import { useEffect, useState } from 'react';

export default function Vocabulary() {
  const { name } = useParams<'name'>();
  const nameVocab = name || '';
  const [loading, setLoading] = useState(true);
  const nagigate = useNavigate();
  const vocabularies = useVocabulariesStore();
  const vocabWords = useVocabWordsStore();

  useEffect(() => {
    async function fetchData() {
      let vocab = vocabularies.getVocabularyByName(nameVocab);
      if (vocab === EmptyVocabulary) {
        nagigate('/vocabularies');
      }

      // await vocabWords.fetchWords(vocab.id);

      // const { response, loading } = useGetFetchWithToken(
      //   '/vocabulary/word/all',
      //   new Map([['vocab_id', vocabID]])
      // );
    }
    if (nameVocab !== '') {
      fetchData();
    } else {
      nagigate('/vocabularies');
    }

    setLoading(loading);

    return () => {
      vocabWords.clearWords();
    };
  }, [name]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <h2 className='pt-5 px-5 text-2xl font-bold'>{name}</h2>
      <div className='pt-5 px-5'>
        <SearchAndOrder />
      </div>
      <div className='px-2 py-5'>
        <Words />
      </div>
    </>
  );
}
