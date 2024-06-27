import WordCard from './WordCard';
import { EmptyWord, useVocabWordsStore } from '@/stores/useVocabWordsStore';
import { useSearchWordStore } from '@/stores/useSearchWordStore';
import { useSortedWordsStore } from '@/stores/useSortedWordsStore';

export default function Words() {
  const vocabWordsStore = useVocabWordsStore();
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();

  return (
    <>
      <WordCard vocabWord={EmptyWord} />
      {vocabWordsStore
        .getOrderedWords(sortedWordsStore.orderType)
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
