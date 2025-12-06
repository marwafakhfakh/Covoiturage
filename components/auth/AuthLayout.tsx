import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  className = "",
}: AuthLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <Image
            src="/namlaa.png"
            alt="Namlaa"
            width={90}
            height={60}
            className="object-contain"
          />
          <h2 className="text-3xl font-bold text-black">{title}</h2>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
