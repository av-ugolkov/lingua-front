import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';

export default function Root() {
  return (
    <>
      <header className='sticky top-0 z-10'>
        <Header />
      </header>
      <main className='flex flex-row'>
        <div className='basis-[20%]'></div>
        <div className='basis-[60%]'>
          <Outlet />
        </div>
        <div className='basis-[20%]'>
          {/* <div>User Statistic</div>
          <div>Site Statistic</div> */}
        </div>
      </main>
    </>
  );
}
