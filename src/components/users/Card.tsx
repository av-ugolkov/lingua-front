import { IUser } from '@/pages/Users';
import Avatar from '../header/Avatar';
import Button from '../elements/Button';
import VocabTag from './VocabTag';

export default function Card(user: IUser) {
  return (
    <>
      <div className='flex flex-row h-fit p-5 my-7 bg-blue-100 shadow-md shadow-blue-300'>
        <div className='flex-1 pr-8 border-r border-black'>
          <div className='flex items-center mb-5'>
            <Avatar
              name={user.name}
              className='mr-5 w-16 h-16 text-4xl'
            />
            <div className='w-36'>
              <h2
                className='w-full text-xl text-wrap truncate select-none'
                title={user.name}>
                {user.name}
              </h2>
              <p className='text-gray-600'>{user.role}</p>
            </div>
          </div>
          <div className='mt-5'>
            <div className='flex justify-between mb-3'>
              <span className='font-bold'>Last visit:</span>
              <span>{user.lastVisited.toLocaleDateString('uk')}</span>
            </div>
          </div>
          <div>
            <Button
              bgColor='bg-indigo-600'
              hoverBgColor='hover:bg-indigo-500'
              focusOutlineColor='focus-visible:outline-indigo-600'
              callback={() => {}}>
              Subscribe
            </Button>
          </div>
        </div>
        <div className='flex-[2] pl-8 mt-5'>
          <ul className='flex list-none flex-wrap'>
            <VocabTag
              id='1'
              value='Английский'
            />
            <VocabTag
              id='1'
              value='Английский (Продвинутый)'
            />
            <VocabTag
              id='1'
              value='Бизнес-терминология'
            />
          </ul>
        </div>
      </div>
    </>
  );
}
