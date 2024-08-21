export default function AuthInput({
  id,
  value,
  type,
  autoComplete,
  placeholder,
  onChange,
}: {
  id: string;
  value: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      placeholder={placeholder}
      className='block w-full border-0 py-1.5 pl-2 input-white-form shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6'
    />
  );
}
