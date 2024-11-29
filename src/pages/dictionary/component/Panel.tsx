import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import LanguagesListBox from '@/components/LanguagesListBox';

export default function Panel() {
  return (
    <div className='flex justify-between py-5'>
      <div>
        <SearchInput />
      </div>
      <div>
        <LanguagesListBox />
      </div>
    </div>
  );
}
