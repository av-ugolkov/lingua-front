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
    { name: 'Securety', url: '#securety', selected: false },
    { name: 'Personal Info', url: '#personal_info', selected: false },
    {
      name: 'Email Notifications',
      url: '#email_notifications',
      selected: false,
    },
  ];
  history.pushState(null, '', tabs[0].url);

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
