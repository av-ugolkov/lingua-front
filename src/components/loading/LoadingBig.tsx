export default function LoadingBig() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div
        className={
          'size-32 animate-spin rounded-full border-b-2 border-gray-900'
        }></div>
    </div>
  );
}
