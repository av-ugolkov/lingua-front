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
        'inline-flex gap-x-2 bg-gray-300 text-black w-full px-2 py-2 justify-between text-sm disabled:hover:bg-gray-300 disabled:text-gray-400 hover:duration-200 hover:bg-gray-400 hover:text-white duration-500'
      }>
      {children}
    </button>
  );
}
