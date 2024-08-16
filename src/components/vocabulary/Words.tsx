import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import WordCard from './WordCard';
import {
  VocabWordState,
  useVocabWordsStore,
} from '@/hooks/stores/useVocabWordsStore';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';

const tempWordState: VocabWordState = {
  id: '',
  wordID: '',
  vocabID: '',
  wordValue: '',
  wordPronunciation: '',
  translates: [],
  examples: [],
  created: new Date(),
  updated: new Date(),
};

export default function Words() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempWord, setTempWord] = useState(tempWordState);
  const [editable, setEditable] = useState(false);
  const vocabWordsStore = useVocabWordsStore();
  const searchStore = useSearchStore();
  const sortedStore = useSortedStore();

  const { funcFetch: fetchWords } = useFetch(
    '/vocabulary/words',
    RequestMethod.GET,
    AuthStore.OPTIONAL
  );

  useEffect(() => {
    async function asyncFetchWords() {
      const vocabID = id || '';
      const response = await fetchWords({
        queries: new Map([['id', vocabID]]),
      });

      if (response.ok) {
        const words: VocabWordState[] = [];
        response.data['words'].forEach((item: any) => {
          words.push({
            id: item['id'],
            vocabID: vocabID,
            wordID: item['native']['id'],
            wordValue: item['native']['text'],
            wordPronunciation: item['native']['pronunciation'],
            translates: item['translates'] || [],
            examples: item['examples'] || [],
            updated: new Date(item['updated']),
            created: new Date(item['created']),
          });
        });
        vocabWordsStore.setWords(words);
        setEditable(response.data['editable']);
      } else {
        navigate('/');
      }
    }

    asyncFetchWords();
    return () => {
      vocabWordsStore.clearWords();
      searchStore.setSearchValue('');
      sortedStore.setDefaultOrderType();
    };
  }, []);

  return (
    <>
      {editable && (
        <WordCard
          word={tempWord}
          updateWord={(newState) => {
            setTempWord((prev) => ({ ...prev, ...newState }));
          }}
        />
      )}
      {vocabWordsStore
        .getOrderedWords(sortedStore.sort, sortedStore.order)
        .filter((word) => {
          return (
            word.wordValue.toLowerCase().includes(searchStore.searchValue) ||
            word.translates.some((item) =>
              item.toLowerCase().includes(searchStore.searchValue)
            )
          );
        })
        .map((word) => (
          <div key={word.id}>
            <WordCard
              word={word}
              updateWord={vocabWordsStore.updateWord}
              editable={editable}
            />
          </div>
        ))}
    </>
  );
}
