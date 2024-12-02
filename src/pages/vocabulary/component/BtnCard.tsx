import clsx from 'clsx';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function BtnCard({
  onClick,
  disabled = false,
  className,
  children,
}: Props) {
  return (
    <button
      className={clsx(
        'flex w-8 h-14 items-center justify-center hover:shadow hover:shadow-blue-500 disabled:hover:shadow-none',
        className
      )}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
