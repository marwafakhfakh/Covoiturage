"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TripDetailsCard from "../../../components/rides/TripDetailsCard";
import RouteMap from "../../../components/rides/RouteMap";
import ServicesDisplay from "../../../components/rides/ServicesDisplay";
import DriverInfoCard from "../../../components/rides/DriverInfoCard";
import BookingCard from "../../../components/rides/BookingCard";
import TripImpactCard from "../../../components/rides/TripImpactCard";
import ReservationModal from "../../../components/rides/ReservationModal";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import api from "../../../api/api";

import React from "react";

interface RideData {
  id: number;
  departure_place: string;
  arrival_place: string;
  departure_date: string;
  price: number;
  nb_places_disponible: number;
  details?: string;
  user?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    avatar?: string;
    profile_picture?: string;
    review_score?: number;
    review_numbers?: number;
    joining_date?: string;
    date_joined?: string;
    phone_number?: string;
    email?: string;
    professional?: boolean;
  };
  car?: {
    model?: {
      name?: string;
    };
    type?: string;
    color?: string;
  };
  services?: Array<{
    name: string;
  }>;
}

export default function RideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [ride, setRide] = useState<RideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  // Get current user from Redux store
  const currentUser = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .get(`/api/posts/${id}/`)
      .then((res) => {
        setRide(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !ride) return notFound();

  // Check if current user is the owner of the ride
  //const isRideOwner = currentUser && ride.user?.id === currentUser.id;
  const isRideOwner = !!(currentUser && ride && ride.user?.id === currentUser.id);


  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-xl">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-xl">
          ☆
        </span>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i} className="text-gray-300 text-xl">
          ☆
        </span>
      );
    }
    return stars;
  };

  const parseReservationDetails = (details: string | undefined) => {
    if (!details) return [];

    try {
      // Split by newlines and parse each JSON line
      const lines = details.split("\n").filter((line) => line.trim());
      return lines.map((line) => JSON.parse(line));
    } catch (error) {
      console.error("Error parsing reservation details:", error);
      return [];
    }
  };

  interface ReservationDetail {
    passengers: Array<{
      id: number;
      username: string;
      phoneNumber: string;
    }>;
    totalSeats: number;
    reservationDate: string;
  }

  const handleReserve = () => {
    setIsReservationModalOpen(true);
  };

  const handleReservationSuccess = () => {
    // Refresh ride data to update available seats
    api
      .get(`/api/posts/${id}/`)
      .then((res) => {
        setRide(res.data);
      })
      .catch(console.error);
  };

  const handleContact = () => {
    console.log(
      "Contact driver:",
      ride.user?.first_name || ride.user?.username
    );
    alert("Contact functionality would be implemented here");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/rides"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition"
        >
          ← Retour aux trajets
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Image
                src={
                  ride.user?.avatar ||
                  ride.user?.profile_picture ||
                  "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                alt={ride.user?.first_name || ride.user?.username || "Driver"}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {ride.departure_place} → {ride.arrival_place}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-semibold text-lg text-gray-800">
                    {ride.user?.first_name} {ride.user?.last_name}{" "}
                    {ride.user?.professional && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                        Pro
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(ride.user?.review_score || 0)}
                    <span className="ml-1">
                      ({ride.user?.review_score?.toFixed(1) || "0.0"})
                    </span>
                  </div>
                  <span>• {ride.user?.review_numbers || 0} Avis</span>
                  {/* <span>
                    • Member since{" "}
                    {ride.user?.joining_date?.slice(0, 4) ||
                      ride.user?.date_joined?.slice(0, 4) ||
                      "-"}
                  </span> */}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {ride.price} TND
                </div>
                <div className="text-sm text-gray-600">par place</div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                <TripDetailsCard
                  departure={{
                    place: ride.departure_place,
                    date: ride.departure_date,
                  }}
                  car={
                    ride.car?.model?.name
                      ? `${ride.car.model.name} (${ride.car.type}, ${ride.car.color})`
                      : `${ride.car?.type || ""}, ${ride.car?.color || ""}`
                  }
                  availableSeats={ride.nb_places_disponible}
                />

                <RouteMap from={ride.departure_place} to={ride.arrival_place} />

                <ServicesDisplay
                  services={
                    ride.services?.map((s: { name: string }) => s.name) || []
                  }
                />

                {/* Reservation Details */}
                {ride.details && isRideOwner && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Détails de la réservation
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      {parseReservationDetails(ride.details).map(
                        (reservation: ReservationDetail, index) => (
                          <div
                            key={index}
                            className="mb-4 p-4 bg-white rounded-lg border border-gray-200"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  Passagers
                                </h4>
                                {reservation.passengers?.map(
                                  (passenger, passengerIndex: number) => (
                                    <div
                                      key={passengerIndex}
                                      className="text-sm text-gray-600"
                                    >
                                      <p>
                                        <span className="font-medium">
                                          Nom:
                                        </span>{" "}
                                        {passenger.username}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Téléphone:
                                        </span>{" "}
                                        {passenger.phoneNumber}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Nombre total de places
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {reservation.totalSeats}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  Date de réservation
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    reservation.reservationDate
                                  ).toLocaleDateString()}{" "}
                                  {new Date(
                                    reservation.reservationDate
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Optionally, pickup points if available in API */}
                {/* <PickupPoints points={ride.pickupPoints || []} /> */}

                {/* Description (if you have a description field in API) */}
                {/* <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Description
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed">
                      {ride.description}
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <DriverInfoCard
                  driver={{
                    name:
                      `${ride.user?.first_name || ""} ${
                        ride.user?.last_name || ""
                      }`.trim() ||
                      ride.user?.username ||
                      "Unknown",
                    avatar:
                      ride.user?.avatar ||
                      ride.user?.profile_picture ||
                      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
                    rating: ride.user?.review_score || 0,
                    totalTrips: ride.user?.review_numbers || 0,
                    memberSince:
                      ride.user?.joining_date?.slice(0, 4) ||
                      ride.user?.date_joined?.slice(0, 4) ||
                      "-",
                    phoneVerified: !!ride.user?.phone_number,
                    emailVerified: !!ride.user?.email,
                  }}
                />

                <BookingCard
                  price={ride.price.toString()}
                  availableSeats={ride.nb_places_disponible}
                  onReserve={handleReserve}
                  onContact={handleContact}
                  disabled={isRideOwner}
                  disableReason={
                    isRideOwner ? "Vous ne pouvez pas réserver votre propre trajet" : undefined
                  }
                />

                <TripImpactCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        postId={parseInt(id)}
        availableSeats={ride?.nb_places_disponible || 0}
        onSuccess={handleReservationSuccess}
      />
    </main>
  );
}
