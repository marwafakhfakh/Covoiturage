"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FormSection from "../../components/offer/FormSection";
import SuccessMessage from "../../components/common/SuccessMessage";
import api from "../../api/api";
import type { RootState } from "../../store";
import dynamic from "next/dynamic";               // ✅ ajouté

// import DelegationMap, { Delegation } from "./DelegationMap";
// import DelegationMapLeaflet, { Delegation } from "./DelegationMapLeaflet";

// import RouteMapLeaflet from "./RouteMapLeaflet";
const RouteMapLeaflet = dynamic(() => import("./RouteMapLeaflet"), {
  ssr: false,
});
import type { Delegation } from "./DelegationMapLeaflet";


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

type OfferForm = {
  departure_place: string;
  arrival_place: string;
  departure_date: string;
  price: string;
  nb_places_disponible: string;
  selected_car_id: string;
  services: number[];
  description: string;
};

export default function OfferRidePage() {
  
  const user = useSelector((state: RootState) => state.user.user);

  const [form, setForm] = useState<OfferForm>({
    departure_place: "",
    arrival_place: "",
    departure_date: "",
    price: "",
    nb_places_disponible: "",
    selected_car_id: "",
    services: [],
    description: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ownedCars, setOwnedCars] = useState<Car[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [loading, setLoading] = useState(true);

  // Pour l’instant on ne recalcule pas la distance avec lat/lng
  // const distanceKm = 0;
  // const estimatedPrice = 0;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [carsRes, servicesRes, delegationsRes] = await Promise.all([
          api.get("/api/cars/"),
          api.get("/api/services/"),
          api.get("/api/delegations/"),
        ]);

        const cars = Array.isArray(carsRes.data)
          ? carsRes.data
          : carsRes.data.results || [];

        const delegs = Array.isArray(delegationsRes.data)
          ? delegationsRes.data
          : delegationsRes.data.results || [];

        setOwnedCars(cars);
        setServices(servicesRes.data.results || servicesRes.data || []);
        setDelegations(delegs);
      } catch (error) {
        console.error("Error fetching data for offer page:", error);
        setError("Unable to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (serviceId: number) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const selectedCar = ownedCars.find(
      (car) => car.id === parseInt(form.selected_car_id)
    );

    try {
      await api.post("/api/posts/", {
        ...form,
        user: user?.id,
        car: selectedCar?.id,
        status: "open",
        services: form.services,
      });
      setSuccess(true);
    } catch (err) {
      console.error('❌ Error publishing ride:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { detail?: string; [key: string]: unknown } } };
        const detail = error.response?.data?.detail;
        const allErrors = error.response?.data 
          ? Object.values(error.response.data).flat().join(" ")
          : "";
        setError(detail || allErrors || "An error occurred while publishing your ride.");
      } else {
        setError("An error occurred while publishing your ride.");
      }}
  };

  const selectedCar = ownedCars.find(
    (car) => car.id === parseInt(form.selected_car_id)
  );

   //const [departureQuery] = useState('');

  // const filteredDepartureDelegations = delegations.filter((d) => d.name.toLowerCase().includes(departureQuery.toLowerCase())
  // );


  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Partger votre trajet
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
              <FormSection title="Route Information">
                  {/* Bloc carte Leaflet au-dessus des selects */}
                  <RouteMapLeaflet
                    delegations={delegations}
                    departureName={form.departure_place}
                    arrivalName={form.arrival_place}
                  />

                  {/* Tes selects restent comme avant dessous */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                      {/* <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Departure Location
                        </label>

                        <input
                          type="text"
                          value={departureQuery}
                          onChange={(e) => setDepartureQuery(e.target.value)}
                          placeholder="Rechercher une délégation..."
                          className="w-full mb-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />

                        <select
                          name="departure_place"
                          value={form.departure_place}
                          onChange={handleChange}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
                          required
                        >
                          <option value="">Select departure</option>
                          {filteredDepartureDelegations.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div> */}

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
                    </div>
                  </div>
                </FormSection>


              {/* Trip Details Section */}
              <FormSection title="Planning et Disponibilité">
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
                      Prix du siège (TND)
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
                      Siège disponibles
                    </label>
                    <select
                      name="nb_places_disponible"
                      value={form.nb_places_disponible}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choisir les sièges</option>
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
                          <option value="1">1 Place</option>
                          <option value="2">2 Places</option>
                          <option value="3">3 Places</option>
                          <option value="4">4 Places</option>
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
                      Choisir votre voiture
                    </label>
                    <select
                      name="selected_car_id"
                      value={form.selected_car_id}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Choisir une voiture depuis votre collection
                      </option>
                      {ownedCars.map((car) => (
                        <option key={car.id} value={car.id.toString()}>
                          {car.model?.name || "Voiture "} ({car.year || "-"})
                          {" - "}
                          {car.color} - {car.serial_number}
                        </option>
                      ))}
                    </select>
                  </div>

                  {ownedCars.length === 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                      <div className="text-gray-400 text-4xl mb-3">🚗</div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Aucune voiture disponible
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Vous devez ajouter un véhicule à votre compte avant de proposer des trajets.
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
                        onClick={() => (window.location.href = "/profile")}
                      >
                        Ajouter un véhicule
                      </button>
                    </div>
                  )}
                </div>
              </FormSection>

              {/* Services Section */}
              <FormSection title="Services & accessoires">
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
              <FormSection title="Information supplémentaire">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    placeholder="Mettre des informations additionnelles pour votre trajets, préférences et détails."
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
                Publier votre trajet
                            </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}


