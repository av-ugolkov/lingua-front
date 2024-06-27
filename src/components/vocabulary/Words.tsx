import WordCard from './WordCard';
import { EmptyWord, useVocabWordsStore } from '@/stores/useVocabWordsStore';

export default function Words() {
  const vocabWords = useVocabWordsStore();

  return (
    <>
      <WordCard vocabWord={EmptyWord} />
      {vocabWords.words.map((word) => (
        <div key={word.id}>
          <WordCard vocabWord={word} />
        </div>
      ))}
    </>
  );
}
