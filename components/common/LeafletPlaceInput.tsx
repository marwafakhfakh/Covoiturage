"use client";

import { useRef } from "react";

interface LeafletPlaceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name: string;
}

export default function LeafletPlaceInput({
  value,
  onChange,
  placeholder,
  name,
}: LeafletPlaceInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBlur = async () => {
    // Ici tu pourras plus tard appeler Nominatim si tu veux valider l'adresse
  };

  return (
    <input
      ref={inputRef}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
      required
    />
  );
}
