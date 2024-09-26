import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import WordCard from './WordCard';
import { useVocabWordsStore } from '@/hooks/stores/useVocabWordsStore';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import { useVocabulariesStore } from "@/hooks/stores/useVocabulariesStore.ts";
import { EmptyVocabWord, VocabWord } from "@/models/Word.ts";

export default function List() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempWord, setTempWord] = useState(EmptyVocabWord);
  const { getOrderedWords, setWords, updateWord, clearWords } = useVocabWordsStore();
  const {getVocabulary}=useVocabulariesStore()
  const searchStore = useSearchStore();
  const { sort, order } = useSortedStore();

  const { isLoading, response } = useFetch(
    '/vocabulary/words',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    { query: `id=${id}` }
  );

  useEffect(() => {
    if (response.ok) {
      const words: VocabWord[] = [];
      response.data.forEach((item: any) => {
        words.push({
          id: item['id'],
          vocabID: id || '',
          native: {
            id: item['native']['id'],
            text: item['native']['text'],
            pronunciation: item['native']['pronunciation'],
          },
          translates: item['translates'] || [],
          examples: item['examples'] || [],
          updated: new Date(item['updated']),
          created: new Date(item['created']),
        });
      });
      setWords(words);
    } else if (!isLoading) {
      navigate('/');
    }

    return () => {
      clearWords();
    };
  }, [isLoading, response, id, setWords, clearWords, navigate]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {getVocabulary(id).editable && (
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
            word.native.text.toLowerCase().includes(searchStore.searchValue) ||
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
              editable={getVocabulary(id).editable}
            />
          </div>
        ))}
    </>
  );
}
