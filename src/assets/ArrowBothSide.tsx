export default function ArrowBothSide({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18 M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
      />
    </svg>
  );
}
