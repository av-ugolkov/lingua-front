import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { PlusCircleIcon } from '@heroicons/react/24/outline';

import BtnCard from './BtnCard';
import Tags from '@/components/elements/Tags/Tags';
import InputField from './InputField';
import { VocabWord } from '@/models/Word.ts';
import api, { AuthStore } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addWord } from '@/redux/words/slice';
import { toastWarning } from '@/redux/toasts/slice';
import InputFieldButtons from './InputFieldButtons';
import { getVocab } from '@/redux/vocabularies/slice';

export default function InputWordCard() {
  const dispatch = useAppDispatch();
  const { id: vocabID } = useParams();
  const vocab = useAppSelector((state) => getVocab(state, vocabID || ''));
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [definition, setDefinition] = useState('');
  const [translates, setTranslates] = useState<string[]>([]);
  const [examples, setExamples] = useState<string[]>([]);

  function clearForm() {
    setWord('');
    setPronunciation('');
    setDefinition('');
    setTranslates([]);
    setExamples([]);
  }

  async function addVocabWord() {
    const resp = await api.post('/vocabulary/word', AuthStore.USE, {
      body: JSON.stringify({
        vocab_id: vocabID || '',
        native: {
          text: word,
          pronunciation: pronunciation,
        },
        definition: definition,
        translates: translates,
        examples: examples,
      }),
    });
    if (resp.ok) {
      const newWord: VocabWord = {
        id: resp.data['id'],
        wordID: resp.data['native']['id'],
        vocabID: vocabID || '',
        text: word,
        pronunciation: pronunciation,
        definition: definition,
        translates: translates,
        examples: examples,
        created: resp.data['created'],
        updated: resp.data['updated'],
      };

      dispatch(addWord(newWord));
      clearForm();
    } else {
      dispatch(toastWarning(resp.err));
    }
  }

  function getPronunciation() {
    async function asyncGetPronunciation() {
      const resp = await api.get(
        '/dictionary/word/pronunciation',
        AuthStore.USE,
        {
          query: [
            ['lang_code', vocab.nativeLang],
            ['text', word],
          ],
        }
      );
      if (resp.ok) {
        setPronunciation(resp.data['native']['pronunciation']);
      } else {
        dispatch(toastWarning(resp.err));
      }
    }

    asyncGetPronunciation();
  }

  return (
    <>
      <div className='flex flex-row min-w-[540px] bg-blue-100 mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
        <div className='py-2 my-2 px-2 mx-2 w-full'>
          <div className='flex gap-x-3'>
            <InputField
              value={word}
              placeholder='Word'
              maxLength={50}
              onChange={setWord}
            />
            <InputField
              value={pronunciation}
              placeholder='Pronunciation'
              maxLength={50}
              onChange={setPronunciation}>
              {word !== '' && <InputFieldButtons download={getPronunciation} />}
            </InputField>
          </div>
          <div className='pt-3'>
            <InputField
              value={definition}
              placeholder='Definition'
              maxLength={100}
              onChange={setDefinition}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Translates</div>
            <Tags
              id='translates'
              tags={translates}
              placeholder='Type new translate and press Enter'
              disabled={translates.length >= 10}
              onAddTag={(tag) => {
                setTranslates([...translates, tag]);
              }}
              onRemoveTag={(tag) => {
                const newTr = translates.filter((t) => t !== tag);
                setTranslates(newTr);
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              id='examples'
              tags={examples}
              placeholder='Type new example and press Enter'
              disabled={examples.length >= 5}
              onAddTag={(tag) => {
                setExamples([...examples, tag]);
              }}
              onRemoveTag={(tag) => {
                const newEx = examples.filter((t) => t !== tag);
                setExamples(newEx);
              }}
            />
          </div>
        </div>
        <div className='flex flex-col justify-around align-middle mr-2'>
          <BtnCard
            onClick={addVocabWord}
            disabled={word === ''}
            className='text-blue-700 duration-300 disabled:text-gray-400 disabled:duration-300'>
            <PlusCircleIcon
              className='w-6'
              title='Add word'
            />
          </BtnCard>
        </div>
      </div>
    </>
  );
}
