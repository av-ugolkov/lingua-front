import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ArrowDownCircleIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import BtnCard from './BtnCard';
import Tags from '../elements/Tags/Tags';
import DropdownMenu from '../elements/Dropdown/DropdownMenu';
import DropdownItem from '../elements/Dropdown/Item';
import InputField from './InputField';
import { clearVocabWord, VocabWord } from '@/models/Word.ts';
import api, { AuthStore } from '@/scripts/api';
import { useAppDispatch } from '@/hooks/redux';
import { addWord, removeWord } from '@/redux/words/slice';
import {
  notificationSuccess,
  notificationWarning,
} from '@/redux/notifications/slice';

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

  const [localVocabWord, setLocalVocabWord] = useState(vocabWord);

  function addVocabWord() {
    async function asyncAddWord() {
      const response = await api.post('/vocabulary/word', AuthStore.USE, {
        body: JSON.stringify({
          vocab_id: vocabID || '',
          native: {
            text: localVocabWord.text,
            pronunciation: localVocabWord.pronunciation,
          },
          translates: localVocabWord.translates,
          examples: localVocabWord.examples,
        }),
      });
      if (response.ok) {
        const newWord: VocabWord = {
          id: response.data['id'],
          wordID: response.data['native']['id'],
          text: localVocabWord.text,
          pronunciation: localVocabWord.pronunciation,
          vocabID: vocabID || '',
          translates: [...localVocabWord.translates],
          examples: [...localVocabWord.examples],
          created: response.data['created'],
          updated: response.data['updated'],
        };

        dispatch(addWord(newWord));
        clearVocabWord(localVocabWord);
        onChange(localVocabWord);
      } else {
        dispatch(notificationWarning(response.data));
      }
    }

    asyncAddWord();
  }

  function updateVocabWord() {
    async function asyncUpdateVocabWord() {
      const response = await api.post(
        '/vocabulary/word/update',
        AuthStore.USE,
        {
          body: JSON.stringify({
            id: localVocabWord.id,
            vocab_id: vocabID,
            native: {
              id: localVocabWord.wordID,
              text: localVocabWord.text,
              pronunciation: localVocabWord.pronunciation,
            },
            translates: localVocabWord.translates,
            examples: localVocabWord.examples,
          }),
        }
      );
      if (response.ok) {
        dispatch(notificationSuccess('Word updated'));
      } else {
        dispatch(notificationWarning('Sorry was something wrong'));
      }
    }

    asyncUpdateVocabWord();
  }

  function deleteVocabWord() {
    async function asyncDelete() {
      const jsonBodyData = { vocab_id: vocabID, word_id: localVocabWord.id };
      const bodyData = JSON.stringify(jsonBodyData);
      const response = await api.delete('/vocabulary/word', AuthStore.USE, {
        body: bodyData,
      });

      if (response.ok) {
        dispatch(removeWord(localVocabWord.id));
      } else {
        console.error(response.data);
      }
    }

    asyncDelete();
  }

  function cancelChanges() {
    async function asyncCancelChanges() {
      const response = await api.get('/vocabulary/word', AuthStore.USE, {
        query: [
          ['id', localVocabWord.vocabID],
          ['word_id', localVocabWord.id],
        ],
      });
      if (response.ok) {
        setLocalVocabWord({
          ...localVocabWord,
          text: response.data['native']['text'],
          pronunciation: response.data['native']['pronunciation'] || '',
          translates: response.data['translates'] || [],
          examples: response.data['examples'] || [],
        });
        onChange(localVocabWord);
      } else {
        dispatch(notificationWarning('Sorry was something wrong'));
      }
    }

    asyncCancelChanges();
  }

  function getPronunciation() {
    async function asyncGetPronunciation() {
      const response = await api.get(
        '/vocabulary/word/pronunciation',
        AuthStore.USE,
        {
          query: [
            ['id', vocabID],
            ['text', localVocabWord.text],
          ],
        }
      );
      if (response.ok) {
        setLocalVocabWord({
          ...localVocabWord,
          pronunciation: response.data['native']['pronunciation'],
        });
        onChange(localVocabWord);
      } else {
        dispatch(notificationWarning(response.data));
      }
    }

    asyncGetPronunciation();
  }

  return (
    <>
      <div className='flex flex-row min-w-[540px] bg-blue-100 mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
        <div className='p-2 m-2 w-full'>
          <div className='flex gap-x-3'>
            <InputField
              value={localVocabWord.text}
              placeholder='Word'
              disabled={!editable}
              onChange={(v) => {
                setLocalVocabWord({ ...localVocabWord, text: v });
                onChange(localVocabWord);
              }}
            />
            <InputField
              value={localVocabWord.pronunciation}
              placeholder='Pronunciation'
              disabled={!editable}
              onChange={(v) => {
                setLocalVocabWord({ ...localVocabWord, pronunciation: v });
                onChange(localVocabWord);
              }}>
              {localVocabWord.text !== '' && editable && (
                <ArrowDownCircleIcon
                  title='Download pronunciation'
                  onClick={() => {
                    getPronunciation();
                  }}
                  className='size-6 py-0.5 mx-1 px-0.5'
                />
              )}
            </InputField>
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Translates</div>
            <Tags
              id={localVocabWord.id}
              tags={localVocabWord.translates}
              placeholder='Type new translate and press Enter'
              disabled={!editable}
              onAddTag={(tag) => {
                setLocalVocabWord({
                  ...localVocabWord,
                  translates: [...localVocabWord.translates, tag],
                });
                onChange(localVocabWord);
              }}
              onRemoveTag={(ind) => {
                setLocalVocabWord({
                  ...localVocabWord,
                  translates: localVocabWord.translates.filter(
                    (_, i) => i !== ind
                  ),
                });
                onChange(localVocabWord);
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              id={localVocabWord.id}
              tags={localVocabWord.examples}
              placeholder='Type new example and press Enter'
              disabled={!editable}
              onAddTag={(tag) => {
                setLocalVocabWord({
                  ...localVocabWord,
                  examples: [...localVocabWord.examples, tag],
                });
                onChange(localVocabWord);
              }}
              onRemoveTag={(ind) => {
                setLocalVocabWord({
                  ...localVocabWord,
                  examples: localVocabWord.examples.filter((_, i) => i !== ind),
                });
                onChange(localVocabWord);
              }}
            />
          </div>
          {localVocabWord.updated != 0 && (
            <div className='relative w-full text-gray-400 bottom-[-14px] text-right'>
              {new Date(localVocabWord.created).toLocaleString('en-GB')}
            </div>
          )}
        </div>
        {editable && (
          <div className='flex flex-col justify-around align-middle mx-2'>
            {localVocabWord.id === '' ? (
              <BtnCard onClick={addVocabWord}>
                <PlusCircleIcon
                  className='w-6'
                  color='blue'
                  title='Add word'
                />
              </BtnCard>
            ) : (
              <>
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
                <BtnCard onClick={updateVocabWord}>
                  <CheckCircleIcon
                    className='w-6'
                    color='green'
                    title='Save changes'
                  />
                </BtnCard>
                <BtnCard onClick={cancelChanges}>
                  <XCircleIcon
                    className='w-6'
                    color='red'
                    title='Cancel changes'
                  />
                </BtnCard>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
