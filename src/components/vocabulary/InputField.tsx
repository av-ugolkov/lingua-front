export default function InputField({
  value,
  placeholder,
  onChange,
  children,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className='flex justify-start bg-transparent w-1/2 border-solid border-[1px] border-black border-t-0 border-x-0'>
      <input
        className='w-full bg-transparent outline-none'
        type='text'
        name='word'
        maxLength={50}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {children}
    </div>
  );
}
