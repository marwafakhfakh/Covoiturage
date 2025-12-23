"use client";
import { useState } from "react";
import api from "../../api/api";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  availableSeats: number;
  onSuccess?: () => void;
}

interface PassengerInfo {
  username: string;
  phoneNumber: string;
}

export default function ReservationModal({
  isOpen,
  onClose,
  postId,
  availableSeats,
  onSuccess,
}: ReservationModalProps) {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    { username: "", phoneNumber: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleSeatsChange = (seats: number) => {
    setSelectedSeats(seats);
    // Update passengers array based on selected seats
    const newPassengers = Array(seats)
      .fill(null)
      .map(
        (_, index) => passengers[index] || { username: "", phoneNumber: "" }
      );
    setPassengers(newPassengers);
  };

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerInfo,
    value: string
  ) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleSubmit = async () => {
    // Validate that all passenger info is filled and phone is 8 digits
    const isValid = passengers.every((passenger) => {
      const phone = passenger.phoneNumber.trim();
      return passenger.username.trim() && /^\d{8}$/.test(phone);
    });

    if (!isValid) {
      setError(
        "Veuillez remplir toutes les informations sur le passager et vous assurer que le téléphone comporte 8 chiffres."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Convert passenger information to JSON string
      const passengersInfo = {
        passengers: passengers.map((passenger, index) => ({
          id: index + 1,
          username: passenger.username.trim(),
          phoneNumber: passenger.phoneNumber.trim(),
        })),
        totalSeats: selectedSeats,
        reservationDate: new Date().toISOString(),
      };

      // Log passenger info for verification
      console.log("Passenger Info:", passengersInfo);
      console.log("JSON String:", JSON.stringify(passengersInfo));

      const response = await api.post("/api/reservations/", {
        post_id: postId,
        nb_place: selectedSeats,
        description: JSON.stringify(passengersInfo),
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Réservation réussie!");
        onSuccess?.();
        setTimeout(() => {
          setSuccessMessage("");
          onClose();
          // Reset form
          setSelectedSeats(1);
          setPassengers([{ username: "", phoneNumber: "" }]);
        }, 1500);
      }
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string; error?: string } };
      };
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to make reservation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedSeats(1);
    setPassengers([{ username: "", phoneNumber: "" }]);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Réservez votre trajet</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {successMessage ? (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-lg text-green-700 font-semibold">
                {successMessage}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {/* Number of Seats Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nombre de places 
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() =>
                        handleSeatsChange(Math.max(1, selectedSeats - 1))
                      }
                      disabled={selectedSeats <= 1}
                      className={`w-10 h-10 rounded-full border-2 font-bold text-lg transition ${
                        selectedSeats <= 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                      }`}
                    >
                      −
                    </button>

                    <div className="flex items-center justify-center w-16 h-16 bg-blue-50 border-2 border-blue-200 rounded-full">
                      <span className="text-2xl font-bold text-blue-700">
                        {selectedSeats}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleSeatsChange(
                          Math.min(
                            Math.min(availableSeats, 4),
                            selectedSeats + 1
                          )
                        )
                      }
                      disabled={selectedSeats >= Math.min(availableSeats, 4)}
                      className={`w-10 h-10 rounded-full border-2 font-bold text-lg transition ${
                        selectedSeats >= Math.min(availableSeats, 4)
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600"
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Places disponibles: {availableSeats}
                  </p>
                </div>

                {/* Passenger Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Informations sur le passager
                  </h3>

                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 mb-4"
                    >
                      <h4 className="font-medium text-gray-700 mb-3">
                        Passager {index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom d'utilisateur
                          </label>
                          <input
                            type="text"
                            value={passenger.username}
                            onChange={(e) =>
                              handlePassengerChange(
                                index,
                                "username",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Entrer le nom d’utilisateur"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Numéro de téléphone
                          </label>
                          <input
                            type="tel"
                            value={passenger.phoneNumber}
                            onChange={(e) =>
                              handlePassengerChange(
                                index,
                                "phoneNumber",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Entrer le numéro de téléphone"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!successMessage && (
          <div className="flex gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={handleClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl font-medium transition ${
                loading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      className="opacity-75"
                    />
                  </svg>
                  Traitement...
                </span>
              ) : (
                "Confirmer la réservation"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
