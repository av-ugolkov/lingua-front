import {
  ChevronDoubleRightIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import DropdownMenu from '../elements/Dropdown/Menu';
import DropdownItem from '../elements/Dropdown/Item';

export default function Card({
  title,
  nativeLang,
  translateLang,
  onClick,
}: {
  title: string;
  nativeLang: string;
  translateLang: string;
  onClick: () => void;
}) {
  return (
    <div className='flex flex-col bg-gray-300 w-96 min-w-96 h-96 shadow-md shadow-blue-300 text-center'>
      <div className='flex align-middle justify-center'>
        <div className='inline-block w-full cursor-default bg-gray-300 h-10 text-center font-semibold content-center text-xl ml-7 my-1 border-b-2 border-black'>
          {title}
        </div>
        <DropdownMenu>
          <DropdownItem disable>
            Share
            <ShareIcon className='size-5' />
          </DropdownItem>
          <DropdownItem disable>
            Copy <DocumentDuplicateIcon className='size-5 ' />
          </DropdownItem>
          <DropdownItem>
            Delete
            <TrashIcon className='size-5' />
          </DropdownItem>
        </DropdownMenu>
      </div>

      <div className='flex justify-center items-center mt-1 gap-x-2'>
        <label>{nativeLang}</label>
        <ChevronDoubleRightIcon className={'flex size-5'} />
        <label>{translateLang}</label>
      </div>
      <div
        className='flex relative w-96 h-80'
        onClick={onClick}>
        {/* {words.map((word, key) => (
          <div
            className='item'
            key={key}>
            <div>{word}</div>
            <div className='font-weight-300'>{word.pronunciation}</div>
          </div>
        ))} */}
      </div>
    </div>
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
