import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import WordCard from './WordCard';
import {
  EmptyWord,
  VocabWordState,
  useVocabWordsStore,
} from '@/hooks/stores/useVocabWordsStore';
import { useSearchWordStore } from '@/hooks/stores/useSearchWordStore';
import { useSortedWordsStore } from '@/hooks/stores/useSortedWordsStore';
import { useGetFetchWithToken } from '@/hooks/fetch/useFetchWithToken';

export default function Words() {
  const { id } = useParams<string>();
  const vocabID = id || '';
  const navigate = useNavigate();
  const vocabWordsStore = useVocabWordsStore();
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();

  const { response, loading } = useGetFetchWithToken(
    '/vocabulary/word/all',
    new Map([['vocab_id', vocabID]])
  );

  useEffect(() => {
    if (!loading) {
      if (response.ok) {
        const words: VocabWordState[] = [];
        response.data.forEach((item: any) => {
          words.push({
            id: item['id'],
            vocabID: item['vocab_id'],
            wordID: item['word_id'],
            wordValue: item['native']['text'],
            wordPronunciation: item['native']['pronunciation'],
            translates: item['translates'] || [],
            examples: item['examples'] || [],
            updated: item['updated'],
            created: item['created'],
          });
        });
        vocabWordsStore.setWords(words);
      } else {
        navigate('/');
      }
    }
    return () => {
      vocabWordsStore.clearWords();
    };
  }, [loading]);

  return (
    <>
      <WordCard vocabWord={EmptyWord} />
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
            <WordCard vocabWord={word} />
          </div>
        ))}
    </>
  );
}
