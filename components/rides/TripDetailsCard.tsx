interface TripDetailsCardProps {
  departure: {
    place: string;
    date: string;
  };
  car: string;
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
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <div className="font-semibold text-gray-800">Départ</div>
              <div className="text-gray-600">
                {new Date(departure.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-gray-600 font-medium">
                {new Date(departure.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <div>
              <div className="font-semibold text-gray-800">Véhicule</div>
              <div className="text-gray-600">{car}</div>
              <div className="text-sm text-gray-500">
                {availableSeats} place{availableSeats !== 1 ? "s" : ""} disponible
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
