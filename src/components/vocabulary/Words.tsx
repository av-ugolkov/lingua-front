import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import WordCard from './WordCard';
import {
  VocabWordState,
  useVocabWordsStore,
} from '@/hooks/stores/useVocabWordsStore';
import { useSearchWordStore } from '@/hooks/stores/useSearchWordStore';
import { useSortedWordsStore } from '@/hooks/stores/useSortedWordsStore';
import {
  RequestMethod,
  useFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';

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
  const vocabID = id || '';
  const [tempWord, setTempWord] = useState(tempWordState);
  const navigate = useNavigate();
  const vocabWordsStore = useVocabWordsStore();
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();

  const { funcFetch: fetchWords } = useFetchWithToken(
    '/vocabulary/words',
    RequestMethod.GET
  );

  useEffect(() => {
    async function asyncFetchWords() {
      const response = await fetchWords({
        queries: new Map([['vocab_id', vocabID]]),
      });

      if (response.ok) {
        const words: VocabWordState[] = [];
        response.data.forEach((item: any) => {
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
      } else {
        navigate('/');
      }
    }

    asyncFetchWords();
    return () => {
      vocabWordsStore.clearWords();
    };
  }, []);

  return (
    <>
      <WordCard
        word={tempWord}
        updateWord={(newState) => {
          setTempWord((prev) => ({ ...prev, ...newState }));
        }}
      />
      {vocabWordsStore
        .getOrderedWords(sortedWordsStore.orderType)
        .filter((word) => {
          return (
            word.wordValue.toLowerCase().includes(searchWordStore.searchWord) ||
            word.translates.some((item) =>
              item.toLowerCase().includes(searchWordStore.searchWord)
            )
          );
        })
        .map((word) => (
          <div key={word.id}>
            <WordCard
              word={word}
              updateWord={vocabWordsStore.updateWord}
            />
          </div>
        ))}
    </>
  );
}
