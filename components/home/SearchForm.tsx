"use client";
import { useState, useEffect } from "react";

interface SearchFormData {
  from: string;
  to: string;
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
    from: "",
    to: "",
    date: "",
    seats: initialData.seats || "1",
    ...initialData,
  });

  // Sync form state with initialData when it changes
  useEffect(() => {
    if (
      initialData &&
      Object.keys(initialData).length > 0 &&
      Object.entries(initialData).some(
        ([key, value]) =>
          value !== undefined &&
          value !== searchForm[key as keyof SearchFormData]
      )
    ) {
      setSearchForm((prev) => ({
        ...prev,
        ...initialData,
        seats: initialData.seats || "1",
      }));
    }
  }, [initialData]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchForm);
    } else {
      // Default navigation behavior
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
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  From
                </label>
                <input
                  name="from"
                  value={searchForm.from}
                  onChange={handleSearchChange}
                  placeholder="Departure city"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white "
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  To
                </label>
                <input
                  name="to"
                  value={searchForm.to}
                  onChange={handleSearchChange}
                  placeholder="Destination city"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white "
                  required
                />
              </div>
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white "
                />
              </div>{" "}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={searchForm.date}
                  onChange={handleSearchChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white "
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
