export default function DropdownItem({
  disable,
  onClick,
  children,
}: {
  disable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      type='button'
      className={
        'inline-flex gap-x-2 bg-gray-200 text-gray-900 w-full px-2 py-2 justify-around text-sm disabled:hover:bg-gray-200 disabled:text-gray-400 hover:duration-200 hover:bg-gray-100 duration-500'
      }>
      {children}
    </button>
  );
}
