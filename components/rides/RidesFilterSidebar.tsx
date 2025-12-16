interface FilterOption {
  value: string;
  label: string;
}

interface FiltersState {
  sortBy: string;
  services: string[];
  departureTimeRange: string;
}

interface RidesFilterSidebarProps {
  filters: FiltersState;
  onSortChange: (sortBy: string) => void;
  onServiceFilter: (service: string) => void;
  onClearFilters: () => void;
  onDepartureTimeRangeChange: (range: string) => void;
  availableServices?: string[];
  className?: string;
}
// const departureTimeRanges = [
//   { value: "", label: "Any Time" },
//   { value: "0-6", label: "00:00 - 06:00" },
//   { value: "6-12", label: "06:00 - 12:00" },
//   { value: "12-18", label: "12:00 - 18:00" },
//   { value: "18-24", label: "18:00 - 24:00" },
// ];

// const defaultSortOptions: FilterOption[] = [
//   { value: "departure_time", label: "Departure Time" },
//   { value: "price_low", label: "Price: Low to High" },
//   { value: "price_high", label: "Price: High to Low" },
//   { value: "seats", label: "Available Seats" },
// ];
const departureTimeRanges = [
  { value: "", label: "À tout moment" },
  { value: "0-6", label: "00:00 - 06:00" },
  { value: "6-12", label: "06:00 - 12:00" },
  { value: "12-18", label: "12:00 - 18:00" },
  { value: "18-24", label: "18:00 - 24:00" },
];

const defaultSortOptions: FilterOption[] = [
  { value: "departure_time", label: "Heure de départ" },
  { value: "price_low", label: "Prix : du plus bas au plus élevé" },
  { value: "price_high", label: "Prix : du plus élevé au plus bas" },
  { value: "seats", label: "Places disponibles" },
];

const defaultServices = [
  "Air Conditioning",
  "Music System",
  "WiFi",
  "Phone Charger",
  "Snacks",
  "Water",
  "Pet Friendly",
  "Non-Smoking",
  "Luggage Space",
];

export default function RidesFilterSidebar({
  filters,
  onSortChange,
  onServiceFilter,
  onClearFilters,
  onDepartureTimeRangeChange,
  availableServices = defaultServices,
  className = "",
}: RidesFilterSidebarProps) {
  const hasActiveFilters =
    filters.services.length > 0 || filters.sortBy !== "departure_time";

  return (
    <div className={`w-80 flex-shrink-0 ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Trier par</h3>
          <div className="space-y-2">
            {defaultSortOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure    Time Range Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Heure de départ
          </h3>
          <div className="space-y-2">
            {departureTimeRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="departureTimeRange"
                  value={range.value}
                  checked={filters.departureTimeRange === range.value}
                  onChange={(e) => onDepartureTimeRangeChange(e.target.value)}
                  className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="ml-3 text-sm text-gray-700">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Services Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Services</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableServices.map((service) => (
              <label key={service} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.services.includes(service)}
                  onChange={() => onServiceFilter(service)}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <span className="ml-3 text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="mt-6 w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Réinitialiser tous les filtres
          </button>
        )}
      </div>
    </div>
  );
}
