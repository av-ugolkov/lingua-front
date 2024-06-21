import { useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';
import { useVocabulariesStore } from '@/stores/useVocabulariesStore';

export default function Vocabulary() {
  const { name } = useParams<'name'>();
  const vocabularies = useVocabulariesStore();
  const id = vocabularies.getVocabularyByName(name || '').id;

  return (
    <>
      <h2 className='pt-5 px-5 text-2xl font-bold'>{name}</h2>
      <div className='pt-5 px-5'>
        <SearchAndOrder />
      </div>
      <div className='px-2 py-5'>
        <Words vocab_id={id} />
      </div>
    </>
  );
}
