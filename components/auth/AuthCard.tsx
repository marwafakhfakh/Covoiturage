import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 p-8 ${className}`}
    >
      {children}
    </div>
  );
}
