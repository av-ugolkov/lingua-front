import Avatar from './Avatar';
import { useState } from 'react';
import Menu from './Menu';

export default function Account({ accountName }: { accountName: string }) {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <>
      <div className='flex items-center'>
        <Avatar
          name={accountName}
          className='ml-2'
          callback={() => setIsShowMenu(!isShowMenu)}
        />
      </div>
      {isShowMenu && <Menu />}
    </>
  );
}
