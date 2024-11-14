import { useEffect, useState } from 'react';

import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import useFetch from '@/hooks/useFetch';
import api, { AuthStore, RequestMethod } from '@/scripts/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toastError, toastInfo, toastWarning } from '@/redux/toasts/slice';
import { Account, setAccount } from '@/redux/settings/slice';
import Button from '@/components/elements/Button';

export default function AccountTab() {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState('');
  const [editNickname, setEditNickname] = useState(false);

  const [email, setEmail] = useState('');
  const [editEmail, setEditEmail] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [code, setCode] = useState('');

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
      setNickname(acc.Nickname);
      setEmail(acc.Email);
      dispatch(setAccount(acc));
    } else if (!isLoading) {
      dispatch(toastError(respAccount.err));
    }
  }, [dispatch, respAccount, isLoading]);

  async function saveNickname() {
    const resp = await api.post(
      '/account/settings/update_nickname',
      AuthStore.USE,
      {
        body: JSON.stringify({
          nickname: nickname,
        }),
      }
    );
    if (resp.ok) {
      setEditNickname(false);
      dispatch(setAccount({ ...accountData, Nickname: nickname }));
    } else {
      dispatch(toastError(resp.err));
    }
  }

  function resetEmailInput(ttl: number) {
    setTimeout(() => {
      setEditEmail(false);
      setEmail(accountData.Email);
      setCode('');
    }, ttl);
  }

  async function sendCodeForEmail() {
    setSendingCode(true);
    const resp = await api.post(
      '/account/settings/update_email_code',
      AuthStore.USE,
      {}
    );
    if (resp.ok) {
      resetEmailInput(300000);
      setEditEmail(true);
      dispatch(toastInfo(resp.data['msg']));
    } else {
      if (resp.status === 409) {
        resetEmailInput(resp.data['ttl']);
        setEditEmail(true);
        dispatch(toastWarning(resp.err));
      } else {
        dispatch(toastError(resp.err));
      }
    }
    setSendingCode(false);
  }

  async function saveEmail() {
    const resp = await api.post(
      '/account/settings/update_email',
      AuthStore.USE,
      {
        body: JSON.stringify({
          new_email: email,
          code: code,
        }),
      }
    );
    if (resp.ok) {
      setEditEmail(false);
      dispatch(setAccount({ ...accountData, Email: email }));
    } else {
      dispatch(toastError(resp.err));
    }
  }

  return (
    <>
      <form>
        <div>
          <InputFieldWithLabel
            id='name'
            label='Nickname'
            value={nickname}
            placeholder='Nickname'
            onChange={setNickname}
            maxLength={50}
            disabled={!editNickname}
          />
          {!editNickname ? (
            <Button
              bgColor='bg-indigo-500'
              hoverBgColor='hover:bg-indigo-400'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={() => setEditNickname(true)}
              children='Change nickname'
            />
          ) : (
            <div className='flex gap-x-2'>
              <Button
                bgColor='bg-indigo-500'
                hoverBgColor='hover:bg-indigo-400'
                focusOutlineColor='focus-visible:outline-indigo-600'
                disabledColor='disabled:bg-gray-400'
                callback={saveNickname}
                disabled={nickname === accountData.Nickname}
                children='Save nickname'
              />
              <Button
                bgColor='bg-zinc-500'
                hoverBgColor='hover:bg-zinc-400'
                focusOutlineColor='focus-visible:outline-zinc-600'
                callback={() => {
                  setEditNickname(false);
                  setNickname(accountData.Nickname);
                }}
                children='Cancel'
              />
            </div>
          )}
        </div>
        <div>
          <InputFieldWithLabel
            id='email'
            label='Email'
            value={email}
            placeholder='Email'
            type='email'
            onChange={setEmail}
            maxLength={50}
            disabled={!editEmail}
          />
          {!editEmail ? (
            <Button
              bgColor='bg-indigo-500'
              hoverBgColor='hover:bg-indigo-400'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={sendCodeForEmail}
              disabled={sendingCode}
              children={sendingCode ? 'Sending code...' : 'Change email'}
            />
          ) : (
            <div>
              <InputFieldWithLabel
                id='code'
                label='Code'
                value={code}
                placeholder='Code'
                onChange={setCode}
                maxLength={50}
              />
              <div className='flex gap-x-2'>
                <Button
                  bgColor='bg-indigo-500'
                  hoverBgColor='hover:bg-indigo-400'
                  focusOutlineColor='focus-visible:outline-indigo-600'
                  disabledColor='disabled:bg-gray-400'
                  callback={saveEmail}
                  disabled={email === accountData.Email || code === ''}
                  children='Save email'
                />
                <Button
                  bgColor='bg-zinc-500'
                  hoverBgColor='hover:bg-zinc-400'
                  focusOutlineColor='focus-visible:outline-zinc-600'
                  callback={() => setEditEmail(false)}
                  children='Cancel'
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
