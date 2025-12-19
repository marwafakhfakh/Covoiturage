// import Image from "next/image";

// export interface Car {
//   id: number;
//   brand: string;
//   model: string;
//   year: number | string; // ✅ Accepte number OU string
//   color: string;
//   seats: number;
//   fuelType: string;
//   licensePlate: string;
//   image: string;
// }

// interface CarCardProps {
//   car: Car;
//   onEdit?: (car: Car) => void;
//   onRemove?: (carId: number) => void;
//   className?: string;
// }

// export default function CarCard({
//   car,
//   onEdit,
//   onRemove,
//   className = "",
// }: CarCardProps) {
//   return (
//     <div
//       className={`border border-gray-200 rounded-xl p-6 hover:shadow-md transition ${className}`}
//     >
//       <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
//         <Image
//           src={
//             car.image
//               ? car.image
//               : "https://t3.ftcdn.net/jpg/01/71/13/24/360_F_171132449_uK0OO5XHrjjaqx5JUbJOIoCC3GZP84Mt.jpg"
//           }
//           alt={`${car.brand} ${car.model}`}
//           width={400}
//           height={225}
//           className="w-full h-full object-cover"
//         /> */{"}"}
//       </div>

//       <div className="space-y-3">
//         <div>
//           <h3 className="font-bold text-lg text-gray-900">
//             {car.brand} {car.model}
//           </h3>
//           <p className="text-gray-600 text-sm">
//             {car.year} • {car.color}
//           </p>
//         </div>

//         <div className="flex items-center gap-4 text-sm text-gray-600">
//           <div className="flex items-center gap-1">
//             <span>👥</span>
//             <span>{car.seats} places</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <span>⛽</span>
//             <span>{car.fuelType}</span>
//           </div>
//         </div>

//         <div className="text-sm text-gray-600">
//           <span className="font-medium">Immatriculation:</span> {car.licensePlate}
//         </div>

//         <div className="flex gap-2 pt-2">
//           <button
//             onClick={() => onEdit?.(car)}
//             className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
//           >
//             Modifier
//           </button>
//           <button
//             onClick={() => onRemove?.(car.id)}
//             className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
//           >
//             Supprimer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/profile/CarCard.tsx
import { useState } from "react";
import Image from "next/image";
import EditCarModal from "./EditCarModal";
import api from "../../api/api";

// ============================================================================
// INTERFACE CAR
// ============================================================================

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number | string;
  color: string;
  seats: number;
  fuelType: string;
  licensePlate: string;
  image: string;
  
  // Données brutes pour le modal (IDs)
  vehicle_type?: number;
  color_id?: number;
  engine_type?: number;
  model_id?: number;
  nb_place?: number;
  serial_number?: string;
  grey_card?: string;
}

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
  onRemove?: (carId: number) => void;
  className?: string;
}

// ============================================================================
// COMPOSANT CAR CARD
// ============================================================================

export default function CarCard({
  car,
  onEdit,
  onRemove,
  className = "",
}: CarCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ouvrir le modal
  const handleEditClick = () => {
    console.log("🔧 Ouverture du modal pour:", car);
    setIsModalOpen(true);
  };

  // Callback après succès de modification
  const handleSuccess = () => {
    console.log("✅ Modification réussie");
    if (onEdit) {
      onEdit(car);
    }
    // Recharger la page pour voir les changements
    window.location.reload();
  };

  // Supprimer la voiture
  const handleRemoveClick = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return;
    }

    setIsDeleting(true);

    try {
      await api.delete(`/api/cars/${car.id}/`);

      ('✅ Voiture supprimée avec succès !');
      
      if (onRemove) {
        onRemove(car.id);
      }
      
      window.location.reload();
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('❌ Erreur lors de la suppression du véhicule');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        className={`border border-gray-200 rounded-xl p-6 hover:shadow-md transition ${className}`}
      >
        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100">
          <Image
            src={
              car.image
                ? car.image
                : "https://t3.ftcdn.net/jpg/01/71/13/24/360_F_171132449_uK0OO5XHrjjaqx5JUbJOIoCC3GZP84Mt.jpg"
            }
            alt={`${car.brand} ${car.model}`}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-600 text-sm">
              {car.year} • {car.color}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span>👥</span>
              <span>{car.seats} places</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⛽</span>
              <span>{car.fuelType}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">Immatriculation:</span> {car.licensePlate}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleEditClick}
              className="flex-1 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition text-sm font-medium"
            >
              Modifier
            </button>
            <button
              onClick={handleRemoveClick}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition text-sm font-medium disabled:opacity-50"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ MODAL DE MODIFICATION */}
      {isModalOpen && (
        <EditCarModal
          car={{
            id: car.id,
            vehicle_type: car.vehicle_type || 1,
            color: car.color_id || 1,
            engine_type: car.engine_type || 1,
            model: car.model_id || 1,
            serial_number: car.serial_number || car.licensePlate,
            nb_place: car.nb_place || car.seats,
            grey_card: car.grey_card || '',
            year: typeof car.year === 'string' ? parseInt(car.year) : car.year,
            image: car.image,
          }}
          isOpen={isModalOpen}
          onClose={() => {
            console.log("🚪 Fermeture du modal");
            setIsModalOpen(false);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}