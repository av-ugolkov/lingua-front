import { useState } from 'react';

import { ITabElement } from '.';
import TabsPanel from './component/tabs_panel';
import Account from './component/account';
import Securety from './component/securety';
import PersonalInfo from './component/personal_info';
import EmailNotifications from './component/email_notifications';

export default function PC({ tabs }: { tabs: ITabElement[] }) {
  const [tabId, setTabId] = useState(tabs[0].url);

  function chooseTabId(id: string) {
    tabs.forEach((tab) => {
      tab.selected = tab.url === id;
    });
    setTabId(id);
  }

  return (
    <>
      <div className='w-full py-6'>
        <nav className='flex justify-evenly border-b border-gray-200'>
          {tabs.map((tab) => (
            <TabsPanel
              key={tab.url}
              name={tab.name}
              url={tab.url}
              selected={tab.selected}
              selectFn={chooseTabId}
            />
          ))}
        </nav>
      </div>
      <div className='grid w-[30%] min-w-48 mt-3 mx-auto gap-y-3'>
        {getTabForm(tabId)}
      </div>
    </>
  );
}

function getTabForm(id: string) {
  switch (id) {
    case '#account':
      return <Account />;
    case '#securety':
      return <Securety />;
    case '#personal_info':
      return <PersonalInfo />;
    case '#email_notifications':
      return <EmailNotifications />;
  }
}
