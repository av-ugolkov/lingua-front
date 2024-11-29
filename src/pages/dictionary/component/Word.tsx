import { DictWord } from '@/models/Word';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface Props {
  word: DictWord;
}

function getNickname(nickname: string): string {
  if (!nickname) {
    return '';
  }
  return `@${nickname}`;
}

function getPronunciation(pronunciation: string): string {
  if (!pronunciation) {
    return '';
  }
  if (!pronunciation.startsWith('[')) {
    pronunciation = `[${pronunciation}`;
  }
  if (!pronunciation.endsWith(']')) {
    pronunciation = `${pronunciation}]`;
  }

  return pronunciation;
}

export default function Word({ word }: Props) {
  return (
    <div className='flex px-4 py-1 items-center justify-between bg-white shadow shadow-blue-300'>
      <div className='flex items-center gap-x-1 text-gray-600'>
        <h3 className='text-lg font-bold text-black break-all'>{word.text}</h3>
        <a
          href={`https://translate.google.com/?sl=${word.langCode}&text=${word.text}`}
          target='_blank'
          rel='noreferrer'
          className='text-blue-500 hover:underline'>
          <LanguageIcon className='size-5' />
        </a>
        {getPronunciation(word.pronunciation)}
      </div>
      <div className='text-sm text-gray-500'>{getNickname(word.creator)}</div>
    </div>
  );
}
