import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import WordCard from './WordCard';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { EmptyVocabWord, VocabWord } from '@/models/Word.ts';
import { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getVocab } from '@/redux/vocabularies/slice';
import {
  clearWords,
  getOrderedWords,
  setWords,
  updateWord,
} from '@/redux/words/slice';

export default function List() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempWord, setTempWord] = useState(EmptyVocabWord);
  const vocab = useAppSelector((state) => getVocab(state, id || ''));
  const searchStore = useSearchStore();
  const { sort, order } = useSortedStore();
  const orderedWords = useAppSelector((state) =>
    getOrderedWords(state, sort, order)
  );
  const dispatch = useAppDispatch();

  const query = useMemo<IQueryType>(() => [['id', id]], [id]);
  const { isLoading, response } = useFetch(
    '/vocabulary/words',
    RequestMethod.GET,
    AuthStore.OPTIONAL,
    { query: query }
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
      dispatch(setWords(words));
    } else if (!isLoading) {
      navigate('/');
    }

    return () => {
      dispatch(clearWords());
    };
  }, [isLoading, response, id, navigate, dispatch]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      {vocab.editable && (
        <WordCard
          word={tempWord}
          updateWord={(newState) => {
            setTempWord((prev) => ({ ...prev, ...newState }));
          }}
        />
      )}
      {orderedWords
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
              updateWord={(word) => dispatch(updateWord(word))}
              editable={vocab.editable}
            />
          </div>
        ))}
    </>
  );
}
