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

export default function List() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempWord, setTempWord] = useState(tempWordState);
  const [editable, setEditable] = useState(false);
  const { getOrderedWords, setWords, updateWord, clearWords } =
    useVocabWordsStore();
  const searchStore = useSearchStore();
  const { sort, order, setDefaultOrderType } = useSortedStore();

  const { isLoading, response } = useFetch(
    '/vocabulary/words',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    { query: `id=${id}` }
  );

  useEffect(() => {
    if (response.ok) {
      const words: VocabWordState[] = [];
      response.data.words.forEach((item: any) => {
        words.push({
          id: item['id'],
          vocabID: id || '',
          wordID: item['native']['id'],
          wordValue: item['native']['text'],
          wordPronunciation: item['native']['pronunciation'],
          translates: item['translates'] || [],
          examples: item['examples'] || [],
          updated: new Date(item['updated']),
          created: new Date(item['created']),
        });
      });
      setWords(words);
      setEditable(response.data['editable']);
    } else if (!isLoading) {
      navigate('/');
    }

    return () => {
      clearWords();
      setDefaultOrderType();
    };
  }, [
    isLoading,
    response,
    id,
    setDefaultOrderType,
    setWords,
    clearWords,
    navigate,
  ]);

  if (isLoading) {
    return <div></div>;
  }

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
      {getOrderedWords(sort, order)
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
              updateWord={updateWord}
              editable={editable}
            />
          </div>
        ))}
    </>
  );
}
