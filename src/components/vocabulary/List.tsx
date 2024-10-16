import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import WordCard from './WordCard';
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
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [tempWord, setTempWord] = useState(EmptyVocabWord);
  const vocab = useAppSelector((state) => getVocab(state, id || ''));
  const { searchValue, sort, order } = useAppSelector(
    (state) => state.searchAndOrder
  );
  const orderedWords = useAppSelector((state) =>
    getOrderedWords(state, sort, order)
  );

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
          updated: item['updated'],
          created: item['created'],
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
            word.native.text.toLowerCase().includes(searchValue) ||
            word.translates.some((item) =>
              item.toLowerCase().includes(searchValue)
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
