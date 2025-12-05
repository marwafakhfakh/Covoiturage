import CarCard, { Car } from "./CarCard";

interface CarsSectionProps {
  cars: Car[];
  onAddCar: () => void;
  onEditCar?: (car: Car) => void;
  onRemoveCar?: (carId: number) => void;
  className?: string;
}

export default function CarsSection({
  cars,
  onAddCar,
  onEditCar,
  onRemoveCar,
  className = "",
}: CarsSectionProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 mt-8 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Cars</h2>
        <button
          onClick={onAddCar}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add New Car
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No cars added yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add your first car to start offering rides
          </p>
          <button
            onClick={onAddCar}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold"
          >
            Add Your First Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={onEditCar}
              onRemove={onRemoveCar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
