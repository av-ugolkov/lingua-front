import Button from '@/components/elements/Button';
import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import api, { AuthStore } from '@/scripts/api';
import { useEffect, useState } from 'react';

let timeout: NodeJS.Timeout;

export default function Security() {
  const [oldPassword, setOldPassword] = useState('');
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  async function getSecurityCode() {
    const resp = await api.post(
      '/account/settings/security_code',
      AuthStore.USE,
      {
        body: JSON.stringify({
          data: oldPassword,
          type: 'change_password',
        }),
      }
    );
    if (resp.ok) {
      setCodeWasSent(true);
      timeout = setTimeout(() => {
        setCodeWasSent(false);
      }, 5 * 60 * 1000);
    }
  }

  async function updatePassword() {
    const resp = await api.post(
      '/account/settings/update_password',
      AuthStore.USE,
      {
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          security_code: securityCode,
        }),
      }
    );
    if (resp.ok) {
      setCodeWasSent(true);
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
          value={oldPassword}
          type='password'
          autoFill='password'
          placeholder='Old Password'
          maxLength={50}
          onChange={(value) => {
            setOldPassword(value);
          }}
        />
        <div>
          <Button
            bgColor='bg-indigo-600'
            hoverBgColor='hover:bg-indigo-500'
            focusOutlineColor='focus-visible:outline-indigo-600'
            disabledColor='disabled:bg-indigo-400'
            callback={getSecurityCode}
            disabled={oldPassword.length === 0 || codeWasSent}>
            Get Security Code
          </Button>
        </div>
        {codeWasSent && (
          <>
            <InputFieldWithLabel
              id='new_password'
              label='New Password'
              value={newPassword}
              type='password'
              autoFill='password'
              placeholder='New Password'
              maxLength={50}
              onChange={(value) => {
                setNewPassword(value);
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
                disabled={oldPassword.length === 0}>
                Update password
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
