import Image from "next/image";

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  seats: number;
  fuelType: string;
  licensePlate: string;
  image: string;
}

interface CarCardProps {
  car: Car;
  onEdit?: (car: Car) => void;
  onRemove?: (carId: number) => void;
  className?: string;
}

export default function CarCard({
  car,
  onEdit,
  onRemove,
  className = "",
}: CarCardProps) {
  return (
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
        /> */{"}"}
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
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⛽</span>
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">License:</span> {car.licensePlate}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit?.(car)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove?.(car.id)}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
