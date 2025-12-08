"use client";
import { useState, useEffect } from "react";
import FormSection from "../../components/offer/FormSection";
import SuccessMessage from "../../components/common/SuccessMessage";
import api from "../../api/api";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import DelegationMap from "./DelegationMap";
import { estimateDistanceKm } from "./DelegationMap";

// Car and Service types
type Car = {
  id: number;
  model: { id: number; name: string; brand: number };
  type: string;
  color: string;
  serial_number: string;
  nb_place: number;
  engine_type: string;
  grey_card: string;
  year: number | null;
  image: string | null;
  owner: number;
};
type Service = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  logo: string | null;
};

export default function OfferRidePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [form, setForm] = useState({
    departure_place: "",
    arrival_place: "",
    departure_date: "",
    price: "",
    nb_places_disponible: "",
    selected_car_id: "",
    services: [] as number[],
    description: "",
  });
    const distanceKm =
    form.departure_place && form.arrival_place
      ? estimateDistanceKm(form.departure_place, form.arrival_place)
      : 0;

  const estimatedPrice = distanceKm * 0.1; // 0.100 TND / km

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownedCars, setOwnedCars] = useState<Car[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Delegations (places)
  const [delegations, setDelegations] = useState<
    { id: number; name: string }[]
  >([]);
useEffect(() => {
  async function fetchData() {
    setLoading(true);
    try {
      
      const [carsRes, servicesRes, delegationsRes] = await Promise.all([
        api.get("/api/cars/"),
        api.get("/api/services/"),
        api.get("/api/delegations/"),
      ]);
      
      
      // Gérer les deux cas : avec et sans pagination
      const cars = Array.isArray(carsRes.data) 
        ? carsRes.data 
        : (carsRes.data.results || []);
            const delegs = delegationsRes.data.results || delegationsRes.data || [];

            console.log('Delegations fetched:', delegs);

      setOwnedCars(cars);
      setServices(servicesRes.data.results || []);
      setDelegations(delegs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, [user]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (serviceId: number) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const selectedCar = ownedCars.find(
      (car) => car.id === parseInt(form.selected_car_id)
    );
    try {
      // Log the form data and selected car for debugging
      console.log("Form data:", form);
      console.log("Selected car:", selectedCar);
      await api.post("/api/posts/", {
        ...form,
        user: user?.id,
        car: selectedCar?.id,
        status: "open",
        services: form.services, // array of ids
      });
      setSuccess(true);
    } catch (err: any) {
     /* setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "An error occurred while publishing your ride."
      );*/
      setError(
        err?.response?.data?.detail ||
        Object.values(err?.response?.data || {}).flat().join(' ') ||
        "An error occurred while publishing your ride."
      );
      
    }
  };

  const selectedCar = ownedCars.find(
    (car) => car.id === parseInt(form.selected_car_id)
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Offer a Ride
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {success ? (
            <SuccessMessage
              title="Ride Offered Successfully!"
              description="Your ride has been posted and is now available for bookings."
              actionText="Offer Another Ride"
              onAction={() => setSuccess(false)}
            />
          ) : loading ? (
            <div className="text-center text-gray-500 py-12">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Route Section */}
              {/* <FormSection title="Route Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Departure Location
                    </label>
                    <select
                      name="departure_place"
                      value={form.departure_place}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select departure</option>
                      {delegations.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
                      📍 Map placeholder for departure location
                      <br />
                      <small>(Interactive map would be integrated here)</small>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Arrival Location
                    </label>
                    <select
                      name="arrival_place"
                      value={form.arrival_place}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select arrival</option>
                      {delegations.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
                      📍 Map placeholder for destination
                      <br />
                      <small>(Interactive map would be integrated here)</small>
                    </div>
                  </div>
                </div>
              </FormSection> */}
              <FormSection title="Route Information">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DelegationMap
      selectedValue={form.departure_place}
      onSelect={(value) => setForm({ ...form, departure_place: value })}
      label="Lieu de départ"
      delegations={delegations}
    />

    <DelegationMap
      selectedValue={form.arrival_place}
      onSelect={(value) => setForm({ ...form, arrival_place: value })}
      label="Lieu d'arrivée"
      delegations={delegations}
    />
  </div>

  {distanceKm > 0 && (
    <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
      Distance estimée : {distanceKm.toFixed(1)} km  
      <br />
      Montant estimé : {estimatedPrice.toFixed(3)} TND
    </div>
  )}
</FormSection>

{/* <FormSection title="Route Information">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DelegationMap
      selectedValue={form.departure_place}
      onSelect={(value) => setForm({ ...form, departure_place: value })}
      label="Lieu de départ"
      delegations={delegations}
    />

    <DelegationMap
      selectedValue={form.arrival_place}
      onSelect={(value) => setForm({ ...form, arrival_place: value })}
      label="Lieu d'arrivée"
      delegations={delegations}
    />
  </div>
</FormSection> */}
              {/* Trip Details Section */}
              <FormSection title="Trip Details">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Date & Time
                    </label>
                    <input
                      name="departure_date"
                      type="datetime-local"
                      value={form.departure_date}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Price per Seat (€)
                    </label>
                    <input
                      name="price"
                      placeholder="25"
                      type="number"
                      min="1"
                      value={form.price}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Available Seats
                    </label>
                    <select
                      name="nb_places_disponible"
                      value={form.nb_places_disponible}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select seats</option>
                      {selectedCar &&
                        Array.from(
                          { length: selectedCar.nb_place - 1 },
                          (_, i) => i + 1
                        ).map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} seat{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      {!selectedCar && (
                        <>
                          <option value="1">1 seat</option>
                          <option value="2">2 seats</option>
                          <option value="3">3 seats</option>
                          <option value="4">4 seats</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </FormSection>

              {/* Car Selection Section */}
              <FormSection title="Vehicle Information">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Select Your Car
                    </label>
                    <select
  name="selected_car_id"
  value={form.selected_car_id}
  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
  onChange={handleChange}
  required
>
  <option value="">
    Choose a car from your collection
  </option>
  {ownedCars.map((car) => {
    return (
      <option key={car.id} value={car.id.toString()}>
        {car.model?.name || 'Unknown Model'} ({car.year || "-"}) - {car.color} - {car.serial_number}
      </option>
    );
  })}
</select>
                  </div>

                  {ownedCars.length !== 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                      <div className="text-gray-400 text-4xl mb-3">🚗</div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        No Cars Available
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You need to add a car to your profile before offering
                        rides.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
                        onClick={() => (window.location.href = "/profile")}
                      >
                        Add a Car
                      </button>
                    </div>
                  )}
                </div>
              </FormSection>

              {/* Services Section */}
              <FormSection title="Services & Amenities">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.services.includes(service.id)}
                        onChange={() => handleServiceChange(service.id)}
                        className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {service.name}
                      </span>
                    </label>
                  ))}
                </div>
              </FormSection>

              {/* Description Section */}
              <FormSection title="Additional Information">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    placeholder="Add any additional information about your ride, pickup points, or special requirements..."
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white resize-none"
                    onChange={handleChange}
                  />
                </div>
              </FormSection>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition transform hover:scale-105 shadow-lg"
                disabled={ownedCars.length === 0}
              >
                Publish Your Ride
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
