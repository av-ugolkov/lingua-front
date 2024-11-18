import { useAppDispatch } from '@/hooks/redux';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';

import { toastError, toastSuccess } from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';

export default function GoogleButton() {
  const dispatch = useAppDispatch();

  const responseMessage = (response: CodeResponse) => {
    async function asyncLogin() {
      console.log(response.code);
      const resp = await api.post('/auth/google', AuthStore.NO, {
        body: JSON.stringify({
          token: response.code,
        }),
      });

      if (resp.ok) {
        dispatch(toastSuccess(resp.data));
      } else {
        dispatch(toastError(resp.err));
      }
    }

    asyncLogin();
  };

  const errorMessage = () => {
    console.log('Login failed');
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse: CodeResponse) => responseMessage(tokenResponse),
    onError: () => errorMessage(),
  });

  return (
    <div className='flex justify-center'>
      <button
        className='border-solid size-10 border-[1px] rounded bg-white border-gray-300 duration-200 hover:duration-200 hover:bg-blue-50'
        onClick={() => googleLogin()}>
        <img
          className='flex p-1'
          src='/google.svg'
          alt='linkedin'></img>
      </button>
    </div>
  );
}
