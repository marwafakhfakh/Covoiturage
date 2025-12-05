import { ChangeEvent } from "react";

interface CheckboxFieldProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function CheckboxField({
  id,
  name,
  checked,
  onChange,
  required = false,
  className = "",
  children,
}: CheckboxFieldProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        required={required}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
        {children}
      </label>
    </div>
  );
}
