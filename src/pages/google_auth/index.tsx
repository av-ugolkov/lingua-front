import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';

import { toastError } from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';
import { setAccessToken } from '@/scripts/AuthToken';

interface CodeResponse {
  code: string;
  state: string;
  scope: string[];
  authuser: number;
  prompt: string;
}

export default function GoogleAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const authData: CodeResponse = {
    code: queryParameters.get('code') as string,
    state: queryParameters.get('state') as string,
    scope: (queryParameters.get('scope') as string).split(' '),
    authuser: parseInt(queryParameters.get('authuser') as string, 10),
    prompt: queryParameters.get('prompt') as string,
  };

  api
    .post('/auth/google', AuthStore.NO, { body: JSON.stringify(authData) })
    .then((resp) => {
      if (resp.ok) {
        setAccessToken(resp.data['access_token']);
        navigate('/');
      } else {
        navigate('/');
        dispatch(toastError(resp.err));
      }
    });
  return <></>;
}
