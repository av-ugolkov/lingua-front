import { useEffect, useState } from 'react';

import WordCard from './WordCard';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { fetchData } from '@/scripts/fetchData';

export interface VocabWord {
  id: string;
  wordID: string;
  wordValue: string;
  wordPronunciation: string;
  translates: string[];
  examples: string[];
  updated: Date;
  created: Date;
}
const tempVocabWords: VocabWord[] = [];
const emptyVocabWord: VocabWord = {
  id: '',
  wordID: '',
  wordValue: '',
  wordPronunciation: '',
  translates: [],
  examples: [],
  updated: new Date(),
  created: new Date(),
};

export default function Words({ vocab_id }: { vocab_id: string }) {
  const [vocabWords, setVocabWords] = useState(tempVocabWords);

  useEffect(() => {
    const abordController = new AbortController();
    refreshToken(abordController.signal, (token) => {
      fetchData(
        '/vocabulary/word/all',
        {
          method: 'get',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
        new Map([['vocab_id', vocab_id]]),
        abordController.signal
      )
        .then(async (response) => {
          if (response.ok) {
            response.data.forEach((item: any) => {
              setVocabWords((vocabWords) => [
                ...vocabWords,
                {
                  id: item['id'],
                  wordID: item['native']['id'],
                  wordValue: item['native']['text'],
                  wordPronunciation: item['native']['pronunciation'] || '',
                  translates: item['translates'] || [],
                  examples: item['examples'] || [],
                  created: new Date(item['created']),
                  updated: new Date(item['updated']),
                },
              ]);
            });
          } else {
            console.error(response.data);
            // notification.value.ErrorNotification(data);
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  }, [vocab_id]);

  return (
    <>
      <WordCard vocabWord={emptyVocabWord} />
      {vocabWords.map((word) => (
        <div
          v-if='
        word.wordValue.toLowerCase().includes(searchStore.trimSpace) ||
        word.translates.some((item) => item.toLowerCase().includes(searchStore.trimSpace))
      '>
          <WordCard vocabWord={word} />
        </div>
      ))}
    </>
  );
}
