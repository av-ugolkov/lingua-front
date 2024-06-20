import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './card';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { fetchData } from '@/scripts/fetchData';
import { useVocabulariesStore } from '@/stores/vocabularies';

export default function List() {
  const navigate = useNavigate();
  const vocabularies = useVocabulariesStore();

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
              resp.data.forEach((item: any) => {
                vocabularies.addVocabulary({
                  id: item['id'],
                  name: item['name'],
                  nativeLang: item['native_lang'],
                  translateLang: item['translate_lang'],
                  tags: item['tags'] || [],
                  userId: item['user_id'],
                });
              });
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
        navigate('/');
      }
    );

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className='grid gap-10 grid-cols-[repeat(auto-fill,_384px)]'>
      {vocabularies.vocabularies.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.name}
          nativeLang={item.nativeLang}
          translateLang={item.translateLang}
          onClick={() => {
            navigate(`/vocabulary/${item.name}`);
          }}
        />
      ))}
    </div>
  );
}
