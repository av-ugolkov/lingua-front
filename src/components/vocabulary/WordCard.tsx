import Tags from '../elements/Tags/Tags';
import {
  InvalidateDate,
  VocabWordState,
  useVocabWordsStore,
} from '@/stores/useVocabWordsStore';

import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import BtnCard from './BtnCard';
import DropdownMenu from '../elements/Dropdown/DropdownMenu';
import DropdownItem from '../elements/Dropdown/Item';

export default function WordCard({ vocabWord }: { vocabWord: VocabWordState }) {
  const vocabWords = useVocabWordsStore();

  return (
    <>
      <div className='flex flex-row min-w-[540px] mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
        <div className='p-2 m-2 w-[96%]'>
          <div className='flex'>
            <input
              className='flex justify-start bg-transparent w-1/2 mr-1 border-solid border-[1px] border-black border-t-0 border-x-0 pb-1 outline-none'
              type='text'
              maxLength={50}
              placeholder='Word'
              value={vocabWord.wordValue}
            />
            <input
              className='flex justify-start bg-transparent w-1/2 ml-1 border-solid border-[1px] border-black border-t-0 border-x-0 pb-1 outline-none'
              type='text'
              maxLength={75}
              placeholder='Pronunciation'
              value={vocabWord.wordPronunciation}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Translates</div>
            <Tags
              tags={vocabWord.translates}
              placeholder='Type new translate and press Enter'
              onAddTag={(tag) => {
                vocabWord.translates.push(tag);
                vocabWords.updateWord(vocabWord);
              }}
              onRemoveTag={(ind) => {
                vocabWord.translates.splice(ind, 1);
                vocabWords.updateWord(vocabWord);
              }}
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <Tags
              tags={vocabWord.examples}
              placeholder='Type new example and press Enter'
              onAddTag={(tag) => {
                vocabWord.examples.push(tag);
                vocabWords.updateWord(vocabWord);
              }}
              onRemoveTag={(ind) => {
                vocabWord.examples.splice(ind, 1);
                vocabWords.updateWord(vocabWord);
              }}
            />
          </div>
          {vocabWord.updated != InvalidateDate && (
            <div className='relative w-full text-gray-500 bottom-[-12px] right-[-10px] text-right'>
              {vocabWord.created.toLocaleString('en-GB')}
            </div>
          )}
        </div>
        <div className='flex flex-col justify-around align-middle mx-2'>
          {vocabWord.id === '' ? (
            <BtnCard onClick={() => console.log('addWord()')}>
              <PlusCircleIcon
                className='w-6'
                title='Add word'
              />
            </BtnCard>
          ) : (
            <>
              <DropdownMenu title='Menu'>
                <DropdownItem>
                  Copy
                  <DocumentDuplicateIcon className='size-5 ' />
                </DropdownItem>
                <DropdownItem>
                  Delete
                  <TrashIcon className='size-5' />
                </DropdownItem>
              </DropdownMenu>
              <BtnCard onClick={() => console.log('updateWord()')}>
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
