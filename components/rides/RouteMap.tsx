interface RouteMapProps {
  from: string;
  to: string;
  title?: string;
  className?: string;
}

export default function RouteMap({
  from,
  to,
  title = "Route & Trajectory",
  className = "",
}: RouteMapProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="bg-gray-100 rounded-xl p-8 border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Interactive Route Map
          </h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Map showing the detailed trajectory from <strong>{from}</strong> to{" "}
            <strong>{to}</strong> will be displayed here
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Start: {from}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>End: {to}</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            🗺️ Map integration coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
