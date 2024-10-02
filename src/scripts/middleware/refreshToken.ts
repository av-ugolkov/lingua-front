import api, { AuthStore, IResponseData } from '@/scripts/api';

export const refreshToken = async (): Promise<IResponseData> => {
  const response = await fetchToken();
  return response;
};

async function fetchToken(): Promise<IResponseData> {
  try {
    const response = await api.get('/auth/refresh', AuthStore.USE).fetchFunc();
    if (response.ok) {
      return { ...response, data: response.data['access_token'] };
    }
    return response;
  } catch (error: any) {
    return {
      ok: false,
      status: 0,
      data: error,
    };
  }
}
