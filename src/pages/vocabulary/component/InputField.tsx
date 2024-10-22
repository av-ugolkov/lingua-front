export default function InputField({
  value,
  placeholder,
  disabled,
  maxLength = 50,
  onChange,
  children,
}: {
  value: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex justify-start bg-transparent w-full border-solid border-[1px] border-black border-t-0 border-x-0'>
      <input
        className='w-full bg-transparent outline-none'
        type='text'
        name='word'
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {children}
    </div>
  );
}
