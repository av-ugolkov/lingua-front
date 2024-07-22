export default function BtnCard({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className='flex w-8 h-14 items-center justify-center hover:shadow hover:shadow-blue-400'
      onClick={onClick}>
      {children}
    </button>
  );
}
