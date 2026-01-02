// import Link from "next/link";

// interface TripItemProps {
//   trip: {
//     id: number;
//     from: string;
//     to: string;
//     date: string;
//     price: string;
//     status: string;
//     seats?: number;
//     driver?: string;
//     bookedSeats?: number;
//     seatsAvailable?: number;
//   };
//   type: "reservation" | "offered";
//   onCancel?: (tripId: number) => void;
//   onEdit?: (tripId: number) => void;
// }

// interface TripsSectionProps {
//   title: string;
//   trips: TripItemProps["trip"][];
//   type: "reservation" | "offered";
//   onCancel?: (tripId: number) => void;
//   onEdit?: (tripId: number) => void;
//   className?: string;
// }

// function TripItem({ trip, type, onCancel, onEdit }: TripItemProps) {
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "confirmed":
//       case "active":
//         return "bg-black text-white";
//       case "pending":
//         return "bg-gray-300 text-gray-700";
//       case "completed":
//       case "full":
//         return "bg-gray-100 text-gray-700";
//       default:
//         return "bg-gray-300 text-gray-700";
//     }
//   };

//   // Deterministic UTC date formatting
//   const dateObj = new Date(trip.date);
//   const dateStr =
//     dateObj.getUTCFullYear() +
//     "-" +
//     String(dateObj.getUTCMonth() + 1).padStart(2, "0") +
//     "-" +
//     String(dateObj.getUTCDate()).padStart(2, "0");
//   const timeStr =
//     String(dateObj.getUTCHours()).padStart(2, "0") +
//     ":" +
//     String(dateObj.getUTCMinutes()).padStart(2, "0");

