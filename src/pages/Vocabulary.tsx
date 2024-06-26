import { useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';
import { useVocabulariesStore } from '@/stores/useVocabulariesStore';
import { useVocabWordsStore } from '@/stores/useVocabWordsStore';

export default function Vocabulary() {
  const { name } = useParams<'name'>();
  const vocabularies = useVocabulariesStore();
  const vocabWords = useVocabWordsStore();

  //загрузка всех данных и потом отображение страницы
  async function fetchData() {
    let vocab = vocabularies.getVocabularyByName(name || '');
    if (!vocab) {
      await vocabularies.fetchVocabularies();
      vocab = vocabularies.getVocabularyByName(name || '');
    }

    await vocabWords.fetchWords(vocab.id);
  }

  fetchData();

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
