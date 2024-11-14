interface InputFieldWithLabelProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  autoFill?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}

export default function InputFieldWithLabel({
  id,
  label,
  value,
  type = 'text',
  autoFill = 'off',
  placeholder = '',
  maxLength = 50,
  disabled = false,
  required = false,
  onChange,
}: InputFieldWithLabelProps) {
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
          disabled={disabled}
          required={required}
          className='block w-full border-0 py-1.5 pl-2 text-black ring-2 ring-inset outline-indigo-600 ring-indigo-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:text-gray-600 disabled:bg-gray-200'
        />
      </div>
    </>
  );
}
