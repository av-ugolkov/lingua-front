import { CheckBadgeIcon } from '@heroicons/react/24/outline';

const pros: { header: string; description: string; isDone: boolean }[] = [
  {
    header: 'Personalized Word Lists',
    description:
      'Create your own sets of words or use ready-made lists on various topics.',
    isDone: true,
  },
  {
    header: 'Smart Repetition System',
    description: 'Our service helps to memorize words for the long term.',
    isDone: false,
  },
  {
    header: 'Gamification',
    description: 'Learn words by playing games.',
    isDone: false,
  },
  {
    header: 'Statistics and Progress',
    description: 'Track your achievements and progress to stay motivated.',
    isDone: false,
  },
  {
    header: 'User-friendly Interface',
    description: 'Our website is user-friendly and easy to navigate.',
    isDone: true,
  },
];

export default function About() {
  return (
    <>
      <p className='text-center m-10 text-xl leading-8'>
        Welcome to <b>Lingua Evo</b> — a convenient tool for learning foreign
        words and improving your vocabulary! Our goal is to make the process of
        learning a new language effective, engaging, and accessible to everyone.
      </p>
      {pros.map((pro) => {
        return (
          <div className='bg-white p-5 mb-5 shadow-md shadow-blue-300 duration-200 hover:scale-105 hover:duration-200'>
            <h3 className='flex text-2xl align-middle text-blue-400'>
              {pro.header}{' '}
              {pro.isDone ? (
                <CheckBadgeIcon className='text-green-500 ml-2 size-8' />
              ) : (
                <p className='text-red-500 text-2xl ml-2'>(soon)</p>
              )}
            </h3>
            <p className='text-x2'>{pro.description}</p>
          </div>
        );
      })}
      <p className='mt-3 text-center text-xl leading-8'>
        Our team believes that regular practice is the key to success in
        learning words, and <b>Lingua Evo</b> helps make this process easier and
        more interesting.
      </p>
    </>
  );
}
