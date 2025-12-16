"use client";
import { useState } from "react";

interface BookingCardProps {
  price: string;
  availableSeats?: number;
  onReserve?: () => void;
  onContact?: () => void;
  className?: string;
  disabled?: boolean;
  disableReason?: string;
}

export default function BookingCard({
  price,
  availableSeats = 1,
  onReserve,
  onContact,
  className = "",
  disabled = false,
  disableReason,
}: BookingCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isRideFull = availableSeats === 0;
  const isDisabled = disabled || isRideFull;

  return (
    <div
      className={`bg-white border-2 border-blue-100 rounded-xl p-6 ${className}`}
    >
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-gray-900 mb-1">{price} TND</div>
        <div className="text-sm text-gray-600">par passager</div>
      </div>

      <div className="relative">
        <button
          onClick={isDisabled ? undefined : onReserve}
          disabled={isDisabled}
          onMouseEnter={() => isDisabled && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition mb-3 ${
            isDisabled
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 shadow-lg"
          }`}
        >
          {isRideFull
            ? "Trajet complet"
            : disabled
            ? disableReason || "Vous ne pouvez pas réserver votre propre trajet"
            : "Réserver ce trajet"}
        </button>

        {showTooltip && isDisabled && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap z-10">
            {isRideFull
              ? "Ce trajet est complet"
              : disableReason || "Vous ne pouvez pas réserver votre propre trajet"}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>

      <button
        onClick={onContact}
        className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
      >
        Contacter le conducteur
      </button>

      <div className="text-xs text-gray-500 text-center mt-3">
        Annulation gratuite jusqu’à 24h avant le départ
      </div>
    </div>
  );
}
