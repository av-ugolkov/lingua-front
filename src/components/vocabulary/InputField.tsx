export default function InputField({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className='flex justify-start bg-transparent w-1/2 border-solid border-[1px] border-black border-t-0 border-x-0 outline-none'
      type='text'
      name='word'
      maxLength={50}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
