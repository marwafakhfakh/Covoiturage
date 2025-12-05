import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}
