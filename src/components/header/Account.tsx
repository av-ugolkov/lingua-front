import HeaderBtn from './HeaderBtn';
import Avatar from './Avatar';

export default function Account({
  isAuth,
  accountName,
}: {
  isAuth: boolean;
  accountName: string;
}) {
  return (
    <>
      {isAuth ? (
        <div className='flex items-center'>
          <HeaderBtn
            name='My vocabularies'
            url='/vocabularies'
          />
          <Avatar
            name={accountName}
            className='ml-2'
            callback={() => {}}
          />
        </div>
      ) : (
        <div className='flex'>
          <HeaderBtn
            name='Sign Up'
            url='/sign_up'
          />
          <HeaderBtn
            name='Sign In'
            url='/sign_in'
          />
        </div>
      )}
    </>
  );
}
