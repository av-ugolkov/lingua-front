import clsx from 'clsx';

export default function Avatar({
  name,
  className,
  callback,
}: {
  name: string;
  className?: string;
  callback?: () => void;
}) {
  return (
    <button
      onBlur={() => setTimeout(() => callback?.(), 150)}
      onClick={callback}
      className={clsx(
        className,
        'inline-block cursor-pointer text-center content-center select-none bg-gray-300 h-8 w-8 rounded-full hover:shadow-md hover:duration-200 hover:shadow-blue-500 duration-1000'
      )}>
      {name.charAt(0).toUpperCase()}
    </button>
  );
}
