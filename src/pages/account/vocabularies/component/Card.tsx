import { useEffect, useMemo, useState } from 'react';

import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import ArrowBothSide from '@/assets/ArrowBothSide';

import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';
import DropdownMenu from '../../../../components/elements/Dropdown/DropdownMenu';
import DropdownItem from '../../../../components/elements/Dropdown/Item';
import Edit, { IEditData } from './Edit';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';
import LockItem from '../../../../components/elements/LockItem';
import { VocabularyData } from '@/models/Vocabulary.ts';
import api, { AuthStore, IQueryType, RequestMethod } from '@/scripts/api';
import useFetch from '@/hooks/useFetch';

const CountRequestWords = '8';

interface IWord {
  value: string;
  pronunciation: string;
}
const Words: IWord[] = [];

export default function Card({
  vocab,
  onClick,
}: {
  vocab: VocabularyData;
  onClick: () => void;
}) {
  const [vocabData, setVocabData] = useState(vocab);
  const [words, setWords] = useState(Words);
  const [isShowRenamePopup, setIsShowRenamePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();
  const { languages } = useLanguagesStore();

  const query = useMemo<IQueryType>(
    () => [
      ['id', vocab.id],
      ['limit', `${CountRequestWords}`],
    ],
    [vocab.id]
  );

  const { isLoading, response } = useFetch(
    '/vocabulary/words/random',
    RequestMethod.GET,
    AuthStore.USE,
    {
      query: query,
    }
  );

  function renameVocabulary(editData: IEditData) {
    async function asyncRenameVocabulary() {
      const response = await api.put(`/account/vocabulary`, AuthStore.USE, {
        body: JSON.stringify({
          id: vocab.id,
          name: editData.name,
          access_id: editData.accessID,
        }),
      });
      if (response.ok) {
        setVocabData({
          ...vocabData,
          name: editData.name,
          accessID: editData.accessID,
        });
        vocab.name = editData.name;
        vocab.accessID = editData.accessID;
      } else {
        console.error(response);
      }
    }

    asyncRenameVocabulary();
  }

  function deleteVocabulary() {
    async function asyncDeleteVocabulary() {
      const response = await api.delete(`/account/vocabulary`, AuthStore.USE, {
        query: [['name', vocabData.name]],
      });
      if (response.ok) {
        vocabulariesStore.removeVocabulary(vocab.id);
      } else {
        console.error(response);
      }
    }

    asyncDeleteVocabulary();
  }

  useEffect(() => {
    if (response.ok) {
      response.data.forEach((item: any) => {
        setWords((words) => [
          ...words,
          {
            value: item['native']['text'],
            pronunciation: item['native']['pronunciation'],
          },
        ]);
      });
    }

    return () => {
      setWords([]);
    };
  }, [response]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <div className='flex flex-col bg-blue-100 w-96 min-w-96 h-96 shadow-md shadow-blue-300 text-center'>
        <div className='flex align-middle justify-center'>
          <div className='flex min-w-7 h-10 my-1 justify-center items-center'>
            <LockItem
              size={5}
              accessID={vocab.accessID}
            />
          </div>
          <div className='inline-block w-full cursor-default bg-transparent h-10 text-center font-semibold content-center text-xl my-1 border-b-2 border-black'>
            {vocabData.name}
          </div>
          <DropdownMenu baseSize='w-7 h-10'>
            <DropdownItem onClick={() => setIsShowRenamePopup(true)}>
              Edit
              <PencilIcon className='size-5' />
            </DropdownItem>
            <DropdownItem onClick={deleteVocabulary}>
              Delete
              <TrashIcon className='size-5' />
            </DropdownItem>
          </DropdownMenu>
        </div>

        <div className='flex justify-center items-center mt-1 gap-x-2'>
          <span>{languages.get(vocab.nativeLang)}</span>
          <ArrowBothSide className={'flex size-5'} />
          <span>{languages.get(vocab.translateLang)}</span>
        </div>
        <div
          className='flex relative w-96 h-80'
          onClick={onClick}>
          <div className='mx-auto no-underline w-96 text-xs pt-1'>
            {words.map((word, key) => (
              <div
                className='block pb-1 text-black whitespace-nowrap no-underline overflow-hidden text-ellipsis'
                key={key}>
                <div>{word.value}</div>
                <div className='font-weight-300'>{word.pronunciation}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isShowRenamePopup && (
        <Edit
          editData={{
            name: vocab.name,
            description: vocab.description,
            accessID: vocab.accessID,
          }}
          saveCallback={(editData) => {
            renameVocabulary(editData);
            setIsShowRenamePopup(false);
          }}
          cancelCallback={() => setIsShowRenamePopup(false)}
        />
      )}
    </>
  );
}
