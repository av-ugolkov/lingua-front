export default function BgLock({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-lock'>
      <div className='flex justify-center items-center w-full h-full'>
        {children}
      </div>
    </div>
  );
}
