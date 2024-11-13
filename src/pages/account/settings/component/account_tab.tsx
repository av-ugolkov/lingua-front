import { useEffect } from 'react';

import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import useFetch from '@/hooks/useFetch';
import { AuthStore, RequestMethod } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toastError } from '@/redux/toasts/slice';
import { Account, setAccount } from '@/redux/settings/slice';

export default function AccountTab() {
  const dispatch = useAppDispatch();
  const { account: accountData } = useAppSelector((state) => state.settings);
  const { isLoading, response: respAccount } = useFetch(
    '/account/settings/account',
    RequestMethod.GET,
    AuthStore.USE
  );

  useEffect(() => {
    if (respAccount.ok) {
      const acc: Account = {
        Nickname: respAccount.data['nickname'],
        Email: respAccount.data['email'],
      };
      dispatch(setAccount(acc));
    } else if (!isLoading) {
      dispatch(toastError(respAccount.data));
    }
  }, [dispatch, respAccount, isLoading]);

  return (
    <>
      <form>
        <InputFieldWithLabel
          id='name'
          label='Nickname'
          value={accountData.Nickname}
          placeholder='Nickname'
          onChange={(value) => {
            console.log(value);
            //setNickname(value);
          }}
          maxLength={50}
        />
        <InputFieldWithLabel
          id='email'
          label='Email'
          value={accountData.Email}
          placeholder='Email'
          type='email'
          onChange={(value) => {
            console.log(value);
            //setEmail(value);
          }}
          maxLength={50}
        />
      </form>
    </>
  );
}
