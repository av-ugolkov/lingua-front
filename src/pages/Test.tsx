import Button from '@/components/elements/Button';
import api, { AuthStore } from '@/scripts/api';

export default function Test() {
  return (
    <div>
      <Button
        bgColor='bg-indigo-600'
        hoverBgColor='hover:bg-indigo-500'
        focusOutlineColor='focus-visible:outline-indigo-600'
        callback={() => {
          async function asyncRandomWord() {
            console.log(new Date().toLocaleString());
            const respRandomWord = await api
              .get('/test', AuthStore.NO)
              .fetchFunc();

            console.log(new Date().toLocaleString(), respRandomWord);
          }
          for (let i = 0; i < 100; i++) {
            asyncRandomWord();
          }
        }}>
        Test
      </Button>
    </div>
  );
}
