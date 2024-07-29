import { useEffect, useState } from 'react';

import {
  ChevronDoubleRightIcon,
  TrashIcon,
  PencilIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';

import {
  useVocabulariesStore,
  VocabularyState,
} from '@/hooks/stores/useVocabulariesStore';
import DropdownMenu from '../elements/Dropdown/DropdownMenu';
import DropdownItem from '../elements/Dropdown/Item';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import Edit, { IEditData } from './Edit';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';

const CountRequestWords = '10';

interface IWord {
  value: string;
  pronunciation: string;
}
const Words: IWord[] = [];

export default function Card({
  vocab,
  onClick,
}: {
  vocab: VocabularyState;
  onClick: () => void;
}) {
  const [vocabData, setVocabData] = useState(vocab);
  const [words, setWords] = useState(Words);
  const [loading, setLoading] = useState(true);
  const [isShowRenamePopup, setIsShowRenamePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();
  const { languages, fetchLanguages } = useLanguagesStore();

  const { funcFetch: fetchRandomWords } = useFetch(
    '/vocabulary/words/random',
    RequestMethod.GET,
    AuthStore.USE
  );
  const { funcFetch: fetchEditVocabulary } = useFetch(
    `/account/vocabulary`,
    RequestMethod.PUT,
    AuthStore.USE
  );
  const { funcFetch: fetchDeleteVocabulary } = useFetch(
    `/account/vocabulary`,
    RequestMethod.DELETE,
    AuthStore.USE
  );

  function renameVocabulary(editData: IEditData) {
    async function asyncRenameVocabulary() {
      const response = await fetchEditVocabulary({
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
      const response = await fetchDeleteVocabulary({
        queries: new Map<string, string>([['name', vocabData.name]]),
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
    if (languages.size === 0) {
      fetchLanguages();
    }
  }, [languages]);

  useEffect(() => {
    async function asyncFetchRandomWords() {
      const response = await fetchRandomWords({
        queries: new Map([
          ['vocab_id', vocab.id],
          ['limit', CountRequestWords],
        ]),
      });
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
      } else {
        console.error(response.data);
      }
      setLoading(false);
    }

    asyncFetchRandomWords();

    return () => {
      setWords([]);
    };
  }, [vocab.id]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <div className='flex flex-col bg-blue-100 w-96 min-w-96 h-96 shadow-md shadow-blue-300 text-center'>
        <div className='flex align-middle justify-center'>
          <div className='flex min-w-7 h-10 my-1 justify-center items-center'>
            {vocab.accessID === 0 ? (
              <LockClosedIcon className='size-5 text-red-500' />
            ) : vocab.accessID === 1 ? (
              <LockOpenIcon className='size-5 text-yellow-500' />
            ) : (
              vocab.accessID === 2 && (
                <LockOpenIcon className='size-5 text-green-500' />
              )
            )}
          </div>
          <div className='inline-block w-full cursor-default bg-transparent h-10 text-center font-semibold content-center text-xl my-1 border-b-2 border-black'>
            {vocabData.name}
          </div>
          <DropdownMenu>
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
          <ChevronDoubleRightIcon className={'flex size-5'} />
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
          editData={{ name: vocab.name, accessID: vocab.accessID }}
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
