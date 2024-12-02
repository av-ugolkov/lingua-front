import clsx from 'clsx';

export default function Tag({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        className,
        'flex h-auto items-center px-1 text-wrap bg-gray-300 shadow shadow-blue-300'
      )}>
      {value}
      {children}
    </span>
  );
}
