import { useEffect } from 'react';
import { ILanguage } from './Create';

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
        className='block mb-2 text-sm font-medium text-gray-900'>
        {title}
      </label>
      <select
        id={title}
        defaultValue={title}
        onChange={(e) => {
          onSelect(languages.find((l) => l.lang === e.target.value)!.code);
        }}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'>
        <option
          disabled
          value={title}>
          {title}
        </option>
        {languages.map((lang) => (
          <option key={lang.code}>{lang.lang}</option>
        ))}
      </select>
    </div>
  );
}
