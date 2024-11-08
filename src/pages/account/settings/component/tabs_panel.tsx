import clsx from 'clsx';
import { ITabElement } from '..';

type TabProps = ITabElement & {
  selectFn: (id: string) => void;
};

export default function TabsPanel({ name, url, selected, selectFn }: TabProps) {
  return (
    <>
      <a
        href={url}
        onClick={() => {
          selectFn(url);
        }}
        className={clsx(
          'shrink-0 border-b-2 px-1 pb-2 text-sm font-medium duration-300 hover:duration-300 hover:border-indigo-300 hover:text-indigo-500',
          selected
            ? 'border-indigo-400 text-indigo-600'
            : 'border-transparent border-gray-400 text-gray-600'
        )}>
        {name}
      </a>
    </>
  );
}
