interface PickupPointsProps {
  points: string[];
  title?: string;
  className?: string;
}

export default function PickupPoints({
  points,
  title = "Pickup Points",
  className = "",
}: PickupPointsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-3">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="font-medium text-gray-800">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
