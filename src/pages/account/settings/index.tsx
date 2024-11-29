import PC from './pc';
import Phone from './phone';

export interface ITabElement {
  name: string;
  url: string;
  selected: boolean;
}

export default function Settings() {
  const tabs: ITabElement[] = [
    { name: 'Account', url: '#account', selected: true },
    { name: 'Security', url: '#security', selected: false },
    // { name: 'Personal Info', url: '#personal_info', selected: false },
    // {
    //   name: 'Email Notifications',
    //   url: '#email_notifications',
    //   selected: false,
    // },
  ];

  if (!history.state.tab) {
    history.pushState({ tab: tabs[0].url }, '', tabs[0].url);
  } else {
    tabs.forEach((tab) => {
      tab.selected = tab.url === history.state.tab;
    });
  }

  return (
    <>
      <div className='sm:hidden'>
        <Phone />
      </div>

      <div className='w-full hidden sm:block'>
        <PC tabs={tabs} />
      </div>
    </>
  );
}
