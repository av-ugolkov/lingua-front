import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  DocumentDuplicateIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import BtnCard from './BtnCard';
import Tags from '@/components/elements/Tags/Tags';
import DropdownMenu from '@/components/elements/Dropdown/DropdownMenu';
import DropdownItem from '@/components/elements/Dropdown/Item';
import InputField from './InputField';
import { VocabWord } from '@/models/Word.ts';
import api, { AuthStore } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addWord, removeWord } from '@/redux/words/slice';
import { toastError, toastSuccess, toastWarning } from '@/redux/toasts/slice';
import InputFieldButtons from './InputFieldButtons';
import { getVocab } from '@/redux/vocabularies/slice';

export default function WordCard({
  vocabWord,
  onChange,
  editable = true,
}: {
  vocabWord: VocabWord;
  onChange: (vocabWord: VocabWord) => void;
  editable?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { id: vocabID } = useParams();
  const vocab = useAppSelector((state) => getVocab(state, vocabID || ''));
  const [word, setWord] = useState(vocabWord.text);
  const [pronunciation, setPronunciation] = useState(vocabWord.pronunciation);
  const [definition, setDefinition] = useState(vocabWord.definition);
  const [translates, setTranslates] = useState(vocabWord.translates);
  const [examples, setExamples] = useState(vocabWord.examples);

  function clearForm() {
    setWord('');
    setPronunciation('');
    setDefinition('');
    setTranslates([]);
    setExamples([]);
  }

  function addVocabWord() {
    async function asyncAddWord() {
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
        updateWord();
      } else {
        dispatch(toastWarning(resp.err));
      }
    }

    asyncAddWord();
  }

  function deleteVocabWord() {
    async function asyncDelete() {
      const jsonBodyData = { vocab_id: vocabID, word_id: vocabWord.id };
      const bodyData = JSON.stringify(jsonBodyData);
      const response = await api.delete('/vocabulary/word', AuthStore.USE, {
        body: bodyData,
      });

      if (response.ok) {
        dispatch(removeWord(vocabWord.id));
      } else {
        console.error(response.data);
      }
    }

    asyncDelete();
  }

  function updateWord() {
    onChange({
      id: vocabWord.id,
      vocabID: vocabWord.vocabID,
      text: word,
      pronunciation: pronunciation,
      wordID: vocabWord.wordID,
      definition: definition,
      translates: translates,
      examples: examples,
      created: vocabWord.created,
      updated: vocabWord.updated,
    });
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
        updateWord();
      } else {
        dispatch(toastWarning(resp.err));
      }
    }

    asyncGetPronunciation();
  }

  async function saveWord(value: string) {
    const resp = await api.post('/vocabulary/word/text', AuthStore.USE, {
      body: JSON.stringify({
        id: vocabWord.id,
        vocab_id: vocabID,
        native: {
          id: vocabWord.wordID,
          text: value,
        },
      }),
    });

    if (resp.ok) {
      dispatch(toastSuccess('Word updated'));
      updateWord();
    } else {
      dispatch(toastError(resp.err));
    }
  }

  async function savePronunciation(value: string) {
    const resp = await api.post(
      '/vocabulary/word/pronunciation',
      AuthStore.USE,
      {
        body: JSON.stringify({
          id: vocabWord.id,
          vocab_id: vocabID,
          native: {
            id: vocabWord.wordID,
            text: word,
            pronunciation: value,
          },
        }),
      }
    );

    if (resp.ok) {
      dispatch(toastSuccess('Pronunciation updated'));
      updateWord();
    } else {
      dispatch(toastError(resp.err));
    }
  }

  async function saveDefinition(value: string) {
    const resp = await api.post('/vocabulary/word/definition', AuthStore.USE, {
      body: JSON.stringify({
        id: vocabWord.id,
        vocab_id: vocabID,
        native: {
          id: vocabWord.wordID,
          text: word,
        },
        definition: value,
      }),
    });

    if (resp.ok) {
      dispatch(toastSuccess('Definition updated'));
      updateWord();
    } else {
      dispatch(toastError(resp.err));
    }
  }

  async function saveTranslates(translates: string[]) {
    const data = JSON.stringify({
      id: vocabWord.id,
      vocab_id: vocabID,
      translates: translates,
    });
    const resp = await api.post('/vocabulary/word/translates', AuthStore.USE, {
      body: data,
    });

    if (resp.ok) {
      dispatch(toastSuccess('Translates updated'));
      onChange({ ...vocabWord, translates: translates });
      setTranslates(translates);
    } else {
      if (resp.status === 409) {
        dispatch(toastWarning(resp.err));
      } else {
        dispatch(toastError(resp.err));
      }
    }
  }

  async function saveExamples(examples: string[]) {
    const resp = await api.post('/vocabulary/word/examples', AuthStore.USE, {
      body: JSON.stringify({
        id: vocabWord.id,
        vocab_id: vocabID,
        examples: examples,
      }),
    });

    if (resp.ok) {
      dispatch(toastSuccess('Examples updated'));
      onChange({ ...vocabWord, examples: examples });
      setExamples(examples);
    } else {
      if (resp.status === 409) {
        dispatch(toastWarning(resp.err));
      } else {
        dispatch(toastError(resp.err));
      }
    }
  }

  return (
    <>
      <div className='flex flex-row min-w-[540px] bg-blue-100 mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
        <div className='py-2 my-2 px-2 mx-2 w-full'>
          <div className='flex gap-x-3'>
            <InputField
              value={word}
              placeholder='Word'
              disabled={!editable}
              maxLength={50}
              onChange={setWord}
              onFixed={(v) => {
                if (v !== '' && v !== vocabWord.text) saveWord(v);
              }}
            />
            <InputField
              value={pronunciation}
              placeholder='Pronunciation'
              disabled={!editable}
              maxLength={50}
              onChange={setPronunciation}
              onFixed={(v) => {
                if (v !== vocabWord.pronunciation) {
                  savePronunciation(v);
                }
              }}>
              {word !== '' && <InputFieldButtons download={getPronunciation} />}
            </InputField>
          </div>
          <div className='pt-3'>
            <InputField
              value={definition}
              placeholder='Definition'
              disabled={!editable}
              maxLength={100}
              onChange={setDefinition}
              onFixed={(v) => {
                if (v !== vocabWord.definition) {
                  saveDefinition(v);
                }
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Translates</div>
            <Tags
              id={vocabWord.id}
              tags={vocabWord.translates}
              placeholder='Type new translate and press Enter'
              disabled={!editable || translates.length >= 10}
              onAddTag={(tag) => {
                saveTranslates([...translates, tag]);
              }}
              onRemoveTag={(tag) => {
                const newTr = translates.filter((t) => t !== tag);
                saveTranslates(newTr);
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              id={vocabWord.id}
              tags={vocabWord.examples}
              placeholder='Type new example and press Enter'
              disabled={!editable || examples.length >= 5}
              onAddTag={(tag) => {
                saveExamples([...examples, tag]);
              }}
              onRemoveTag={(tag) => {
                const newEx = examples.filter((t) => t !== tag);
                saveExamples(newEx);
              }}
            />
          </div>
          {vocabWord.updated != 0 && (
            <div className='relative w-full text-gray-400 -bottom-3 text-right'>
              {new Date(vocabWord.created).toLocaleString('en-GB')}
            </div>
          )}
        </div>
        {editable && (
          <>
            {vocabWord.id === '' ? (
              <div className='flex flex-col justify-around align-middle mr-2'>
                <BtnCard onClick={addVocabWord}>
                  <PlusCircleIcon
                    className='w-6'
                    color='blue'
                    title='Add word'
                  />
                </BtnCard>
              </div>
            ) : (
              <div className='flex flex-col justify-start pt-3 align-middle mr-2'>
                <DropdownMenu
                  title='Menu'
                  baseSize='w-7 h-7'>
                  <DropdownItem disable>
                    <span className='block text-nowrap'>Copy to</span>
                    <DocumentDuplicateIcon className='size-5' />
                  </DropdownItem>
                  <DropdownItem disable>
                    <span className='block text-nowrap'>Move to</span>
                    <DocumentDuplicateIcon className='size-5 ' />
                  </DropdownItem>
                  <DropdownItem onClick={deleteVocabWord}>
                    Delete
                    <TrashIcon className='size-5' />
                  </DropdownItem>
                </DropdownMenu>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
