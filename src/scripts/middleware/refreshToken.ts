import { IResponseData, fetchData } from '@/scripts/fetch/fetchData';

export const refreshToken = async (): Promise<IResponseData> => {
  const response = await fetchToken();
  return response;
};

async function fetchToken(): Promise<IResponseData> {
  try {
    const response = await fetchData('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
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
