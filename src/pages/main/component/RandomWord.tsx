import { useAppSelector } from '@/hooks/redux';
import { DictWord } from '@/models/Word';
import { getLang } from '@/redux/languages/slice';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface Props {
  word: DictWord;
}

export default function RandomWord({ word }: Props) {
  const lang = useAppSelector((state) => getLang(state, word.langCode));

  return (
    <div className='items-center justify-center'>
      <div className='flex items-center justify-center gap-x-1'>
        <h3 className='text-3xl font-bold'>{word.text}</h3>
        <a
          href={`https://translate.google.com/?sl=${word.langCode}&text=${word.text}`}
          target='_blank'
          rel='noreferrer'
          className='text-blue-500 hover:underline'>
          <LanguageIcon className='size-8' />
        </a>
      </div>
      <p>Language: {lang}</p>
    </div>
  );
}
