import { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export default function FormField({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-black mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white text-black placeholder-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
}
