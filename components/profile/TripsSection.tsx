import Link from "next/link";

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
  onCancel?: (tripId: number) => void;
  onEdit?: (tripId: number) => void;
}

interface TripsSectionProps {
  title: string;
  trips: TripItemProps["trip"][];
  type: "reservation" | "offered";
  onCancel?: (tripId: number) => void;
  onEdit?: (tripId: number) => void;
  className?: string;
}

function TripItem({ trip, type, onCancel, onEdit }: TripItemProps) {
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

  const content = (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
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
              onClick={() => onCancel(trip.id)}
              className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 rounded px-2 py-1"
            >
              Supprimer
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
    </div>
  );
}
// import { useState } from "react";
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

// // Composant Modal de Confirmation
// function ConfirmDeleteModal({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   tripInfo 
// }: { 
//   isOpen: boolean; 
//   onClose: () => void; 
//   onConfirm: () => void;
//   tripInfo: { from: string; to: string; date: string };
// }) {
//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div 
//         className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//             <svg 
//               className="w-6 h-6 text-red-600" 
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
//               />
//             </svg>
//           </div>
//           <div>
//             <h3 className="text-lg font-bold text-gray-900">
//               Confirmer la suppression
//             </h3>
//           </div>
//         </div>
        
//         <div className="mb-6">
//           <p className="text-gray-600 mb-3">
//             Êtes-vous sûr de vouloir supprimer ce trajet ?
//           </p>
//           <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//             <p className="text-sm font-semibold text-gray-900">
//               {tripInfo.from} → {tripInfo.to}
//             </p>
//             <p className="text-sm text-gray-600">{tripInfo.date}</p>
//           </div>
//           <p className="text-sm text-red-600 mt-3">
//             Cette action est irréversible.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
//           >
//             Annuler
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
//           >
//             Supprimer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TripItem({ trip, type, onCancel, onEdit }: TripItemProps) {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);

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

//   const handleDeleteClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowConfirmModal(true);
//   };

//   const handleConfirmDelete = () => {
//     setShowConfirmModal(false);
//     if (onCancel) {
//       onCancel(trip.id);
//     }
//   };

//   const handleCardClick = (e: React.MouseEvent) => {
//     // Empêcher la navigation si le modal est ouvert
//     if (showConfirmModal || isNavigating) {
//       e.preventDefault();
//       return;
//     }
    
//     // Pour les trajets offerts, naviguer vers la page de détails
//     if (type === "offered") {
//       setIsNavigating(true);
//       window.location.href = `/rides/${trip.id}`;
//     }
//   };

//   const content = (
//     <div 
//       className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
//       onClick={handleCardClick}
//     >
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <div className="font-semibold text-lg text-gray-900">
//             {trip.from} <span className="text-gray-400">→</span> {trip.to}
//           </div>
//           <div className="text-gray-600 text-sm">
//             {dateStr} à {timeStr}H
//           </div>
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
//               onClick={handleDeleteClick}
//               className="text-sm text-red-600 hover:text-red-800 font-medium border border-red-200 rounded px-3 py-1 hover:bg-red-50 transition"
//             >
//               Supprimer
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Modal de confirmation */}
//       <ConfirmDeleteModal
//         isOpen={showConfirmModal}
//         onClose={() => setShowConfirmModal(false)}
//         onConfirm={handleConfirmDelete}
//         tripInfo={{
//           from: trip.from,
//           to: trip.to,
//           date: `${dateStr} à ${timeStr}H`
//         }}
//       />
//     </div>
//   );

//   // Retourner directement le contenu sans Link
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