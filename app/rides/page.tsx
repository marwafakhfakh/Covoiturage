"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";
import PageHeader from "../../components/common/PageHeader";
import RidesFilterSidebar from "../../components/rides/RidesFilterSidebar";
import RideCard, { RideData } from "../../components/rides/RideCard";
import EmptyState from "../../components/common/EmptyState";
import SearchForm from "../../components/home/SearchForm";

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

  // Fetch rides
  const fetchRides = useCallback(async (url: string = "/api/posts/") => {
    setLoading(true);
    try {
      const res = await api.get(url);
      const rides = Array.isArray(res.data) ? res.data : res.data.results || [];
      setAllRides(rides);
    } catch {
      setAllRides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Read URL params on first load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const params: SearchParams = {
      from: urlParams.get("from") || "",
      to: urlParams.get("to") || "",
      date: urlParams.get("date") || "",
      seats: urlParams.get("seats") || "1",
    };
    setSearchParams(params);

    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    const page = urlParams.get("page");
    if (page) setCurrentPage(parseInt(page, 10) || 1);

    fetchRides(`/api/posts/?${query.toString()}`);
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

  // Filtering logic
  const applyFilters = useCallback(
    (rides: RideData[], search: SearchParams, filter: Filters) => {
      let filtered = [...rides];

      if (search.from) {
        filtered = filtered.filter((ride) =>
          ride.departure_place
            .toLowerCase()
            .includes(search.from.toLowerCase())
        );
      }
      if (search.to) {
        filtered = filtered.filter((ride) =>
          ride.arrival_place.toLowerCase().includes(search.to.toLowerCase())
        );
      }
      if (search.seats) {
        const seatsNeeded = parseInt(search.seats, 10);
        if (!isNaN(seatsNeeded)) {
          filtered = filtered.filter(
            (ride) => ride.nb_places_disponible >= seatsNeeded
          );
        }
      }
      if (search.date) {
        filtered = filtered.filter((ride) => {
          const rideDate = new Date(ride.departure_date)
            .toISOString()
            .slice(0, 10);
          return rideDate === search.date;
        });
      }

      if (filter.services.length > 0) {
        filtered = filtered.filter((ride) =>
          filter.services.every((service) =>
            ride.services.map((s: { name: string }) => s.name)
              .includes(service)
          )
        );
      }

      if (filter.departureTimeRange) {
        const [start, end] = filter.departureTimeRange
          .split("-")
          .map(Number);
        filtered = filtered.filter((ride) => {
          const hour = new Date(ride.departure_date).getHours();
          return hour >= start && hour < end;
        });
      }

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

  // Apply filters whenever data or filters change
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

  // Handlers
  const handleSearch = (formData: SearchParams) => {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        `/rides?${params.toString()}`
      );
    }
    setSearchParams(formData);
    fetchRides(`/api/posts/?${params.toString()}`);
  };

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
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("page", page.toString());
      window.history.replaceState(
        null,
        "",
        `/rides?${urlParams.toString()}`
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchForm
        initialData={searchParams}
        onSearch={handleSearch}
        title="Find Your Perfect Ride"
        className="pt-4 pb-0"
      />

      <PageHeader
        title="Available Rides"
        searchInfo={searchParams}
        resultCount={filteredRides.length}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
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

          <div className="flex-1">
            {loading ? (
              <div className="text-center py-8">Loading rides...</div>
            ) : paginatedRides.length > 0 ? (
              <div className="space-y-4">
                {paginatedRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}

            {filteredRides.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
