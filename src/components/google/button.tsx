import { useAppDispatch } from '@/hooks/redux';

import { toastError } from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';

export default function GoogleButton() {
  const dispatch = useAppDispatch();

  function googleLogin() {
    api.get('/auth/google', AuthStore.NO).then((resp) => {
      if (resp.ok) {
        window.location.href = resp.data['url'];
      } else {
        dispatch(toastError(resp.err));
      }
    });
  }

  return (
    <div className='flex justify-center'>
      <button
        className='border-solid size-10 border-[1px] rounded bg-white border-gray-300 duration-200 hover:duration-200 hover:bg-blue-50'
        onClick={googleLogin}>
        <img
          className='flex p-1'
          src='/google.svg'
          alt='linkedin'></img>
      </button>
    </div>
  );
}
