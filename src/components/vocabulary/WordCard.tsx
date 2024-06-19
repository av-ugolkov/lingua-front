import { VocabWord } from './Words';

export default function WordCard({ vocabWord }: { vocabWord: VocabWord }) {
  return (
    <>
      {' '}
      <div className='flex flex-row border-solid border-black border-2 rounded-xl shadow-xl mb-8'>
        <div className='p-2'>
          <div className='flex'>
            <input
              className='word'
              type='text'
              maxLength={50}
              placeholder='Word'
            />
            <input
              className='pronunciation'
              type='text'
              v-model='vocabWord.wordPronunciation'
              maxLength={75}
              placeholder='Pronunciation'
            />
            <img
              className='w-5'
              onClick={() => console.log('downloadPronunciation()')}
              src='/src/assets/icons/s48/download.svg'
              alt='download'
              title='Download pronunciation'
            />
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Translates</div>
            <div className='box_input'>
              {vocabWord.translates.map((tr, index) => (
                <>
                  <span
                    id={`${vocabWord.id}_tr_${index}`}
                    className='input translate font_subword'
                    role='textbox'
                    onKeyUp={() => console.log('editTranslateWord(index)')}
                    contentEditable>
                    {tr}
                  </span>
                  <img
                    onClick={() => console.log('deleteTranslateWord(index)')}
                    src='/src/assets/icons/s48/delete.svg'
                    alt='delete'
                  />
                </>
              ))}
            </div>
            <div
              className='box_input'
              onClick={() => console.log('addNewTranslateWord')}>
              <button className='box_button font_subword'>New</button>
              <img
                src='/src/assets/icons/s48/plus.svg'
                alt='add'
              />
            </div>
          </div>
          <div className='pt-3'>
            <div className='pb-[2px]'>Examples</div>
            <div className='box_input'>
              {vocabWord.examples.map((ex, index) => (
                <>
                  <span
                    id={`${vocabWord.id}_ex_${index}`}
                    className='input example font_subword'
                    role='textbox'
                    onKeyUp={() => console.log('editExampleWord(index)')}
                    contentEditable>
                    {ex}
                  </span>
                  <img
                    onClick={() => console.log('deleteExampleWord(index)')}
                    src='/src/assets/icons/s48/delete.svg'
                    alt='delete'
                  />
                </>
              ))}
            </div>
            <div
              className='box_input'
              onClick={() => console.log('addNewExampleWord')}>
              <button className='box_button font_subword'>New</button>
              <img
                src='/src/assets/icons/s48/plus.svg'
                alt='add'
              />
            </div>
          </div>
          {/* {vocabWord.updated != vocabWordsStore.invalidateDate && (
            <div className='date'>
              {vocabWordsStore.getUpdatedLocaleDate(vocabWord.id)}
            </div>
          )} */}
        </div>
        <div className='buttons'>
          <button
            className='right_btn'
            onClick={() =>
              console.log("vocabWord.id == '' ? addWord() : updateWord()")
            }>
            <img
              src='/src/assets/icons/s48/save.svg'
              alt='apply'
              title='Apply'
            />
          </button>
          <button
            v-if="vocabWord.id != ''"
            className='right_btn'
            onClick={() => console.log('cancelChanges()')}>
            <img
              src='/src/assets/icons/s48/x-circle.svg'
              alt='cancel'
              title='Cancel'
            />
          </button>
          <button
            v-if="vocabWord.id != ''"
            className='right_btn'
            onClick={() => console.log('deleteWord()')}>
            <img
              src='/src/assets/icons/s48/trash-2.svg'
              alt='delete'
              title='Delete'
            />
          </button>
        </div>
      </div>
    </>
  );
}
