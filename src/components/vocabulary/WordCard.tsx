import { useParams } from 'react-router-dom';
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import {
  useDeleteFetchWithToken,
  usePostFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';
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

export default function WordCard({
  word,
  updateWord,
}: {
  word: VocabWordState;
  updateWord: (state: VocabWordState) => void;
}) {
  const { id: vocabID } = useParams();
  const vocabWordsStore = useVocabWordsStore();
  const { funcPostFetch: fetchAddWord } =
    usePostFetchWithToken('/vocabulary/word');
  const { funcPostFetch: fetchUpdateWord } = usePostFetchWithToken(
    '/vocabulary/word/update'
  );
  const { funcDeleteFetch: fetchDeleteWord } =
    useDeleteFetchWithToken('/vocabulary/word');

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
      const response = await fetchAddWord(bodyData);
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

      const response = await fetchUpdateWord(bodyData);
      console.warn('response: ', response.data);
    }

    asyncUpdateVocabWord();
  }

  function deleteVocabWord() {
    async function asyncDelete() {
      const jsonBodyData = { vocab_id: vocabID, word_id: word.id };
      const bodyData = JSON.stringify(jsonBodyData);
      const response = await fetchDeleteWord(bodyData);

      if (response.ok) {
        vocabWordsStore.removeWord(word.id);
      } else {
        console.error(response.data);
      }
    }

    asyncDelete();
  }

  return (
    <>
      <div className='flex flex-row min-w-[540px] mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
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
              }}
            />
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
            <BtnCard
              onClick={() => {
                addVocabWord();
              }}>
              <PlusCircleIcon
                className='w-6'
                title='Add word'
              />
            </BtnCard>
          ) : (
            <>
              <DropdownMenu title='Menu'>
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
                  title='Save changes'
                />
              </BtnCard>
              <BtnCard onClick={() => console.log('cancelChanges()')}>
                <XCircleIcon
                  className='w-6'
                  title='Cancel changes'
                />
              </BtnCard>
            </>
          )}
        </div>
      </div>
    </>
  );
}
