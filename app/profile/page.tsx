"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api";
import type { UserState } from "../../store/userSlice";
import ProfileCard from "../../components/profile/ProfileCard";
import TripsSection from "../../components/profile/TripsSection";
import CarsSection from "../../components/profile/CarsSection";
import AddCarModal from "../../components/AddCarModal";
import { Car } from "../../components/profile/CarCard";

interface RootState {
  user: UserState;
}

// Même shape que dans AddCarModal
interface CarFormData {
  model: string;
  vehicle_type: string;
  color: string;
  serialNumber: string;
  seats: number;
  engine_type: string;
  greyCard: string;
  year: number;
  image: File | null;
}

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [ownedCars, setOwnedCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offeredRides, setOfferedRides] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  // Réservations
  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await api.get("/api/reservations/");
        const data = Array.isArray(res.data) ? res.data : [];
        const mapped = data.map((item: any) => {
          const post = item.post;
          return {
            id: item.id,
            from: post?.departure_place || "-",
            to: post?.arrival_place || "-",
            date: post?.departure_date || "-",
            driver:
              post?.user?.first_name && post?.user?.last_name
                ? `${post.user.first_name} ${post.user.last_name}`
                : post?.user?.username || "-",
            price: post?.price ? post.price.toString() : "-",
            status: item.status,
            seats: item.nb_place,
          };
        });
        setReservations(mapped);
        console.log("Fetched reservations:", mapped);
      } catch (err) {
        console.error("Failed to fetch reservations", err);
      }
    }
    fetchReservations();
  }, []);

  // Trajets offerts
  useEffect(() => {
    async function fetchOfferedRides() {
      try {
        const res = await api.get("/api/myPosts/");
        const data = res.data;
        const rides = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: item.id,
          from: item.departure_place,
          to: item.arrival_place,
          date: item.departure_date,
          price: item.price,
          seats: item.car?.nb_place ?? 0,
          seatsAvailable: item.nb_places_disponible ?? 0,
          status: item.status,
        }));
        setOfferedRides(rides);
      } catch (err) {
        console.error("Failed to fetch offered rides", err);
      }
    }
    fetchOfferedRides();
  }, []);

  // Voitures possédées
  // useEffect(() => {
  //   async function fetchCars() {
  //     try {
  //       const res = await api.get("/api/cars/");
  //       const data = Array.isArray(res.data) ? res.data : [];
  //       const cars: Car[] = data.map((item: any) => ({
  //         id: item.id,
  //         brand: "", // à compléter si ton API renvoie la marque
  //         model: item.model?.toString() || "",
  //         year: item.year ?? "",
  //         color: item.color || "",
  //         seats: item.nb_place,
  //         fuelType: item.engine_type,
  //         licensePlate: item.serial_number,
  //         image: item.image,
  //       }));
  //       setOwnedCars(cars);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchCars();
  // }, []);
  useEffect(() => {
  async function fetchCars() {
    try {
      const res = await api.get("/api/cars/");
      const data = Array.isArray(res.data) ? res.data : [];
      
      const cars: Car[] = data.map((item: any) => ({
        id: item.id,
        // ✅ UTILISER LES DETAILS NESTED
        brand: item.model_details?.brand?.name || "",
        model: item.model_details?.name || "",
        year: item.year?.toString() || "",
        color: item.color_details?.name || "",
        seats: item.nb_place || 0,
        fuelType: item.engine_type_details?.name || "",
        licensePlate: item.serial_number || "",
        image: item.image || "",
      }));
      
      setOwnedCars(cars);
      console.log("✅ Voitures chargées:", cars);
    } catch (err) {
      console.error("❌ Erreur fetch cars:", err);
    }
  }
  
  fetchCars();
}, []);


  // ✅ Création de voiture côté backend + MAJ state
//   const handleAddCar = async (formData: CarFormData) => {
//     if (!user?.id) {
//       alert("Utilisateur non connecté.");
//       return;
//     }
  
//     try {
//       const data = new FormData();
      
//       data.append("model", formData.model);                 // ID du Model (ex: "1")
//     data.append("type", formData.type);                  // ex: "SUV"
//     data.append("color", formData.color);                // ex: "Silver"
//     data.append("serial_number", formData.serialNumber.toUpperCase());
//     data.append("nb_place", String(formData.seats));     // champ nb_place en DB
//     data.append("engine_type", formData.engineType);     // ex: "Electric"
//     data.append("grey_card", formData.greyCard || "");
//     data.append("year", String(formData.year));          // ex: "2025"
//     if (formData.image) data.append("image", formData.image);

//     console.log("🚗 FormData envoyée:");
//     for (const [k, v] of data.entries()) console.log(k, v);

//     const res = await api.post("/api/cars/", data);

//     const newCar: Car = {
//       id: res.data.id,
//       brand: "", // à remplir si l’API renvoie la marque
//       model: formData.model,
//       year: formData.year,
//       color: formData.color,
//       seats: formData.seats,
//       fuelType: formData.engineType,
//       licensePlate: formData.serialNumber.toUpperCase(),
//       image: res.data.image || "",
//     };

//     setOwnedCars(prev => [...prev, newCar]);
//     setIsModalOpen(false);
//     alert("✅ Voiture ajoutée !");
//   } catch (err: any) {
//     console.error("❌ ERROR /api/cars/:", err.response?.data || err);

