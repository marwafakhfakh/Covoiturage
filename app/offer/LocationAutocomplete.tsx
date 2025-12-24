// app/offer/LocationAutocomplete.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface LocationAutocompleteProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  delegations: Array<{ id: number; name: string; latitude: string; longitude: string }>;
  label: string;
  placeholder: string;
  required?: boolean;
  focusColor?: "blue" | "green";
}

export default function LocationAutocomplete({
  name,
  value,
  onChange,
  delegations,
  label,
  placeholder,
  required = false,
  focusColor = "blue"
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(delegations);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsOpen(true);

    if (val.trim() === '') {
      setFilteredOptions(delegations);
      // ✅ Créer un événement synthétique compatible
      const syntheticEvent = {
        target: { name, value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      const filtered = delegations.filter(d =>
        d.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredOptions(filtered);
      // ✅ Créer un événement synthétique compatible
      const syntheticEvent = {
        target: { name, value: val }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleSelectOption = (delegation: { id: number; name: string }) => {
    setInputValue(delegation.name);
    // ✅ Créer un événement synthétique compatible
    const syntheticEvent = {
      target: { name, value: delegation.name }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
    if (inputValue.trim() === '') {
      setFilteredOptions(delegations);
    }
  };

  const focusRingColor = focusColor === "blue" ? "focus:ring-blue-500" : "focus:ring-green-500";

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={`w-full p-4 border border-gray-300 rounded-xl focus:ring-2 ${focusRingColor} focus:border-transparent transition bg-white`}
        />
        
        
{isOpen && filteredOptions.length > 0 && (
  <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
    {filteredOptions.map((delegation) => (
      <button
        key={delegation.id}
        type="button"
        onClick={() => handleSelectOption(delegation)}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        <div className="font-medium text-gray-900">{delegation.name}</div>
      </button>
    ))}
  </div>
)}

{isOpen && inputValue.trim() !== '' && filteredOptions.length === 0 && (
  <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
    <p className="text-sm text-gray-500 text-center">
      Aucun résultat trouvé
    </p>
  </div>
)}
      </div>
    </div>
  );
}