"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";
import PageHeader from "../../components/common/PageHeader";
import RidesFilterSidebar from "../../components/rides/RidesFilterSidebar";
import RideCard, { RideData } from "../../components/rides/RideCard";
import EmptyStateTr from "../../components/common/EmptyStateTr";

type SearchParams = {
  from: string;
  to: string;
  date: string;
  seats: string;
};

type Filters = {
  sortBy: string;
  services: string[];
  departureTimeRange: string;
  seats: string;
};

export default function RidesPage() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });

  const [filters, setFilters] = useState<Filters>({
    sortBy: "departure_time",
    services: [],
    departureTimeRange: "",
    seats: "",
  });

  const [allRides, setAllRides] = useState<RideData[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredRides, setFilteredRides] = useState<RideData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch rides une seule fois (sans params)
  const fetchRides = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/posts/");
      const rides = Array.isArray(res.data) ? res.data : res.data.results || [];
      setAllRides(rides);
    } catch {
      setAllRides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  // Fetch services
  useEffect(() => {
    api
      .get("/api/services/")
      .then((res) => {
        const services = Array.isArray(res.data) ? res.data : [];
        const names = services
          .map((s: { name: string }) => s.name)
          .filter(Boolean);
        setAvailableServices(names);
      })
      .catch(() => setAvailableServices([]));
  }, []);

  // Filtrage JSON (délégation + ville)
  const applyFilters = useCallback(
    (rides: RideData[], search: SearchParams, filter: Filters) => {
      let filtered = [...rides];

      // ----- De / Vers (délégation + ville) -----
      if (search.from && search.to) {
        const fromVal = search.from.toLowerCase();
        const toVal = search.to.toLowerCase();

        filtered = filtered.filter((ride) => {
          const depPlace = ride.departure_place.toLowerCase();
          const depCity = (ride.departure_city || "").toLowerCase();
          const arrPlace = ride.arrival_place.toLowerCase();
          const arrCity = (ride.arrival_city || "").toLowerCase();

          const matchFrom =
            depPlace.includes(fromVal) || depCity.includes(fromVal);
          const matchTo =
            arrPlace.includes(toVal) || arrCity.includes(toVal);

          return matchFrom && matchTo;
        });
      } else if (search.from) {
        const fromVal = search.from.toLowerCase();

        filtered = filtered.filter((ride) => {
          const depPlace = ride.departure_place.toLowerCase();
          const depCity = (ride.departure_city || "").toLowerCase();
          return depPlace.includes(fromVal) || depCity.includes(fromVal);
        });
      } else if (search.to) {
        const toVal = search.to.toLowerCase();

        filtered = filtered.filter((ride) => {
          const arrPlace = ride.arrival_place.toLowerCase();
          const arrCity = (ride.arrival_city || "").toLowerCase();
          return arrPlace.includes(toVal) || arrCity.includes(toVal);
        });
      }

      // ----- Nombre de places -----
      if (search.seats) {
        const seatsNeeded = parseInt(search.seats, 10);
        if (!isNaN(seatsNeeded)) {
          filtered = filtered.filter(
            (ride) => ride.nb_places_disponible >= seatsNeeded
          );
        }
      }

      // ----- Date -----
      if (search.date) {
        filtered = filtered.filter((ride) => {
          const rideDate = new Date(ride.departure_date)
            .toISOString()
            .slice(0, 10);
          return rideDate === search.date;
        });
      }

      // ----- Services -----
      if (filter.services.length > 0) {
        filtered = filtered.filter((ride) =>
          filter.services.every((service) =>
            ride.services.map((s: { name: string }) => s.name).includes(service)
          )
        );
      }

      // ----- Plage horaire -----
      if (filter.departureTimeRange) {
        const [start, end] = filter.departureTimeRange.split("-").map(Number);
        filtered = filtered.filter((ride) => {
          const hour = new Date(ride.departure_date).getHours();
          return hour >= start && hour < end;
        });
      }

      // ----- Tri -----
      filtered.sort((a, b) => {
        switch (filter.sortBy) {
          case "departure_time":
            return (
              new Date(a.departure_date).getTime() -
              new Date(b.departure_date).getTime()
            );
          case "price_low":
            return parseFloat(a.price) - parseFloat(b.price);
          case "price_high":
            return parseFloat(b.price) - parseFloat(a.price);
          case "seats":
            return b.nb_places_disponible - a.nb_places_disponible;
          default:
            return 0;
        }
      });

      return filtered;
    },
    []
  );

  // Refiltrer
  useEffect(() => {
    const filtered = applyFilters(allRides, searchParams, filters);
    setFilteredRides(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / 10)));
    setCurrentPage(1);
  }, [allRides, searchParams, filters, applyFilters]);

  // Pagination
  const pageSize = 10;
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handlers search
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // rien : useEffect + applyFilters se déclenchent déjà
  };

  // Handlers sidebar
  const handleSortChange = (sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleServiceFilter = (service: string) => {
    setFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: "departure_time",
      services: [],
      departureTimeRange: "",
      seats: "",
    });
  };

  const handleDepartureTimeRangeChange = (range: string) => {
    setFilters((prev) => ({ ...prev, departureTimeRange: range }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Zone de recherche JSON-only */}
      {/* <section className="bg-white shadow-sm border-b"> */}
              <section className="bg-white shadow-sm ">

        <div className="max-w-7xl mx-auto px-4 py-6">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* De */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  De
                </label>
                <input
                  type="text"
                  name="from"
                  value={searchParams.from}
                  onChange={handleSearchChange}
                  placeholder="Ex: Sousse, Tunis..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* Vers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vers
                </label>
                <input
                  type="text"
                  name="to"
                  value={searchParams.to}
                  onChange={handleSearchChange}
                  placeholder="Ex: Sfax, Monastir..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* Nombre de places */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de places
                </label>
                <input
                  type="number"
                  min={1}
                  name="seats"
                  value={searchParams.seats}
                  onChange={handleSearchChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleSearchChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full md:w-auto px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Rechercher des trajets
            </button>
          </form>
        </div>
      </section>

      <PageHeader
        title="Trajets disponibles"
        searchInfo={searchParams}
        resultCount={filteredRides.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
  <div className="flex flex-col md:flex-row gap-8">
    {/* Filtres */}
    {/* <div className="w-full md:w-1/3 lg:w-1/4">
      <RidesFilterSidebar
        filters={filters}
        onSortChange={handleSortChange}
        onServiceFilter={handleServiceFilter}
        onClearFilters={handleClearFilters}
        onDepartureTimeRangeChange={handleDepartureTimeRangeChange}
        availableServices={
          availableServices.length > 0 ? availableServices : undefined
        }
      />
    </div> */}

    {/* Cartes */}
    <div className="w-full md:flex-1">
      {loading ? (
        <div className="text-center py-8">Chargement des trajets...</div>
      ) : paginatedRides.length > 0 ? (
        <div className="space-y-4">
          {paginatedRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <EmptyStateTr />
      )}

      {filteredRides.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Précédent
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  </div>
</div>

    </main>
  );
}