import { fetchData } from '@/scripts/fetch/fetchData';
import { useEffect, useState } from 'react';

interface ILanguage {
  lang: string;
  code: string;
}

const tempLanguage: ILanguage[] = [];

export default function SelectLanguages({ title }: { title: string }) {
  const [languages, setLanguages] = useState(tempLanguage);

  useEffect(() => {
    async function asyncFetchData() {
      const respData = await fetchData('/languages', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (respData.ok) {
        respData.data.forEach((item: any) => {
          setLanguages((prev) => {
            return [
              ...prev,
              {
                lang: item['language'],
                code: item['code'],
              },
            ];
          });
        });
      }
    }

    asyncFetchData();

    return () => {
      document.body.style.overflow = 'auto';
    };

    return () => {};
  }, []);

  return (
    <div className='col-span-2 sm:col-span-1'>
      <label
        htmlFor='category'
        className='block mb-2 text-sm font-medium text-gray-900'>
        {title}
      </label>
      <select
        id='category'
        defaultValue={title}
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
