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
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addExample,
  addTranslation,
  addWord,
  getWord,
  removeExample,
  removeTranslation,
  removeWord,
  updateWord,
} from '@/redux/words/slice';
import { notificationWarning } from '@/redux/notifications/slice';

export default function WordCard({
  wordID,
  editable = true,
}: {
  wordID: string;
  editable?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { id: vocabID } = useParams();
  const vocabWord = useAppSelector((state) => getWord(state, wordID));

  function addVocabWord() {
    async function asyncAddWord() {
      const response = await api.post('/vocabulary/word', AuthStore.USE, {
        body: JSON.stringify({
          vocab_id: vocabID || '',
          native: {
            text: vocabWord.text,
            pronunciation: vocabWord.pronunciation,
          },
          translates: vocabWord.translates,
          examples: vocabWord.examples,
        }),
      });
      if (response.ok) {
        const newWord: VocabWord = {
          id: response.data['id'],
          wordID: response.data['native']['id'],
          text: vocabWord.text,
          pronunciation: vocabWord.pronunciation,
          vocabID: vocabID || '',
          translates: [...vocabWord.translates],
          examples: [...vocabWord.examples],
          created: response.data['created'],
          updated: response.data['updated'],
        };

        dispatch(addWord(newWord));
        clearVocabWord(vocabWord);
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
            id: vocabWord.id,
            vocab_id: vocabID,
            native: {
              id: vocabWord.wordID,
              text: vocabWord.text,
              pronunciation: vocabWord.pronunciation,
            },
            translates: vocabWord.translates,
            examples: vocabWord.examples,
          }),
        }
      );
      console.warn('response: ', response.data);
    }

    asyncUpdateVocabWord();
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

  function cancelChanges() {
    async function asyncCancelChanges() {
      const response = await api.get('/vocabulary/word', AuthStore.USE, {
        query: [
          ['id', vocabWord.vocabID],
          ['word_id', vocabWord.id],
        ],
      });
      if (response.ok) {
        dispatch(
          updateWord({
            ...vocabWord,
            text: response.data['native']['text'],
            pronunciation: response.data['native']['pronunciation'] || '',
            translates: response.data['translates'] || [],
            examples: response.data['examples'] || [],
          })
        );
      } else {
        console.error(response);
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
            ['text', vocabWord.text],
          ],
        }
      );
      if (response.ok) {
        dispatch(
          updateWord({
            ...vocabWord,
            pronunciation: response.data['native']['pronunciation'],
          })
        );
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
              value={vocabWord.text}
              placeholder='Word'
              disabled={!editable}
              onChange={(v) => {
                dispatch(updateWord({ ...vocabWord, text: v }));
              }}
            />
            <InputField
              value={vocabWord.pronunciation}
              placeholder='Pronunciation'
              disabled={!editable}
              onChange={(v) => {
                dispatch(updateWord({ ...vocabWord, pronunciation: v }));
              }}>
              {vocabWord.text !== '' && editable && (
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
              id={vocabWord.id}
              tags={vocabWord.translates}
              placeholder='Type new translate and press Enter'
              disabled={!editable}
              onAddTag={(tag) => {
                dispatch(addTranslation({ id: vocabWord.id, text: tag }));
              }}
              onRemoveTag={(ind) => {
                dispatch(
                  removeTranslation({ id: vocabWord.id, transInd: ind })
                );
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              id={vocabWord.id}
              tags={vocabWord.examples}
              placeholder='Type new example and press Enter'
              disabled={!editable}
              onAddTag={(tag) => {
                dispatch(addExample({ id: vocabWord.id, text: tag }));
              }}
              onRemoveTag={(ind) => {
                dispatch(removeExample({ id: vocabWord.id, examInd: ind }));
              }}
            />
          </div>
          {vocabWord.updated != 0 && (
            <div className='relative w-full text-gray-400 bottom-[-14px] text-right'>
              {new Date(vocabWord.created).toLocaleString('en-GB')}
            </div>
          )}
        </div>
        {editable && (
          <div className='flex flex-col justify-around align-middle mx-2'>
            {vocabWord.id === '' ? (
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
