import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  download?: () => void;
}

export default function InputFieldButtons({ download }: Props) {
  return (
    <>
      {download && (
        <ArrowDownCircleIcon
          title='Download'
          className='size-6 text-blue-500 duration-200 hover:text-blue-400 hover:duration-200'
          onClick={() => {
            download();
          }}
        />
      )}
    </>
  );
}
