import { useParams } from 'react-router-dom';
import {
  ArrowDownCircleIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import { RequestMethod, AuthStore, useFetchFunc } from '@/hooks/fetch/useFetch';
import {
  EmptyWord,
  InvalidateDate,
  VocabWordState,
  useVocabWordsStore,
} from '@/hooks/stores/useVocabWordsStore';
import BtnCard from './BtnCard';
import Tags from '../elements/Tags/Tags';
import DropdownMenu from '../elements/Dropdown/DropdownMenu';
import DropdownItem from '../elements/Dropdown/Item';
import InputField from './InputField';
import { useNotificationStore } from '../notification/useNotificationStore';

export default function WordCard({
  word,
  updateWord,
  editable = true,
}: {
  word: VocabWordState;
  updateWord: (state: VocabWordState) => void;
  editable?: boolean;
}) {
  const { id: vocabID } = useParams();
  const vocabWordsStore = useVocabWordsStore();
  const { notificationWarning } = useNotificationStore();
  const { fetchFunc: fetchAddWord } = useFetchFunc(
    '/vocabulary/word',
    RequestMethod.POST,
    AuthStore.USE
  );
  const { fetchFunc: fetchUpdateWord } = useFetchFunc(
    '/vocabulary/word/update',
    RequestMethod.POST,
    AuthStore.USE
  );
  const { fetchFunc: fetchDeleteWord } = useFetchFunc(
    '/vocabulary/word',
    RequestMethod.DELETE,
    AuthStore.USE
  );
  const { fetchFunc: fetchWord } = useFetchFunc(
    '/vocabulary/word',
    RequestMethod.GET,
    AuthStore.USE
  );
  const { fetchFunc: fetchPronunciation } = useFetchFunc(
    '/vocabulary/word/pronunciation',
    RequestMethod.GET,
    AuthStore.USE
  );

  function addVocabWord() {
    async function asyncAddWord() {
      const jsonBodyData = {
        id: '00000000-0000-0000-0000-000000000000',
        vocab_id: vocabID,
        native: {
          id: '00000000-0000-0000-0000-000000000000',
          text: word.wordValue,
          pronunciation: word.wordPronunciation,
        },
        translates: word.translates,
        examples: word.examples,
      };
      const bodyData = JSON.stringify(jsonBodyData);
      const response = await fetchAddWord({ body: bodyData });
      if (response.ok) {
        const newWord: VocabWordState = {
          id: response.data['id'],
          wordID: response.data['native']['id'],
          vocabID: vocabID || '',
          wordValue: word.wordValue,
          wordPronunciation: word.wordPronunciation,
          translates: [...word.translates],
          examples: [...word.examples],
          created: new Date(response.data['created']),
          updated: new Date(response.data['updated']),
        };

        vocabWordsStore.addWord(newWord);
        updateWord(EmptyWord);
      } else {
        console.warn(response);
      }
    }
    asyncAddWord();
  }

  function updateVocabWord() {
    async function asyncUpdateVocabWord() {
      const jsonBodyData = {
        id: word.id,
        vocab_id: vocabID,
        native: {
          id: word.id,
          text: word.wordValue,
          pronunciation: word.wordPronunciation,
        },
        translates: word.translates,
        examples: word.examples,
      };
      const bodyData = JSON.stringify(jsonBodyData);

      const response = await fetchUpdateWord({ body: bodyData });
      console.warn('response: ', response.data);
    }

    asyncUpdateVocabWord();
  }

  function deleteVocabWord() {
    async function asyncDelete() {
      const jsonBodyData = { vocab_id: vocabID, word_id: word.id };
      const bodyData = JSON.stringify(jsonBodyData);
      const response = await fetchDeleteWord({ body: bodyData });

      if (response.ok) {
        vocabWordsStore.removeWord(word.id);
      } else {
        console.error(response.data);
      }
    }

    asyncDelete();
  }

  function cancelChanges() {
    async function asyncCancelChanges() {
      const response = await fetchWord({ query: `id=${word.id}` });
      if (response.ok) {
        word.wordValue = response.data['native']['text'];
        word.wordPronunciation = response.data['native']['pronunciation'] || '';
        word.examples = response.data['examples'] || [];
        word.translates = response.data['translates'] || [];
        updateWord(word);
      } else {
        console.error(response);
      }
    }

    asyncCancelChanges();
  }

  function getPronunciation() {
    async function asyncGetPronunciation() {
      const response = await fetchPronunciation({
        query: `id=${word.vocabID}&text=${word.wordValue}`,
      });
      if (response.ok) {
        word.wordPronunciation = response.data['native']['pronunciation'];
        updateWord(word);
      } else {
        notificationWarning(response.data);
      }
    }

    asyncGetPronunciation();
  }

  return (
    <>
      <div className='flex flex-row min-w-[540px] bg-blue-100 mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
        <div className='p-2 m-2 w-[96%]'>
          <div className='flex gap-x-3'>
            <InputField
              value={word.wordValue}
              placeholder='Word'
              onChange={(v) => {
                word.wordValue = v;
                updateWord(word);
              }}
            />
            <InputField
              value={word.wordPronunciation}
              placeholder='Pronunciation'
              onChange={(v) => {
                word.wordPronunciation = v;
                updateWord(word);
              }}>
              {word.wordValue !== '' && (
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
              id={word.id}
              tags={word.translates}
              placeholder='Type new translate and press Enter'
              onAddTag={(tag) => {
                word.translates.push(tag);
                updateWord(word);
              }}
              onRemoveTag={(ind) => {
                word.translates.splice(ind, 1);
                updateWord(word);
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              id={word.id}
              tags={word.examples}
              placeholder='Type new example and press Enter'
              onAddTag={(tag) => {
                word.examples.push(tag);
                updateWord(word);
              }}
              onRemoveTag={(ind) => {
                word.examples.splice(ind, 1);
                updateWord(word);
              }}
            />
          </div>
          {word.updated != InvalidateDate && (
            <div className='relative w-full text-gray-400 bottom-[-14px] text-right'>
              {word.created.toLocaleString('en-GB')}
            </div>
          )}
        </div>
        <div className='flex flex-col justify-around align-middle mx-2'>
          {word.id === '' ? (
            <BtnCard onClick={addVocabWord}>
              <PlusCircleIcon
                className='w-6'
                color='blue'
                title='Add word'
              />
            </BtnCard>
          ) : (
            editable && (
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
            )
          )}
        </div>
      </div>
    </>
  );
}
