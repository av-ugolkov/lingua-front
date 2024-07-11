import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';

export default function Root() {
  return (
    <>
      <header className='sticky top-0 z-50'>
        <Header />
      </header>
      <main className='flex flex-row'>
        <div className='basis-[15%]'></div>
        <div className='basis-[70%]'>
          <Outlet />
        </div>
        <div className='basis-[15%]'>
          <div>User Statistic</div>
          <div>Site Statistic</div>
        </div>
      </main>
    </>
  );
}
