"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

import FormSection from "../../components/offer/FormSection";
import SuccessMessage from "../../components/common/SuccessMessage";
import api from "../../api/api";
import type { RootState } from "../../store";
import type { Delegation } from "./DelegationMapLeaflet";
import LocationAutocomplete from "./LocationAutocomplete";

const RouteMapLeaflet = dynamic(() => import("./RouteMapLeaflet"), { ssr: false });
const SingleLocationMap = dynamic(() => import("./SingleLocationMapProps"), { ssr: false });

type Car = {
  id: number;
  model_details?: {
    id: number;
    name: string;
    brand: { id: number; name: string };
  } | null;
  type: string;
  color: string;
  color_details?: { id: number; name: string; code: string } | null;
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

  const getDefaultDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    return now.toISOString().slice(0, 16);
  };

  const [form, setForm] = useState<OfferForm>({
    departure_place: "",
    arrival_place: "",
    departure_date: getDefaultDateTime(),
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

  const [priceManuallyEdited, setPriceManuallyEdited] = useState(false);
  const [lastSuggestedPrice, setLastSuggestedPrice] = useState<string | null>(null);

  // 📍 Coordonnées
  const [preciseDepartureCoords, setPreciseDepartureCoords] =
    useState<{ lat: number; lng: number } | null>(null);
  const [preciseArrivalCoords, setPreciseArrivalCoords] =
    useState<{ lat: number; lng: number } | null>(null);

  // 📡 GPS
  const [geoLoading, setGeoLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // 🔹 Fetch data
  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      try {
        const [carsRes, servicesRes, delegationsRes] = await Promise.all([
          api.get("/api/cars/"),
          api.get("/api/services/"),
          api.get("/api/delegations/"),
        ]);

        setOwnedCars(carsRes.data.results || carsRes.data || []);
        setServices(servicesRes.data.results || servicesRes.data || []);
        setDelegations(delegationsRes.data.results || delegationsRes.data || []);
      } catch {
        setError("Impossible de charger les données.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  // 🔄 Reset GPS si changement manuel
  useEffect(() => {
    if (!useCurrentLocation) {
      setPreciseDepartureCoords(null);
    }
  }, [form.departure_place]);

  useEffect(() => setPreciseArrivalCoords(null), [form.arrival_place]);

  // 🔹 Form change
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "price") setPriceManuallyEdited(true);
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "departure_place") setUseCurrentLocation(false);
  };

  // 📌 Gestion des services cochés/décochés
  const handleServiceChange = (serviceId: number) => {
    setForm((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  };

  // 📍 GPS handler
  const handleUseCurrentLocation = () => {
    setError(null);
    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPreciseDepartureCoords({ lat, lng });
        setUseCurrentLocation(true);

        setForm((prev) => ({
          ...prev,
          departure_place: "Ma position actuelle",
        }));

        setGeoLoading(false);
      },
      () => {
        setError("Impossible de récupérer votre position.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  // 💰 Prix auto
  const handleDistanceCalculated = (_: number, suggestedPrice: number) => {
    if (priceManuallyEdited) return;
    const price = suggestedPrice.toFixed(1);
    if (price === lastSuggestedPrice) return;
    setLastSuggestedPrice(price);
    setForm((p) => ({ ...p, price }));
  };

  const selectedCar = ownedCars.find(
    (c) => c.id === parseInt(form.selected_car_id)
  );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Partager votre trajet
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success ? (
            <SuccessMessage
              title="Trajet publié !"
              description="Votre trajet est maintenant disponible."
              actionText="Publier un autre trajet"
              onAction={() => setSuccess(false)}
            />
          ) : loading ? (
            <div className="text-center py-12">Chargement…</div>
          ) : (
            <form className="space-y-8">
              <FormSection title="Route Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LocationAutocomplete
                    name="departure_place"
                    value={form.departure_place}
                    onChange={handleChange}
                    delegations={delegations}
                    label="Départ"
                    placeholder="Choisir le lieu de départ"
                    required
                  />
                  <LocationAutocomplete
                    name="arrival_place"
                    value={form.arrival_place}
                    onChange={handleChange}
                    delegations={delegations}
                    label="Arrivée"
                    placeholder="Choisir le lieu d’arrivée"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Carte Départ avec bouton 📍 */}
                  <SingleLocationMap
                    delegations={delegations}
                    selectedLocation={useCurrentLocation ? null : form.departure_place}
                    preciseCoords={preciseDepartureCoords}
                    label="🚗 Départ"
                    markerColor="departure"
                    onUpdateFormField={(value, lat, lng) => {
                      setForm(prev => ({ ...prev, departure_place: value }));
                      setPreciseDepartureCoords({ lat, lng });
                      setUseCurrentLocation(true);
                    }}
                  />

                  {/* Carte Arrivée */}
                  <SingleLocationMap
                    delegations={delegations}
                    selectedLocation={form.arrival_place || null}
                    preciseCoords={preciseArrivalCoords}
                    label="🎯 Arrivée"
                    markerColor="arrival"
                  />
                </div>

                <RouteMapLeaflet
                  delegations={delegations}
                  departureName={form.departure_place}
                  arrivalName={form.arrival_place}
                  preciseDepartureCoords={preciseDepartureCoords}
                  preciseArrivalCoords={preciseArrivalCoords}
                  onDistanceCalculated={handleDistanceCalculated}
                />
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
                      {!priceManuallyEdited && form.price && (
                        <span className="ml-2 text-xs text-blue-600">✨ Auto-calculé</span>
                      )}
                    </label>
                    <input
                      name="price"
                      placeholder="Prix calculé automatiquement"
                      type="number"
                      min="1"
                      step="0.5"
                      value={form.price}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    />
                    {priceManuallyEdited && (
                      <p className="text-xs text-gray-500 mt-1">
                        Prix modifié manuellement
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Sièges disponibles
                    </label>
                    <select
                      name="nb_places_disponible"
                      value={form.nb_places_disponible}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
                      onChange={handleChange}
                      required
                    >
                      {!selectedCar && <option value="" disabled>Choisir une voiture</option>}
                      {selectedCar && (
                        <>
                          <option value="">Choisir les sièges</option>
                          {Array.from({ length: selectedCar.nb_place - 1 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num.toString()}>
                              {num} seat{num > 1 ? "s" : ""}
                            </option>
                          ))}
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
                          {car.model_details?.brand.name || "Voiture"} {car.model_details?.name} ({car.year || "-"}){" - "}
                          {car.color_details?.name} - {car.serial_number}
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
                    <label key={service.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.services.includes(service.id)}
                        onChange={() => handleServiceChange(service.id)}
                        className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{service.name}</span>
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
                    placeholder="Mettre des informations additionnelles pour votre trajets, preferences et details."
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