//   const content = (
//     <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <div className="font-semibold text-lg text-gray-900">
//             {trip.from} <span className="text-gray-400">→</span> {trip.to}
//           </div>
//           <div className="text-gray-600 text-sm">
//   {dateStr} à {timeStr}H
// </div>
//           {type === "reservation" && trip.driver && (
//             <div className="text-gray-600 text-sm">
//               with <span className="font-medium">{trip.driver}</span>
//             </div>
//           )}
//           {type === "offered" && (
//             <div className="text-gray-600 text-sm">
//               {trip.status?.toLowerCase() === "full"
//                 ? `Full${
//                     typeof trip.seatsAvailable === "number" &&
//                     trip.seatsAvailable > 0
//                       ? ` (${trip.seatsAvailable} available)`
//                       : ""
//                   }`
//                 : typeof trip.seatsAvailable === "number"
//                 ? `${trip.seatsAvailable} seats available`
//                 : "-"}
//             </div>
//           )}
//         </div>
//         <div className="text-right">
//           <div className="text-lg font-bold text-gray-900">{trip.price} TND</div>
//           {type === "reservation" && trip.seats && (
//             <div className="text-sm text-gray-600">
//               {trip.seats} seat{trip.seats !== 1 ? "s" : ""}
//             </div>
//           )}
//           {type === "offered" && (
//             <div className="text-sm text-gray-600">par place</div>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//             trip.status
//           )}`}
//         >
//           {trip.status}
//         </span>
//         <div className="flex gap-2">
//           {onCancel && trip.status?.toLowerCase() !== "canceled" && (
//             <button
//               onClick={() => onCancel(trip.id)}
//               className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 rounded px-2 py-1"
//             >
//               Supprimer
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   if (type === "offered") {
//     return (
//       <Link
//         href={`/rides/${trip.id}`}
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         {content}
//       </Link>
//     );
//   }
//   return content;
// }

// export default function TripsSection({
//   title,
//   trips,
//   type,
//   onCancel,
//   onEdit,
//   className = "",
// }: TripsSectionProps) {
//   return (
//     <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
//       <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
//         {trips.map((trip) => (
//           <TripItem
//             key={trip.id}
//             trip={trip}
//             type={type}
//             onCancel={onCancel}
//             onEdit={onEdit}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { useState } from "react";

interface TripItemProps {
  trip: {
    id: number;
    from: string;
    to: string;
    date: string;
    price: string;
    status: string;
    seats?: number;
    driver?: string;
    bookedSeats?: number;
    seatsAvailable?: number;
  };
  type: "reservation" | "offered";
  onCancel?: (tripId: number) => Promise<void>;
  onEdit?: (tripId: number) => void;
}

interface TripsSectionProps {
  title: string;
  trips: TripItemProps["trip"][];
  type: "reservation" | "offered";
  onCancel?: (tripId: number) => Promise<void>;
  onEdit?: (tripId: number) => void;
  className?: string;
}

function TripItem({ trip, type, onCancel, onEdit }: TripItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "active":
        return "bg-black text-white";
      case "pending":
        return "bg-gray-300 text-gray-700";
      case "completed":
      case "full":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  // Deterministic UTC date formatting
  const dateObj = new Date(trip.date);
  const dateStr =
    dateObj.getUTCFullYear() +
    "-" +
    String(dateObj.getUTCMonth() + 1).padStart(2, "0") +
    "-" +
    String(dateObj.getUTCDate()).padStart(2, "0");
  const timeStr =
    String(dateObj.getUTCHours()).padStart(2, "0") +
    ":" +
    String(dateObj.getUTCMinutes()).padStart(2, "0");

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation si dans un Link
    e.stopPropagation();

    if (!onCancel) return;

    const confirmMessage = type === "offered" 
      ? "Êtes-vous sûr de vouloir supprimer ce trajet ?"
      : "Êtes-vous sûr de vouloir annuler cette réservation ?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsDeleting(true);
    try {
      await onCancel(trip.id);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
      setIsDeleting(false);
    }
  };

  const content = (
    <div 
      className={`border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer ${
        isDeleting ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-semibold text-lg text-gray-900">
            {trip.from} <span className="text-gray-400">→</span> {trip.to}
          </div>
          <div className="text-gray-600 text-sm">
            {dateStr} à {timeStr}H
          </div>
          {type === "reservation" && trip.driver && (
            <div className="text-gray-600 text-sm">
              with <span className="font-medium">{trip.driver}</span>
            </div>
          )}
          {type === "offered" && (
            <div className="text-gray-600 text-sm">
              {trip.status?.toLowerCase() === "full"
                ? `Full${
                    typeof trip.seatsAvailable === "number" &&
                    trip.seatsAvailable > 0
                      ? ` (${trip.seatsAvailable} available)`
                      : ""
                  }`
                : typeof trip.seatsAvailable === "number"
                ? `${trip.seatsAvailable} seats available`
                : "-"}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{trip.price} TND</div>
          {type === "reservation" && trip.seats && (
            <div className="text-sm text-gray-600">
              {trip.seats} seat{trip.seats !== 1 ? "s" : ""}
            </div>
          )}
          {type === "offered" && (
            <div className="text-sm text-gray-600">par place</div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            trip.status
          )}`}
        >
          {trip.status}
        </span>
        <div className="flex gap-2">
          {onCancel && trip.status?.toLowerCase() !== "canceled" && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`text-sm font-medium border rounded px-3 py-1 transition ${
                isDeleting
                  ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                  : 'text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200'
              }`}
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <svg 
                    className="animate-spin h-4 w-4" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Suppression...
                </span>
              ) : (
                'Supprimer'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (type === "offered") {
    return (
      <Link
        href={`/rides/${trip.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </Link>
    );
  }
  return content;
}

export default function TripsSection({
  title,
  trips,
  type,
  onCancel,
  onEdit,
  className = "",
}: TripsSectionProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      {trips.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Aucun trajet pour le moment</p>
          {type === "offered" && (
            <p className="text-sm mt-2">
              Commencez par proposer un trajet !
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {trips.map((trip) => (
            <TripItem
              key={trip.id}
              trip={trip}
              type={type}
              onCancel={onCancel}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}