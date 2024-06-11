import React, { Suspense } from 'react';

import LoadingBig from '@/components/Loading/LoadingBig';
import Account from '@/components/header/Account';

export default function Experimental() {
  return (
    <Suspense fallback={<LoadingBig />}>
      <DataComponent />
      <Account
        isAuth={true}
        accountName='test'
      />
    </Suspense>
  );
}

const fetchApiData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded!');
    }, 2000); // Simulating a 2-second delay for data fetching
  });
};

// A component that uses Suspense to handle asynchronous data fetching
function DataComponent() {
  const apiData = fetchApiData(); // This can be any async function, like an API call

  return <div>{apiData}</div>;
}
