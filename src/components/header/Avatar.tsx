import clsx from 'clsx';

export default function Avatar({
  name,
  size,
  className,
  callback,
}: {
  name: string;
  size?: number;
  className?: string;
  callback?: () => void;
}) {
  const s = size ? `w-${size} h-${size}` : `w-8 h-8`;

  return (
    <button
      onBlur={() => setTimeout(() => callback?.(), 150)}
      onClick={callback}
      className={clsx(
        'inline-block cursor-pointer text-center content-center select-none bg-gray-300 rounded-full hover:shadow-md hover:duration-200 hover:shadow-blue-500 duration-1000',
        s,
        className
      )}>
      {name.charAt(0).toUpperCase()}
    </button>
  );
}
