"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../../api/api";
import PageHeader from "../../components/common/PageHeader";
import RidesFilterSidebar from "../../components/rides/RidesFilterSidebar";
import RideCard, { RideData } from "../../components/rides/RideCard";
import EmptyState from "../../components/common/EmptyState";
import SearchForm from "../../components/home/SearchForm";

export default function RidesPage() {
  // ✅ TOUS LES HOOKS AU DÉBUT - JAMAIS conditionnels
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
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });
  const [filters, setFilters] = useState({
    sortBy: "departure_time",
    services: [] as string[],
    departureTimeRange: "",
    seats: "",
  });
  const [allRides, setAllRides] = useState<RideData[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [filteredRides, setFilteredRides] = useState<RideData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ TOUS LES useEffect APRÈS TOUS useState
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const res = await api.get("/api/auth/profile/");
        setProfile(res.data);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ✅ fetchRides useCallback TOUJOURS défini
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

  // ✅ URL params useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
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
      fetchRides(`/api/posts/?${query.toString()}`);
    }
  }, [fetchRides]);

  // ✅ Services useEffect
  useEffect(() => {
    api.get("/api/services/")
      .then((res) => {
        const services = Array.isArray(res.data) ? res.data : [];
        const names = services.map((s: { name: string }) => s.name).filter(Boolean);
        setAvailableServices(names);
      })
      .catch(() => setAvailableServices([]));
  }, []);

  // ✅ applyFilters useCallback TOUJOURS défini
  const applyFilters = useCallback((
    rides: RideData[],
    search: SearchParams,  // ✅ PAS searchParams
    filter: Filters  
  ) => {
    let filtered = [...rides];
    if (searchParams.from) {
      filtered = filtered.filter((ride) =>
        ride.departure_place.toLowerCase().includes(searchParams.from.toLowerCase())
      );
    }
    if (searchParams.to) {
      filtered = filtered.filter((ride) =>
        ride.arrival_place.toLowerCase().includes(searchParams.to.toLowerCase())
      );
    }
    if (searchParams.seats) {
      const seatsNeeded = parseInt(searchParams.seats, 10);
      if (!isNaN(seatsNeeded)) {
        filtered = filtered.filter((ride) => ride.nb_places_disponible >= seatsNeeded);
      }
    }
    if (searchParams.date) {
      filtered = filtered.filter((ride) => {
        const rideDate = new Date(ride.departure_date).toISOString().slice(0, 10);
        return rideDate === searchParams.date;
      });
    }
    if (filters.services.length > 0) {
      filtered = filtered.filter((ride) =>
        filters.services.every((service) =>
          ride.services.map((s: { name: string }) => s.name).includes(service)
        )
      );
    }
    if (filters.departureTimeRange) {
      const [start, end] = filters.departureTimeRange.split("-").map(Number);
      filtered = filtered.filter((ride) => {
        const hour = new Date(ride.departure_date).getHours();
        return hour >= start && hour < end;
      });
    }
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "departure_time":
          return new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime();
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
  }, []);

  // ✅ Filters useEffect
  useEffect(() => {
    const filtered = applyFilters(allRides, searchParams, filters);
    setFilteredRides(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / 10)));
    setCurrentPage(1);
  }, [allRides, searchParams, filters, applyFilters]);

  // ✅ RENDU CONDITIONNEL APRÈS TOUS HOOKS
  if (isAuthenticated === false || isAuthenticated === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Connexion requise</h1>
          <p className="text-gray-600 mb-8">Veuillez vous connecter pour voir les trajets.</p>
          <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Se connecter
          </a>
        </div>
      </main>
    );
  }

  const pageSize = 10;
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = (formData: typeof searchParams) => {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    window.history.replaceState(null, "", `/rides?${params.toString()}`);
    setSearchParams(formData);
    fetchRides(`/api/posts/?${params.toString()}`); // ✅

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
      window.history.replaceState(null, "", `/rides?${urlParams.toString()}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchForm
        initialData={searchParams}
        onSearch={handleSearch}
        title="Find Your Perfect Ride"
        className="pt-8 pb-0"
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
            availableServices={availableServices.length > 0 ? availableServices : undefined}
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
                <span>Page {currentPage} of {totalPages}</span>
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
