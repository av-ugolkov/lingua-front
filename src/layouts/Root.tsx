import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import { useEffect, useState } from 'react';
import { useLanguagesStore } from '@/hooks/stores/useLanguagesStore';

export default function Root() {
  const { languages, fetchLanguages } = useLanguagesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (languages.size === 0) {
      fetchLanguages().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div></div>;
  }

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
