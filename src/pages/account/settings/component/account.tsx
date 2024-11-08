import { useState } from 'react';

import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';

export default function Account() {
  const [name, setName] = useState('test');
  const [email, setEmail] = useState('test@test.com');

  return (
    <>
      <form>
        <InputFieldWithLabel
          id='name'
          label='Account name'
          value={name}
          placeholder='Name'
          onChange={(value) => {
            setName(value);
          }}
          maxLength={50}
        />
        <InputFieldWithLabel
          id='email'
          label='Email'
          value={email}
          placeholder='Email'
          type='email'
          onChange={(value) => {
            setEmail(value);
          }}
          maxLength={50}
        />
      </form>
    </>
  );
}
