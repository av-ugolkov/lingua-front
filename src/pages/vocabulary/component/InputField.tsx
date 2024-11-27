import { useEffect, useRef } from 'react';

export default function InputField({
  value,
  placeholder,
  disabled,
  maxLength = 50,
  onChange,
  onFixed,
  children,
}: {
  value: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
  name?: string;
  onChange: (value: string) => void;
  onFixed: (value: string) => void;
  children?: React.ReactNode;
}) {
  const timerID = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, []);

  return (
    <div className='flex justify-start bg-transparent w-full h-6 border-solid border-[1px] border-black border-t-0 border-x-0'>
      <input
        className='w-full bg-transparent outline-none'
        type='text'
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);

          if (timerID.current) clearTimeout(timerID.current);
          timerID.current = window.setTimeout(() => {
            onFixed(e.target.value);
          }, 3000);
        }}
        onBlur={() => {
          if (timerID.current) clearTimeout(timerID.current);
          onFixed(value);
        }}
      />
      {children}
    </div>
  );
}
