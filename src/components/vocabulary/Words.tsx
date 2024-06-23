import WordCard from './WordCard';
import {
  EmptyWord,
  useVocabWords,
  useVocabWordsStore,
} from '@/stores/useVocabWordsStore';

export default function Words({ vocab_id }: { vocab_id: string }) {
  useVocabWords({ vocab_id });
  const vocabWords = useVocabWordsStore((state) => state.words);
  return (
    <>
      <WordCard vocabWord={EmptyWord} />
      {vocabWords.map((word) => (
        <div>
          <WordCard vocabWord={word} />
        </div>
      ))}
    </>
  );
}
