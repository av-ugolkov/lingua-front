import NotificationBtn from '@/components/elements/Vocabulary/NotificationBtn.tsx';
import { useAppSelector } from '@/hooks/redux';
import { getVocab } from '@/redux/vocabularies/slice';
import { useParams } from 'react-router-dom';

export default function Header() {
  const { id } = useParams();
  const vocab = useAppSelector((state) => getVocab(state, id || ''));

  return (
    <div className='flex justify-between mt-6 mb-2'>
      <h2 className='text-2xl font-bold text-center'>{vocab.name}</h2>
      {!vocab.editable && (
        <div className='flex w-8 items-center'>
          <NotificationBtn
            id={vocab.id}
            notif={vocab.isNotification || false}
          />
        </div>
      )}
    </div>
  );
}
