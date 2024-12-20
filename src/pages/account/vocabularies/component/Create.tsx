import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { PlusIcon } from '@heroicons/react/24/outline';

import Button from '@/components/elements/Button';
import SelectLanguages from './SelectLanguages';
import api, { AuthStore } from '@/scripts/api';
import CloseBtn from './CloseBtn';
import BgLock from '@/components/elements/BgLock';
import { EmptyVocabulary, VocabularyData } from '@/models/Vocabulary.ts';
import { RootState } from '@/redux/store/store';

export interface IAccess {
  id: number;
  type: string;
  name: string;
}

const tempAccesses: IAccess[] = [];
const maxDescriptionLength = 150;

export default function Create({
  addCallback,
  closeCallback,
}: {
  addCallback: (vocabulary: VocabularyData) => void;
  closeCallback: () => void;
}) {
  const [vocab, setVocab] = useState(EmptyVocabulary);
  const languages = useSelector((state: RootState) => state.langStore.langs);
  const [accesses, setAccesses] = useState(tempAccesses);

  useEffect(() => {
    async function asyncFetchAccesses() {
      const respData = await api.get('/accesses', AuthStore.NO);
      if (respData.ok) {
        const accessesData: IAccess[] = [];
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
    <BgLock>
      <div className='relative bg-white shadow-md shadow-blue-300'>
        <div className='flex items-center justify-between p-2 border-b'>
          <h3 className='text-lg font-semibold ml-2 text-black'>
            New vocabulary
          </h3>
          <CloseBtn closeCallback={closeCallback} />
        </div>

        <form className='p-4'>
          <div className='grid gap-4 mb-4 grid-cols-2'>
            <div className='col-span-2'>
              <span className='flex text-center content-center mb-2 text-sm text-black font-medium'>
                Name
              </span>
              <input
                type='text'
                className='block w-full p-2 text-sm input-form'
                placeholder='Vocabulary name'
                required={true}
                value={vocab.name}
                onChange={(e) => setVocab({ ...vocab, name: e.target.value })}
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
                <label className='mb-1 block text-sm text-black font-medium'>
                  Description
                </label>
                <textarea
                  id='description'
                  className='block w-full p-2 resize-none text-sm input-form'
                  rows={3}
                  maxLength={maxDescriptionLength}
                  onChange={(e) =>
                    setVocab({ ...vocab, description: e.target.value })
                  }
                  placeholder='Leave a description'></textarea>
                <p className='mt-1 text-sm text-black'>
                  {vocab.description.length}/{maxDescriptionLength}
                </p>
              </div>
            </div>
            <div className='col-span-2'>
              <hr className='mb-3 h-px border-0 bg-black' />
              <span className='flex text-center content-center mb-2 text-sm text-black font-medium'>
                Access
              </span>
              <select
                id='access'
                defaultValue='access'
                onChange={(e) => {
                  setVocab({
                    ...vocab,
                    accessID: accesses.find((l) => l.name === e.target.value)!
                      .id,
                  });
                }}
                className='block w-full p-2 border text-sm input-form'>
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
    </BgLock>
  );
}
