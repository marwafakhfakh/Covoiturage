// // import { Car } from "lucide-react";

// // interface TripDetailsCardProps {
// //   departure: {
// //     place: string;
// //     date: string;
// //   };
// //   car: string;
// //   availableSeats: number;
// //   className?: string;
// // }

// // export default function TripDetailsCard({
// //   departure,
// //   car,
// //   availableSeats,
// // }: TripDetailsCardProps) {
// //   return (
// //     <div className="space-y-4">
// //       <h2 className="text-2xl font-bold text-gray-900">Détails du voyage</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="bg-gray-50 rounded-xl p-4">
// //           <div className="flex items-center gap-3">
// //             <span className="text-2xl">📅</span>
// //             <div>
// //               <div className="font-semibold text-gray-800">Départ</div>
// //               <div className="text-gray-600">
// //                 {new Date(departure.date).toLocaleDateString("en-US", {
// //                   weekday: "long",
// //                   year: "numeric",
// //                   month: "long",
// //                   day: "numeric",
// //                 })}
// //               </div>
// //               <div className="text-gray-600 font-medium">
// //                 {new Date(departure.date).toLocaleTimeString("en-US", {
// //                   hour: "2-digit",
// //                   minute: "2-digit",
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-gray-50 rounded-xl p-4">
// //           <div className="flex items-center gap-3">
// //             <span className="text-2xl">🚗</span>
// //             <div>
// //               <div className="font-semibold text-gray-800">Véhicule</div>
// //               {/* <div className="text-gray-600">{car}</div> */}
// //               <div className="text-sm text-gray-500">
// //                 {availableSeats} place{availableSeats !== 1 ? "s" : ""} disponible
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { Calendar, Car } from "lucide-react";

// interface CarInfo {
//   brand?: string;
//   model?: string;
//   vehicleType?: string;
//   color?: string;
//   year?: number | string;
//   fullName?: string;
// }

// interface TripDetailsCardProps {
//   departure: {
//     place: string;
//     date: string;
//   };
//   car: CarInfo | null;
//   availableSeats: number;
//   className?: string;
// }

// export default function TripDetailsCard({
//   departure,
//   car,
//   availableSeats,
// }: TripDetailsCardProps) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold text-gray-900">Détails du voyage</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Date de départ */}
//         <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <Calendar className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <div className="font-semibold text-gray-800">Départ</div>
//               <div className="text-gray-600">
//                 {new Date(departure.date).toLocaleDateString("fr-FR", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>
//               <div className="text-gray-600 font-medium">
//                 {new Date(departure.date).toLocaleTimeString("fr-FR", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Informations du véhicule */}
//         <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
//           <div className="flex items-center gap-3">
//             <div className="bg-green-100 p-2 rounded-lg">
//               <Car className="w-6 h-6 text-green-600" />
//             </div>
//             <div className="flex-1">
//               <div className="font-semibold text-gray-800">Véhicule</div>
//               {car ? (
//                 <>
//                   {/* Marque et Modèle */}
//                   {car.fullName && (
//                     <div className="text-gray-900 font-medium">
//                       {car.fullName}
//                     </div>
//                   )}
                  
//                   {/* Type et Couleur */}
//                   <div className="text-sm text-gray-600">
//                     {car.vehicleType && car.color 
//                       ? `${car.vehicleType} • ${car.color}`
//                       : car.vehicleType || car.color || ""}
//                   </div>
                  
//                   {/* Année */}
//                   {car.year && (
//                     <div className="text-xs text-gray-500">
//                       Année: {car.year}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-gray-600">Véhicule non spécifié</div>
//               )}
              
//               {/* Places disponibles */}
//               <div className="text-sm text-green-600 font-semibold mt-1">
//                 {availableSeats} place{availableSeats !== 1 ? "s" : ""} disponible{availableSeats !== 1 ? "s" : ""}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Calendar, Car } from "lucide-react";

interface CarInfo {
  brand?: string;
  model?: string;
  vehicleType?: string;
  color?: string;
  year?: number | string;
  fullName?: string;
  serial_number?: string;
}

interface TripDetailsCardProps {
  departure: {
    place: string;
    date: string;
  };
  car: CarInfo | null;
  availableSeats: number;
  className?: string;
}

export default function TripDetailsCard({
  departure,
  car,
  availableSeats,
}: TripDetailsCardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Détails du voyage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date de départ */}
        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Départ</div>
              <div className="text-gray-600">
                {new Date(departure.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </div>
              <div className="text-gray-600 font-medium">
                {new Date(departure.date).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Informations du véhicule */}
        <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Véhicule</div>
              {car ? (
                <>
                  {/* Marque et Modèle */}
                  {car.fullName && (
                    <div className="text-gray-900 font-medium">
                      {car.fullName}
                    </div>
                  )}
                 
                  {/* Type et Couleur */}
                  <div className="text-sm text-gray-600">
                    {car.serial_number && car.color
                      ? `${car.serial_number} • ${car.color}`
                      : car.serial_number || car.color || ""}
                  </div>
                  
                  {/* Année */}
                  {car.year && (
                    <div className="text-xs text-gray-500">
                      Année: {car.year}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-600">Véhicule non spécifié</div>
              )}
              
              {/* Places disponibles */}
              <div className="text-sm text-green-600 font-semibold mt-1">
                {availableSeats} place{availableSeats !== 1 ? "s" : ""} disponible{availableSeats !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}