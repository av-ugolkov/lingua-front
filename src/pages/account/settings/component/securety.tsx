import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';
import { useState } from 'react';

export default function Securety() {
  const [password, setPassword] = useState('');

  return (
    <>
      <form className=''>
        <InputFieldWithLabel
          id='password'
          label='Password'
          value={password}
          type='password'
          autoFill='off'
          placeholder='Password'
          maxLength={50}
          onChange={(value) => {
            setPassword(value);
          }}
        />
      </form>
    </>
  );
}
