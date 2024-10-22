import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import creator from '@/assets/DSC01781.jpg';

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
      <h1 className='mt-10 text-3xl font-bold text-center'>About Lingua Evo</h1>
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
      <p className='my-3 text-center text-xl leading-8'>
        Our team believes that regular practice is the key to success in
        learning words, and <b>Lingua Evo</b> helps make this process easier and
        more interesting.
      </p>
      <h1 className='mt-10 mb-4 text-3xl font-bold text-center'>
        About creator
      </h1>
      <div className='flex bg-white p-5 mb-5 gap-x-5 shadow-md shadow-blue-300'>
        <div className='min-w-36 text-center'>
          <img
            className='rounded-full size-36 mb-2 object-cover duration-200 hover:scale-125 hover:duration-200'
            src={creator}
            alt='creator'></img>
          <p className='font-bold text-lg'>Alexander</p>
          <p className='font-bold text-lg'>Ugolkov</p>
        </div>
        <div className='text-lg'>
          <p className='mb-1'>
            I have always been passionate about computers, which led me to study
            Computer Security at university. I began my career in game
            development in 2012, working with Unity and C#. Over time, I managed
            small teams and took on leadership roles in projects.
          </p>
          <p className='mb-1'>
            In 2021, I transitioned to backend development. I did several
            courses in Go, backend development, and databases. I constantly seek
            to improve my skills, completing a concurrency course in Go in 2023.
          </p>
          <p className='mb-1'>
            I also started my own project — a service for learning foreign
            words.
          </p>
          <p className='mb-1 align-middle content-center'>
            I open for new opportunities and collaborate on projects. You can
            reach out to me in{' '}
            <a
              className='inline-flex items-center align-middle'
              href='https://www.linkedin.com/in/alexander-ugolkov'
              target='_blank'>
              <b className='text-blue-500'>LinkedIn</b>
              <img
                className='flex size-6 duration-200 hover:scale-[115%] hover:duration-200'
                src='/linkedin.svg'
                alt='linkedin'></img>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
