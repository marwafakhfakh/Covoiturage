interface TripImpactCardProps {
  co2Saved?: string;
  moneySaved?: string;
  vsTrainSavings?: string;
  className?: string;
}

export default function TripImpactCard({
  co2Saved = "~15kg",
  moneySaved = "~40€",
  vsTrainSavings = "-60%",
  className = "",
}: TripImpactCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Impact</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">CO₂ saved</span>
          <span className="text-sm font-semibold text-green-600">
            {co2Saved}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">Money saved</span>
          <span className="text-sm font-semibold text-green-600">
            {moneySaved}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">vs. train</span>
          <span className="text-sm font-semibold text-blue-600">
            {vsTrainSavings}
          </span>
        </div>
      </div>
    </div>
  );
}
