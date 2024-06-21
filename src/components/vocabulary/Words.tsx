import WordCard from './WordCard';
import useVocabWordsStore, {
  EmptyWord,
  vocabWordsStore,
} from '@/stores/useVocabWordsStore';

export default function Words({ vocab_id }: { vocab_id: string }) {
  useVocabWordsStore({ vocab_id });
  const vocabWords = vocabWordsStore((state) => state.words);
  return (
    <>
      <WordCard vocabWord={EmptyWord} />
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
