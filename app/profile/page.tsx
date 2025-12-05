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

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const [ownedCars, setOwnedCars] = useState<Car[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offeredRides, setOfferedRides] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

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

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await api.get("/api/cars/");
        const data = Array.isArray(res.data) ? res.data : [];
        const cars: Car[] = data.map((item: any) => ({
          id: item.id,
          brand: "", // You may want to fetch brand/model names separately if needed
          model: item.model?.toString() || "",
          year: item.year ?? "",
          color: item.color || "",
          seats: item.nb_place,
          fuelType: item.engine_type,
          licensePlate: item.serial_number,
          image: item.image,
        }));
        setOwnedCars(cars);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCars();
  }, []);

  const handleAddCar = (carData: Omit<Car, "id">) => {
    const newCar: Car = {
      ...carData,
      id: Math.max(...ownedCars.map((car) => car.id), 0) + 1,
    };
    setOwnedCars([...ownedCars, newCar]);
  };

  const handleEditCar = (car: Car) => {
    console.log("Edit car:", car);
  };

  const handleRemoveCar = (carId: number) => {
    setOwnedCars(ownedCars.filter((car) => car.id !== carId));
  };

  const handleCancelReservation = async (tripId: number) => {
    try {
      await api.put(`/api/reservations/${tripId}/`, { status: "canceled" });
      setReservations((prev: any[]) =>
        prev.map((r) => (r.id === tripId ? { ...r, status: "canceled" } : r))
      );
    } catch (err) {
      console.error("Failed to cancel reservation", err);
      // Optionally show an error message to the user
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
      // Optionally show an error message to the user
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
