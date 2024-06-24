export default function BtnCard({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className='flex w-8 h-1/4 items-center justify-center hover:shadow hover:shadow-blue-300'
      onClick={onClick}>
      {children}
    </button>
  );
}
