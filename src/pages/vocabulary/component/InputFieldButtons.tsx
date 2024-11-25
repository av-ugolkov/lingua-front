import {
  ArrowDownCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface Props {
  save?: () => void;
  cancel?: () => void;
  download?: () => void;
}

export default function InputFieldButtons({ save, cancel, download }: Props) {
  return (
    <div className='flex gap-x-1'>
      {save && (
        <CheckCircleIcon
          title='Save'
          className='size-6 text-green-500 duration-200 hover:text-green-400 hover:duration-200'
          onClick={() => {
            save();
          }}
        />
      )}
      {cancel && (
        <XCircleIcon
          title='Cancel'
          className='size-6 text-red-500 duration-200 hover:text-red-400 hover:duration-200'
          onClick={() => {
            cancel();
          }}
        />
      )}
      {download && (
        <ArrowDownCircleIcon
          title='Download'
          className='size-6 text-blue-500 duration-200 hover:text-blue-400 hover:duration-200'
          onClick={() => {
            download();
          }}
        />
      )}
    </div>
  );
}
