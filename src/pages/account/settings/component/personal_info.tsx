import { useState } from 'react';

import InputFieldWithLabel from '@/components/elements/InputFieldWithLabel';

export default function PersonalInfo() {
  const [name, setName] = useState('name');
  const [surname, setSurname] = useState('surname');
  return (
    <>
      <form>
        <InputFieldWithLabel
          id='name'
          label='Your name'
          value={name}
          placeholder='Name'
          onChange={(value) => {
            setName(value);
          }}
          maxLength={50}
        />
        <InputFieldWithLabel
          id='surname'
          label='Your surname'
          value={surname}
          placeholder='Surname'
          type='text'
          onChange={(value) => {
            setSurname(value);
          }}
          maxLength={50}
        />
      </form>
    </>
  );
}
