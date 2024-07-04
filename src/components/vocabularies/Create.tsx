import { useEffect, useState } from 'react';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Button from '../elements/Button';
import SelectLanguages from './SelectLanguages';
import { VocabularyState } from '@/hooks/stores/useVocabulariesStore';
import { fetchData } from '@/scripts/fetch/fetchData';

export interface ILanguage {
  lang: string;
  code: string;
}

const tempVocabulary: VocabularyState = {
  id: '',
  name: '',
  nativeLang: '',
  translateLang: '',
  tags: [],
  userId: '',
};

const tempLanguage: ILanguage[] = [];

export default function Create({
  addCallback,
  closeCallback,
}: {
  addCallback: (vocabulary: VocabularyState) => void;
  closeCallback: () => void;
}) {
  const [vocab, setVocab] = useState(tempVocabulary);
  const [languages, setLanguages] = useState(tempLanguage);

  useEffect(() => {
    async function asyncFetchData() {
      const respData = await fetchData('/languages', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (respData.ok) {
        respData.data.forEach((item: any) => {
          setLanguages((prev) => {
            return [
              ...prev,
              {
                lang: item['language'],
                code: item['code'],
              },
            ];
          });
        });
      }
    }

    asyncFetchData();
  }, []);

  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between p-4 border-b rounded-t'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Create new vocabulary
              </h3>
              <button
                type='button'
                className='text-gray-900 bg-transparent hover:bg-gray-400 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                onClick={closeCallback}>
                <XMarkIcon className='size-5' />
              </button>
            </div>
            <form className='p-4'>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='col-span-2'>
                  <span className='block mb-2 text-sm font-medium text-gray-900'>
                    Name
                  </span>
                  <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    placeholder='Vocabulary name'
                    required={true}
                    value={vocab.name}
                    onChange={(e) =>
                      setVocab({ ...vocab, name: e.target.value })
                    }
                  />
                </div>
                <SelectLanguages
                  key='native_lang'
                  title='Source language'
                  languages={languages}
                  onSelect={(e) => setVocab({ ...vocab, nativeLang: e })}
                />
                <SelectLanguages
                  key='translate_lang'
                  title='Second language'
                  languages={languages}
                  onSelect={(e) => setVocab({ ...vocab, translateLang: e })}
                />
              </div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                callback={() => {
                  if (
                    vocab.name === '' ||
                    vocab.nativeLang === '' ||
                    vocab.translateLang === '' ||
                    vocab.nativeLang == vocab.translateLang
                  ) {
                    console.error('Please fill in all required fields');
                    return;
                  } else {
                    addCallback(vocab);
                  }
                }}>
                <PlusIcon className='size-5 font-extrabold ' />
                Add new vocabulary
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
