import { useState } from 'react';

import Button from '@/components/elements/Button';
import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import { useAppDispatch } from '@/hooks/redux';
import {
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
} from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';

export default function Security() {
  const dispatch = useAppDispatch();
  const [oldPsw, setOldPsw] = useState('');
  const [editPsw, setEditPsw] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [newPsw, setNewPsw] = useState('');
  const [code, setCode] = useState('');

  function resetPswInput(ttl: number) {
    setTimeout(() => {
      setSendingCode(false);
      setOldPsw('');
      setNewPsw('');
      setCode('');
    }, ttl);
  }

  async function getSecurityCode() {
    setSendingCode(true);
    const resp = await api.post(
      '/account/settings/update_psw_code',
      AuthStore.USE,
      {
        body: JSON.stringify({
          old_psw: oldPsw,
        }),
      }
    );
    if (resp.ok) {
      setEditPsw(true);
      resetPswInput(300000);
      dispatch(toastInfo(resp.data['msg']));
    } else {
      if (resp.status === 409) {
        resetPswInput(resp.data['ttl']);
        setEditPsw(true);
        dispatch(toastWarning(resp.err));
      } else {
        dispatch(toastError(resp.err));
      }
    }
  }

  async function updatePassword() {
    const resp = await api.post('/account/settings/update_psw', AuthStore.USE, {
      body: JSON.stringify({
        old_psw: oldPsw,
        new_psw: newPsw,
        code: code,
      }),
    });
    if (resp.ok) {
      setEditPsw(false);
      dispatch(toastSuccess('Password updated'));
      setOldPsw('');
      setNewPsw('');
      setCode('');
      setSendingCode(false);
    } else {
      dispatch(toastError(resp.err));
    }
  }

  return (
    <>
      <form className=''>
        <InputFieldWithLabel
          id='old_password'
          label='Old Password'
          value={oldPsw}
          type='password'
          autoFill='password'
          placeholder='Old Password'
          maxLength={50}
          onChange={(value) => {
            setOldPsw(value);
          }}
          disabled={editPsw}
        />
        {!editPsw ? (
          <div>
            <Button
              bgColor='bg-indigo-600'
              hoverBgColor='hover:bg-indigo-500'
              focusOutlineColor='focus-visible:outline-indigo-600'
              disabledColor='disabled:bg-zinc-400'
              callback={getSecurityCode}
              disabled={oldPsw.length === 0 || sendingCode}
              children={sendingCode ? 'Sending code...' : 'Change password'}
            />
          </div>
        ) : (
          <>
            <InputFieldWithLabel
              id='new_password'
              label='New Password'
              value={newPsw}
              type='password'
              autoFill='password'
              placeholder='New Password'
              maxLength={50}
              onChange={(value) => {
                setNewPsw(value);
              }}
            />
            <InputFieldWithLabel
              id='security_code'
              label='Security Code'
              value={code}
              type='text'
              autoFill='off'
              placeholder='Security Code'
              maxLength={10}
              onChange={(value) => {
                setCode(value);
              }}
            />
            <div>
              <Button
                bgColor='bg-indigo-600'
                hoverBgColor='hover:bg-indigo-500'
                focusOutlineColor='focus-visible:outline-indigo-600'
                disabledColor='disabled:bg-indigo-400'
                callback={updatePassword}
                disabled={oldPsw.length === 0}>
                Update password
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
