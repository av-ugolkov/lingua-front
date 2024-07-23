import { useEffect } from 'react';
import { ILanguage } from '@/hooks/stores/useLanguagesStore';

export default function SelectLanguages({
  title,
  languages,
  onSelect,
}: {
  title: string;
  languages: ILanguage[];
  onSelect: (langCode: string) => void;
}) {
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='col-span-2 sm:col-span-1'>
      <label
        htmlFor={title}
        className='block mb-2 text-sm text-black font-medium'>
        {title}
      </label>
      <select
        id={title}
        typeof='text'
        onChange={(e) => {
          onSelect(languages.find((l) => l.lang === e.target.value)!.code);
        }}
        className='block w-full p-2 text-sm input-vocabulary-form'>
        <option
          disabled
          selected>
          {title}
        </option>
        {languages.map((lang) => (
          <option key={lang.code}>{lang.lang}</option>
        ))}
      </select>
    </div>
  );
}
