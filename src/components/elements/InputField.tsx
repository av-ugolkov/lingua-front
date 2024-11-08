export default function InputFieldWithLabel({
  id,
  label,
  value,
  type = 'text',
  autoFill = 'off',
  placeholder = '',
  maxLength = 50,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  type?: string;
  autoFill?: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <div className='my-2'>
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-black mb-1'>
          {label}
        </label>
        <input
          id={id}
          name={label}
          type={type}
          autoComplete={autoFill}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          required
          className='block w-full border-0 py-1.5 pl-2 text-black ring-2 ring-inset outline-indigo-600 ring-indigo-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
        />
      </div>
    </>
  );
}
