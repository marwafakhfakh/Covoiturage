"use client";

import { useState } from "react";

interface SearchFormData {
  from: string;   // départ : ville / délégation
  to: string;     // arrivée : ville / délégation
  date: string;
  seats: string;
}

interface SearchFormProps {
  onSearch?: (formData: SearchFormData) => void;
  initialData?: Partial<SearchFormData>;
  title?: string;
  className?: string;
}

export default function SearchForm({
  onSearch,
  initialData = {},
  title = "Find Your Perfect Ride",
  className = "",
}: SearchFormProps) {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    from: initialData.from || "",
    to: initialData.to || "",
    date: initialData.date || "",
    seats: initialData.seats || "1",
  });

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchForm);
    } else {
      const params = new URLSearchParams();
      Object.entries(searchForm).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      window.location.href = `/rides?${params.toString()}`;
    }
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {title}
        </h2>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* From (délégation / ville de départ) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  From
                </label>
                <input
                  name="from"
                  value={searchForm.from}
                  onChange={handleSearchChange}
                  placeholder="Ex: Sfax, Sidi Mansour"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                  required
                />
              </div>

              {/* To (délégation / ville d’arrivée) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  To
                </label>
                <input
                  name="to"
                  value={searchForm.to}
                  onChange={handleSearchChange}
                  placeholder="Ex: Tunis, La Marsa"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                  required
                />
              </div>

              {/* Seats */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  Number of Seats
                </label>
                <input
                  name="seats"
                  type="number"
                  min="1"
                  value={searchForm.seats || ""}
                  onChange={handleSearchChange}
                  placeholder="Seats"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={searchForm.date}
                  onChange={handleSearchChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Search Rides
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
