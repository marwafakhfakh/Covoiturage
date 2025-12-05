interface DriverInfoCardProps {
  driver: {
    name: string;
    avatar: string;
    rating: number;
    totalTrips: number;
    memberSince: string;
    phoneVerified: boolean;
    emailVerified: boolean;
  };
  className?: string;
}

export default function DriverInfoCard({
  driver,
  className = "",
}: DriverInfoCardProps) {
  return (
    <div className={`bg-gray-50 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Driver Verification
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span
            className={`w-5 h-5 rounded-full ${
              driver.phoneVerified ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {driver.phoneVerified && (
              <span className="block w-full h-full text-white text-xs leading-5 text-center">
                ✓
              </span>
            )}
          </span>
          <span className="text-sm text-gray-700">Phone verified</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`w-5 h-5 rounded-full ${
              driver.emailVerified ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            {driver.emailVerified && (
              <span className="block w-full h-full text-white text-xs leading-5 text-center">
                ✓
              </span>
            )}
          </span>
          <span className="text-sm text-gray-700">Email verified</span>
        </div>
      </div>
    </div>
  );
}
