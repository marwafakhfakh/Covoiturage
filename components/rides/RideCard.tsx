import Link from "next/link";
import Image from "next/image";

export interface RideData {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email?: string;
    review_score?: number;
    review_numbers?: number;
    professional?: boolean;
    current_package_plan?: { package: string };
    subscription_status?: string;
    joining_date?: string;
    date_joined?: string;
    avatar?: string;
    profile_picture?: string;
    phone_number?: string;
    bio?: string;
    active?: boolean;
  };
  car: {
    id: number;
    model: { id: number; name: string; brand: number };
    type: string;
    color: string;
    serial_number: string;
    nb_place: number;
    engine_type: string;
    grey_card: string;
    year?: number;
    image?: string | null;
    owner: number;
  };
  services: {
    id: number;
    name: string;
    description: string;
    active: boolean;
    logo: string | null;
  }[];
  departure_date: string;
  departure_place: string;
  arrival_place: string;
  status: string;
  nb_places_disponible: number;
  price: string;
  equivalent_price?: string | null;
  round_trip: boolean;
}

interface RideCardProps {
  ride: RideData;
  className?: string;
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-400">
        ★
      </span>
    );
  }
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400">
        ☆
      </span>
    );
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <span key={i} className="text-gray-300">
        ☆
      </span>
    );
  }
  return stars;
}

export default function RideCard({ ride, className = "" }: RideCardProps) {
  // Driver info
  const user = ride.user;
  const name =
    `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username;
  const avatar =
    user.avatar ||
    user.profile_picture ||
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const rating = user.review_score || 0;
  const reviewNumbers = user.review_numbers || 0;
  const isProfessional = user.professional;

  // Car info
  const car = ride.car;
  const carName = car.model?.name
    ? `${car.model.name} (${car.type}, ${car.color})`
    : `${car.type}, ${car.color}`;

  // Services
  const services = ride.services.map((s) => s.name);

  return (
    <Link
      href={`/rides/${ride.id}`}
      className={`block bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Left Side - Driver & Route */}
        <div className="flex items-center gap-6 flex-1">
          {/* Driver Info */}
          <div className="flex items-center gap-4">
            <Image
              src={avatar}
              alt={name}
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-200 shadow-md"
            />
            <div>
              <div className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition flex items-center gap-2">
                {name}
                {isProfessional && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                    Pro
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">{carName}</div>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(rating)}
                <span className="text-sm text-gray-500 ml-1">
                  ({rating.toFixed(1)})
                </span>
                <span className="text-gray-400 text-xs ml-2">
                  {reviewNumbers} reviews
                </span>
              </div>
            </div>
          </div>

          {/* Route */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl font-bold text-gray-900">
                {ride.departure_place}
              </div>
              <div className="text-gray-400">→</div>
              <div className="text-xl font-bold text-gray-900">
                {ride.arrival_place}
              </div>
            </div>

            {/* Date & Time */}
            <div className="text-sm text-gray-600">
              {new Date(ride.departure_date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {new Date(ride.departure_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-1 mt-2">
              {services.slice(0, 4).map((service, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {service}
                </span>
              ))}
              {services.length > 4 && (
                <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-full">
                  +{services.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Price & Seats */}
        <div className="text-right flex-shrink-0 ml-6 min-w-[120px]">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {ride.price} TND
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 justify-end">
            <span>👥</span>
            <span>
              {ride.nb_places_disponible} seat
              {ride.nb_places_disponible !== 1 ? "s" : ""} left
            </span>
          </div>
          {ride.round_trip && (
            <div className="mt-1 text-xs text-blue-600 font-semibold">
              Round Trip
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
