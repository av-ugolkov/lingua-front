import { useEffect, useState } from 'react';

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Button from '../elements/Button';
import SelectLanguages from './SelectLanguages';
import { VocabularyState } from '@/hooks/stores/useVocabulariesStore';
import { fetchData } from '@/scripts/fetch/fetchData';
import { ILanguage, useLanguagesStore } from '@/hooks/stores/useLanguagesStore';

export interface IAccess {
  id: number;
  type: string;
  name: string;
}

const tempVocabulary: VocabularyState = {
  id: '',
  name: '',
  accessID: 2,
  nativeLang: '',
  translateLang: '',
  description: '',
  tags: [],
  userID: '',
};

const tempLanguages: ILanguage[] = [];
const tempAccesses: IAccess[] = [];
const maxDescriptionLength = 150;

export default function Create({
  addCallback,
  closeCallback,
}: {
  addCallback: (vocabulary: VocabularyState) => void;
  closeCallback: () => void;
}) {
  const [vocab, setVocab] = useState(tempVocabulary);
  const { languages: languagesStore, fetchLanguages } = useLanguagesStore();
  const [languages, setLanguages] = useState(tempLanguages);
  const [accesses, setAccesses] = useState(tempAccesses);

  useEffect(() => {
    if (languagesStore.size > 0) {
      languagesStore.forEach((v, k) => {
        setLanguages((prev) => [
          ...prev,
          {
            lang: v,
            code: k,
          },
        ]);
      });
    } else {
      fetchLanguages();
    }
  }, [languagesStore]);

  useEffect(() => {
    async function asyncFetchAccesses() {
      const respData = await fetchData('/accesses', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (respData.ok) {
        let accessesData: IAccess[] = [];
        respData.data.forEach((item: any) => {
          accessesData.push({
            id: item['id'],
            type: item['type'],
            name: item['name'],
          });
        });
        const sorted = accessesData.sort((a, b) => (a.id < b.id ? 1 : -1));
        setAccesses(sorted);
      } else {
        console.error(respData);
      }
    }
    asyncFetchAccesses();
  }, []);

  return (
    <div className='fixed justify-center items-center bg-gray-500 bg-opacity-60 z-50 w-full inset-0 h-full'>
      <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white shadow-md shadow-blue-300'>
            <div className='flex items-center justify-between p-2 border-b rounded-t'>
              <h3 className='text-lg font-semibold text-gray-900'>
                New vocabulary
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
                  <span className='flex text-center content-center mb-2 text-sm font-medium text-gray-900'>
                    Name
                  </span>
                  <input
                    type='text'
                    className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500'
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

                <div className='col-span-2'>
                  <div>
                    <label className='mb-1 block text-sm font-medium text-gray-700'>
                      Description
                    </label>
                    <textarea
                      id='example2'
                      className='block w-full p-2 resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500'
                      rows={3}
                      maxLength={maxDescriptionLength}
                      onChange={(e) =>
                        setVocab({ ...vocab, description: e.target.value })
                      }
                      placeholder='Leave a description'></textarea>
                    <p className='mt-1 text-sm text-gray-500'>
                      {vocab.description.length}/{maxDescriptionLength}
                    </p>
                  </div>
                </div>

                <div className='col-span-2'>
                  <hr className='my-3 h-px border-0 bg-gray-300' />
                  <span className='flex text-center content-center mb-2 text-sm font-medium text-gray-900'>
                    Access
                  </span>
                  <select
                    id='access'
                    defaultValue='access'
                    onChange={(e) => {
                      setVocab({
                        ...vocab,
                        accessID: accesses.find(
                          (l) => l.name === e.target.value
                        )!.id,
                      });
                    }}
                    className='block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500'>
                    {accesses.map((access) => (
                      <option key={access.id}>{access.name}</option>
                    ))}
                  </select>
                </div>
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
