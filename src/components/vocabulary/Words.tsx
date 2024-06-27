import WordCard from './WordCard';
import { EmptyWord, useVocabWordsStore } from '@/stores/useVocabWordsStore';
import { useSearchWordStore } from '@/stores/useSearchWordStore';

export default function Words() {
  const vocabWordsStore = useVocabWordsStore();
  const searchWordStore = useSearchWordStore();

  return (
    <>
      <WordCard vocabWord={EmptyWord} />
      {vocabWordsStore.words
        .filter((word) => {
          return (
            word.wordValue.toLowerCase().includes(searchWordStore.searchWord) ||
            word.translates.some((item) =>
              item.toLowerCase().includes(searchWordStore.searchWord)
            )
          );
        })
        .map((word) => (
          <div key={word.id}>
            <WordCard vocabWord={word} />
          </div>
        ))}
    </>
  );
}
