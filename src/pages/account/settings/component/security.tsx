import { useEffect, useState } from 'react';

import Button from '@/components/elements/Button';
import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import { useAppDispatch } from '@/hooks/redux';
import { toastError, toastSuccess } from '@/redux/toasts/slice';
import api, { AuthStore } from '@/scripts/api';

let timeout: NodeJS.Timeout;

export default function Security() {
  const dispatch = useAppDispatch();
  const [oldPsw, setOldPsw] = useState('');
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [newPsw, setNewPsw] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  async function getSecurityCode() {
    const resp = await api.post(
      '/account/settings/update_psw_code',
      AuthStore.USE,
      {
        body: JSON.stringify({
          psw: oldPsw,
        }),
      }
    );
    if (resp.ok) {
      setCodeWasSent(true);
      timeout = setTimeout(() => {
        setCodeWasSent(false);
      }, 5 * 60 * 1000);
    } else {
      dispatch(toastError(resp.err));
    }
  }

  async function updatePassword() {
    const resp = await api.post('/account/settings/update_psw', AuthStore.USE, {
      body: JSON.stringify({
        old_psw: oldPsw,
        new_psw: newPsw,
        code: securityCode,
      }),
    });
    if (resp.ok) {
      dispatch(toastSuccess('Password updated'));
      setOldPsw('');
    } else {
      dispatch(toastError(resp.err));
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(timeout);
    };
  }, [codeWasSent]);

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
        />
        <div>
          <Button
            bgColor='bg-indigo-600'
            hoverBgColor='hover:bg-indigo-500'
            focusOutlineColor='focus-visible:outline-indigo-600'
            disabledColor='disabled:bg-indigo-400'
            callback={getSecurityCode}
            disabled={oldPsw.length === 0 || codeWasSent}>
            Get Security Code
          </Button>
        </div>
        {codeWasSent && (
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
              value={securityCode}
              type='text'
              autoFill='off'
              placeholder='Security Code'
              maxLength={10}
              onChange={(value) => {
                setSecurityCode(value);
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
