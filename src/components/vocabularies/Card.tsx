import { useEffect, useState } from 'react';

import {
  ChevronDoubleRightIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

import DropdownMenu from '../elements/Dropdown/DropdownMenu';
import DropdownItem from '../elements/Dropdown/Item';
import {
  RequestMethod,
  useFetchWithToken,
} from '@/hooks/fetch/useFetchWithToken';
import Rename from './Rename';
import { useVocabulariesStore } from '@/hooks/stores/useVocabulariesStore';

const CountRequestWords = '10';

interface IWord {
  value: string;
  pronunciation: string;
}
const Words: IWord[] = [];

export default function Card({
  id,
  title,
  nativeLang,
  translateLang,
  onClick,
}: {
  id: string;
  title: string;
  nativeLang: string;
  translateLang: string;
  onClick: () => void;
}) {
  const [name, setName] = useState(title);
  const [words, setWords] = useState(Words);
  const [loading, setLoading] = useState(true);
  const [isShowRenamePopup, setIsShowRenamePopup] = useState(false);
  const vocabulariesStore = useVocabulariesStore();

  const { funcFetch: fetchRandomWords } = useFetchWithToken(
    '/vocabulary/words/random',
    RequestMethod.GET
  );
  const { funcFetch: fetchRenameVocabulary } = useFetchWithToken(
    `/account/vocabulary`,
    RequestMethod.PUT
  );
  const { funcFetch: fetchDeleteVocabulary } = useFetchWithToken(
    `/account/vocabulary`,
    RequestMethod.DELETE
  );

  function renameVocabulary(newName: string) {
    async function asyncRenameVocabulary() {
      const response = await fetchRenameVocabulary({
        queries: new Map([
          ['id', id],
          ['name', newName],
        ]),
      });
      if (response.ok) {
        setName(newName);
      } else {
        console.error(response);
      }
    }

    asyncRenameVocabulary();
  }

  function deleteVocabulary() {
    async function asyncDeleteVocabulary() {
      const response = await fetchDeleteVocabulary({
        queries: new Map<string, string>([['name', name]]),
      });
      if (response.ok) {
        vocabulariesStore.removeVocabulary(id);
      } else {
        console.error(response);
      }
    }

    asyncDeleteVocabulary();
  }

  useEffect(() => {
    async function asyncFetchRandomWords() {
      const response = await fetchRandomWords({
        queries: new Map([
          ['vocab_id', id],
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
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <div className='flex flex-col bg-gray-300 w-96 min-w-96 h-96 shadow-md shadow-blue-300 text-center'>
        <div className='flex align-middle justify-center'>
          <div className='inline-block w-full cursor-default bg-gray-300 h-10 text-center font-semibold content-center text-xl ml-7 my-1 border-b-2 border-black'>
            {name}
          </div>
          <DropdownMenu>
            <DropdownItem onClick={() => setIsShowRenamePopup(true)}>
              Edit
              <PencilIcon className='size-5' />
            </DropdownItem>
            <DropdownItem disable>
              Share
              <ShareIcon className='size-5' />
            </DropdownItem>
            <DropdownItem disable>
              Copy <DocumentDuplicateIcon className='size-5 ' />
            </DropdownItem>
            <DropdownItem onClick={deleteVocabulary}>
              Delete
              <TrashIcon className='size-5' />
            </DropdownItem>
          </DropdownMenu>
        </div>

        <div className='flex justify-center items-center mt-1 gap-x-2'>
          <span>{nativeLang}</span>
          <ChevronDoubleRightIcon className={'flex size-5'} />
          <span>{translateLang}</span>
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
        <Rename
          name={title}
          saveCallback={(newName) => {
            renameVocabulary(newName);
            setIsShowRenamePopup(false);
          }}
          cancelCallback={() => setIsShowRenamePopup(false)}
        />
      )}
    </>
  );
}
/*
function renameVocabulary(id: string, vocabularyName: string) {
  const abortController = new AbortController();

  refreshToken(
    abortController.signal,
    (token) => {
      fetchData(
        '/account/vocabulary',
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ id: id }),
        },
        new Map<string, string>([['name', vocabularyName]])
      )
        .then((response) => {
          console.log(response);
          // notification.value.SuccessNotification('Success');
        })
        .catch((error) => {
          // notification.value.ErrorNotification(data);
          console.error(error.message);
        });
    },
    () => {
      // setIsAuth(false);
      // setAccountName('');
      // router.push('/');
    }
  );
}
*/
