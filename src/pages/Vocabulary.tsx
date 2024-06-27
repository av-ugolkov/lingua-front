import { useNavigate, useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';
import {
  EmptyVocabulary,
  useVocabulariesStore,
} from '@/stores/useVocabulariesStore';
import { useVocabWordsStore } from '@/stores/useVocabWordsStore';
import { useEffect } from 'react';

export default function Vocabulary() {
  const { name } = useParams<'name'>();
  const nagigate = useNavigate();
  const vocabularies = useVocabulariesStore();
  const vocabWords = useVocabWordsStore();

  async function fetchData() {
    let vocab = vocabularies.getVocabularyByName(name || '');
    if (!vocab) {
      await vocabularies.fetchVocabularies();
      vocab = vocabularies.getVocabularyByName(name || '');
    }
    if (vocab === EmptyVocabulary) {
      nagigate('/vocabularies');
    }

    await vocabWords.fetchWords(vocab.id);
  }

  fetchData();

  useEffect(() => {
    return () => {
      vocabWords.clearWords();
    };
  }, [name]);

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
