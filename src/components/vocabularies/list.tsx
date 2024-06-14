import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Card from './card';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { fetchData } from '@/scripts/fetchData';

interface Vocabulary {
  id: string;
  name: string;
  nativeLang: string;
  translateLang: string;
  tags: string[];
  user_id: string;
}

const initVocabularies: Vocabulary[] = [];

export default function List() {
  const router = useRouter();
  const [vocabularies, setVocabularies] = useState(initVocabularies);

  useEffect(() => {
    const abortController = new AbortController();

    refreshToken(
      abortController.signal,
      (token) => {
        fetchData('/account/vocabularies', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              const temp: Vocabulary[] = [];
              resp.data.forEach((item: any) => {
                temp.push({
                  id: item['id'],
                  name: item['name'],
                  nativeLang: item['native_lang'],
                  translateLang: item['translate_lang'],
                  tags: item['tags'] || [],
                  user_id: item['user_id'],
                });
              });
              setVocabularies([...temp]);
            } else {
              //notification.value.ErrorNotification(data);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      },
      () => {
        // setIsAuth(false);
        // setAccountName('');
        router.push('/');
      }
    );

    return () => {
      abortController.abort();
    };
  }, [router]);

  return (
    <div className='grid gap-10 grid-cols-[repeat(auto-fill,_384px)]'>
      {vocabularies.map((item, _) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          nativeLang={item.nativeLang}
          translateLang={item.translateLang}
        />
      ))}
    </div>
  );
}