//     if (err.response?.data) {
//       const errors = err.response.data as Record<string, any>;
//       let msg = "Erreurs:\n";
//       for (const [field, error] of Object.entries(errors)) {
//         msg += `${field}: ${Array.isArray(error) ? error[0] : error}\n`;
//       }
//       alert(msg);
//     } else {
//       alert("Erreur serveur 500 lors de la création de la voiture.");
//     }
//   }
// };
const handleAddCar = async (formData: CarFormData) => {
  if (!user?.id) {
    alert("Utilisateur non connecté.");
    return;
  }

  console.log("🔍 formData reçu:", formData);

  try {
    const data = new FormData();

    // utiliser les bons champs
    const modelId = formData.model ?? "";
    const vehicleTypeId = formData.vehicle_type ?? "";
    const colorId = formData.color ?? "";
    const engineTypeId = formData.engine_type ?? "";

    console.log("🔍 IDs calculés:", {
      modelId,
      vehicleTypeId,
      colorId,
      engineTypeId,
    });

    if (!modelId || !vehicleTypeId || !colorId || !engineTypeId) {
      alert("Veuillez sélectionner modèle, type, couleur et type de moteur.");
      return;
    }

    data.append("model", String(modelId));
    data.append("vehicle_type", String(vehicleTypeId));
    data.append("color", String(colorId));

    const rawSerial = formData.serialNumber ?? "";
    const serial = String(rawSerial).toUpperCase().trim();
    if (!serial) {
      alert("La plaque (serialNumber) est obligatoire.");
      return;
    }
    data.append("serial_number", serial);

    data.append("nb_place", String(formData.seats ?? ""));
    data.append("engine_type", String(engineTypeId));
    data.append("grey_card", formData.greyCard || "");
    data.append("year", formData.year ? String(formData.year) : "");
    if (formData.image) data.append("image", formData.image);

    console.log("🚗 FormData envoyée:");
    for (const [k, v] of data.entries()) console.log(k, v);

    const res = await api.post("/api/cars/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // construction de newCar…
  } catch (err: any) {
    console.error("❌ ERROR /api/cars/:", err.response?.data || err);
  }
};


//   const handleAddCar = async (formData: CarFormData) => {
//   if (!user?.id) {
//     alert("Utilisateur non connecté.");
//     return;
//   }

//   try {
//     const data = new FormData();

//     data.append("model", formData.model.toString());
//     data.append("vehicle_type", formData.type.toString());
//     data.append("color", formData.color.toString());

//     // ✅ sécuriser serialNumber
//     const serial = (formData.serialNumber || "").toString().toUpperCase().trim();
//     if (!serial) {
//       alert("La plaque d'immatriculation est obligatoire.");
//       return;
//     }
//     data.append("serial_number", serial);

//     data.append("nb_place", String(formData.seats));
//     data.append("engine_type", formData.engineType.toString());
//     data.append("grey_card", formData.greyCard || "");
//     data.append("year", formData.year ? String(formData.year) : "");
//     if (formData.image) data.append("image", formData.image);

//     const res = await api.post("/api/cars/", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const newCar: Car = {
//       id: res.data.id,
//       brand: res.data.model_details?.brand?.name || "",
//       model: res.data.model_details?.name || "",
//       year: res.data.year ?? "",
//       color: res.data.color_details?.name || "",
//       seats: res.data.nb_place,
//       fuelType: res.data.engine_type_details?.name || "",
//       licensePlate: res.data.serial_number || "",
//       image: res.data.image || "",
//     };

//     setOwnedCars(prev => [...prev, newCar]);
//     setIsModalOpen(false);
//     alert("✅ Voiture ajoutée !");
//   } catch (err: any) {
//     console.error("❌ ERROR /api/cars/:", err.response?.data || err);
//     if (err.response?.data) {
//       const errors = err.response.data as Record<string, any>;
//       let msg = "Erreurs:\n";
//       for (const [field, error] of Object.entries(errors)) {
//         msg += `${field}: ${Array.isArray(error) ? error[0] : error}\n`;
//       }
//       alert(msg);
//     } else {
//       alert("Erreur serveur lors de la création de la voiture.");
//     }
//   }
// };


  const handleEditCar = (car: Car) => {
    console.log("Edit car:", car);
  };

  const handleRemoveCar = (carId: number) => {
    setOwnedCars((prev) => prev.filter((car) => car.id !== carId));
  };

  const handleCancelReservation = async (tripId: number) => {
    try {
      await api.put(`/api/reservations/${tripId}/`, { status: "canceled" });
      setReservations((prev: any[]) =>
        prev.map((r) => (r.id === tripId ? { ...r, status: "canceled" } : r))
      );
    } catch (err) {
      console.error("Failed to cancel reservation", err);
    }
  };

  const handleCancelOfferedRide = async (tripId: number) => {
    try {
      await api.put(`/api/posts/${tripId}/`, { status: "canceled" });
      setOfferedRides((prev: any[]) =>
        prev.map((r) => (r.id === tripId ? { ...r, status: "canceled" } : r))
      );
    } catch (err) {
      console.error("Failed to cancel offered ride", err);
    }
  };

  const handleEditOfferedRide = (tripId: number) => {
    console.log("Edit offered ride:", tripId);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {user && <ProfileCard user={user} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TripsSection
            title="My Reservations"
            trips={reservations.filter(
              (r) => r.status?.toLowerCase() !== "canceled"
            )}
            type="reservation"
            onCancel={handleCancelReservation}
          />

          <TripsSection
            title="My Offered Rides"
            trips={offeredRides}
            type="offered"
            onCancel={handleCancelOfferedRide}
            onEdit={handleEditOfferedRide}
          />
        </div>

        <CarsSection
          cars={ownedCars}
          onAddCar={() => setIsModalOpen(true)}
          onEditCar={handleEditCar}
          onRemoveCar={handleRemoveCar}
        />
      </div>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCar}
      />
    </main>
  );
}
