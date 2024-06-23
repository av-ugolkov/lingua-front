import Tags from '../elements/Tags/Tags';
import {
  VocabWordState,
  useVocabWordsStore,
} from '@/stores/useVocabWordsStore';

import {
  ArrowDownTrayIcon,
  DocumentPlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default function WordCard({ vocabWord }: { vocabWord: VocabWordState }) {
  const vocabWords = useVocabWordsStore();

  return (
    <>
      <div className='flex flex-row mb-8 border-solid border-[1px] border-gray-300 shadow-md shadow-blue-300'>
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
            <ArrowDownTrayIcon
              className='w-5'
              onClick={() => console.log('downloadPronunciation()')}
              title='Download Pronunciation'
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
          {/* {vocabWord.updated != vocabWordsStore.invalidateDate && (
            <div className='date'>
              {vocabWordsStore.getUpdatedLocaleDate(vocabWord.id)}
            </div>
          )} */}
        </div>
        <div className='flex flex-col justify-around align-middle'>
          <button
            className='right_btn'
            onClick={() =>
              console.log("vocabWord.id == '' ? addWord() : updateWord()")
            }>
            <DocumentPlusIcon
              className='w-6'
              title='Save word'
            />
          </button>
          {vocabWord.id != '' && (
            <>
              <button onClick={() => console.log('cancelChanges()')}>
                <XCircleIcon
                  className='w-6'
                  title='Cancel changes'
                />
              </button>
              <button onClick={() => console.log('deleteWord()')}>
                <TrashIcon
                  className='w-6'
                  title='Delete word'
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
