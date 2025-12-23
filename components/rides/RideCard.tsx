// // // import Link from "next/link";
// // // import Image from "next/image";

// // // export interface RideData {
// // //   id: number;
// // //   user: {
// // //     id: number;
// // //     first_name: string;
// // //     last_name: string;
// // //     username: string;
// // //     email?: string;
// // //     review_score?: number;
// // //     review_numbers?: number;
// // //     professional?: boolean;
// // //     current_package_plan?: { package: string };
// // //     subscription_status?: string;
// // //     joining_date?: string;
// // //     date_joined?: string;
// // //     avatar?: string;
// // //     profile_picture?: string;
// // //     phone_number?: string;
// // //     bio?: string;
// // //     active?: boolean;
// // //   };
// // //   car: {
// // //     id: number;
// // //     model_details?: {
// // //       id: number;
// // //       name: string;
// // //       brand: { id: number; name: string };
// // //     };
// // //     type: string;
// // //     color: string;
// // //     color_details?: { id: number; name: string; code: string } | null;
// // //     serial_number: string;
// // //     nb_place: number;
// // //     engine_type: string;
// // //     grey_card: string;
// // //     year?: number;
// // //     image?: string | null;
// // //     owner: number;
// // //   };
// // //   services: {
// // //     id: number;
// // //     name: string;
// // //     description: string;
// // //     active: boolean;
// // //     logo: string | null;
// // //   }[];
// // //   departure_date: string;
// // //   departure_place: string;
// // //   departure_city?: string;
// // //   arrival_place: string;
// // //   arrival_city?: string;
// // //   status: string;
// // //   nb_places_disponible: number;
// // //   price: string;
// // //   equivalent_price?: string | null;
// // //   round_trip: boolean;
// // // }

// // // interface RideCardProps {
// // //   ride: RideData;
// // //   className?: string;
// // // }

// // // function renderStars(rating: number) {
// // //   const stars = [];
// // //   const fullStars = Math.floor(rating);
// // //   const hasHalfStar = rating % 1 >= 0.5;

// // //   for (let i = 0; i < fullStars; i++) {
// // //     stars.push(
// // //       <span key={`full-${i}`} className="text-yellow-400 text-xs">
// // //         ★
// // //       </span>
// // //     );
// // //   }

// // //   if (hasHalfStar) {
// // //     stars.push(
// // //       <span key="half" className="text-yellow-400 text-xs">
// // //         ☆
// // //       </span>
// // //     );
// // //   }

// // //   for (let i = stars.length; i < 5; i++) {
// // //     stars.push(
// // //       <span key={`empty-${i}`} className="text-gray-300 text-xs">
// // //         ☆
// // //       </span>
// // //     );
// // //   }

// // //   return stars;
// // // }

// // // export default function RideCard({ ride, className = "" }: RideCardProps) {
// // //   // Driver info
// // //   const user = ride.user;
// // //   const name =
// // //     `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username;
// // //   const avatar =
// // //     user.avatar ||
// // //     user.profile_picture ||
// // //     "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
// // //   const rating = user.review_score || 0;
// // //   const reviewNumbers = user.review_numbers || 0;
// // //   const isProfessional = user.professional;

// // //   // Car info
// // //   const car = ride.car;
// // //   const carName = car.model_details?.brand.name
// // //     ? `${car.model_details.name} (${car.type}, ${car.color_details?.name})`
// // //     : `${car.type}, ${car.color_details?.name}`;

// // //   // Services
// // //   const services = ride.services.map((s) => s.name);

// // //   const departureDate = new Date(ride.departure_date);

// // //   return (
// // //     <Link href={`/rides/${ride.id}`} className={`block w-full ${className}`}>
// // //       <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
// // //         {/* Layout global : colonne en mobile, ligne en desktop */}
// // //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //           {/* Partie gauche : conducteur + trajet */}
// // //           <div className="flex flex-col sm:flex-row gap-4 md:gap-6 flex-1">
// // //             {/* Conducteur */}
// // //             <div className="flex items-center gap-3 sm:gap-4">
// // //               <Image
// // //                 src={avatar}
// // //                 alt={name}
// // //                 width={64}
// // //                 height={64}
// // //                 className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 shadow-md object-cover flex-shrink-0"
// // //               />
// // //               <div>
// // //                 <div className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-gray-700 transition flex items-center gap-2">
// // //                   {name}
// // //                   {isProfessional && (
// // //                     <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] sm:text-xs rounded-full font-semibold">
// // //                       Pro
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //                 <div className="text-xs sm:text-sm text-gray-500 line-clamp-1">
// // //                   {carName}
// // //                 </div>
// // //                 <div className="flex items-center gap-1 mt-1 text-xs">
// // //                   {renderStars(rating)}
// // //                   <span className="text-gray-500 ml-1">
// // //                     ({rating.toFixed(1)})
// // //                   </span>
// // //                   <span className="text-gray-400 text-[11px] ml-2">
// // //                     {reviewNumbers} reviews
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* Trajet */}
// // //             <div className="flex-1 min-w-0">
// // //               <div className="flex items-start gap-3 mb-2">
// // //                 {/* Départ */}
// // //                 <div className="flex flex-col flex-1 min-w-0">
// // //                   <div className="text-base sm:text-xl font-bold text-gray-900 truncate">
// // //                     {ride.departure_place}
// // //                   </div>
// // //                   {ride.departure_city && (
// // //                     <div className="text-xs text-gray-500 mt-0.5 truncate">
// // //                       {ride.departure_city}
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 <div className="text-gray-400 text-lg sm:text-2xl mt-1 sm:mt-0">
// // //                   →
// // //                 </div>

// // //                 {/* Arrivée */}
// // //                 <div className="flex flex-col flex-1 min-w-0 text-right sm:text-left">
// // //                   <div className="text-base sm:text-xl font-bold text-gray-900 truncate">
// // //                     {ride.arrival_place}
// // //                   </div>
// // //                   {ride.arrival_city && (
// // //                     <div className="text-xs text-gray-500 mt-0.5 truncate">
// // //                       {ride.arrival_city}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Date & heure */}
// // //               <div className="text-xs sm:text-sm text-gray-600">
// // //                 {departureDate.toLocaleDateString("en-US", {
// // //                   weekday: "short",
// // //                   month: "short",
// // //                   day: "numeric",
// // //                   year: "numeric",
// // //                   timeZone: "UTC",
// // //                 })}{" "}
// // //                 at{" "}
// // //                 {departureDate.toLocaleTimeString("en-US", {
// // //                   hour: "2-digit",
// // //                   minute: "2-digit",
// // //                   timeZone: "UTC",
// // //                 })}
// // //               </div>

// // //               {/* Services */}
// // //               <div className="flex flex-wrap gap-1 mt-2">
// // //                 {services.slice(0, 4).map((service, index) => (
// // //                   <span
// // //                     key={index}
// // //                     className="px-2 py-1 bg-gray-100 text-gray-600 text-[11px] sm:text-xs rounded-full"
// // //                   >
// // //                     {service}
// // //                   </span>
// // //                 ))}
// // //                 {services.length > 4 && (
// // //                   <span className="px-2 py-1 bg-gray-200 text-gray-500 text-[11px] sm:text-xs rounded-full">
// // //                     +{services.length - 4} more
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Partie droite : prix + places */}
// // //           <div className="flex flex-row md:flex-col items-end justify-between md:justify-center text-right flex-shrink-0 md:ml-6 min-w-[120px]">
// // //             <div className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
// // //               {ride.price} TND
// // //             </div>
// // //             <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 justify-end">
// // //               <span>👥</span>
// // //               <span>
// // //                 {ride.nb_places_disponible} seat
// // //                 {ride.nb_places_disponible !== 1 ? "s" : ""} left
// // //               </span>
// // //             </div>
// // //             {ride.round_trip && (
// // //               <div className="mt-1 text-[11px] sm:text-xs text-blue-600 font-semibold">
// // //                 Round Trip
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </Link>
// // //   );
// // // }
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
    model_details?: {
      id: number;
      name: string;
      brand: { id: number; name: string };
    };
    type: string;
    color: string;
    color_details?: { id: number; name: string; code: string } | null;
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
  departure_city?: string;
  arrival_place: string;
  arrival_city?: string;
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
      <span key={`full-${i}`} className="text-yellow-400 text-xs">
        ★
      </span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400 text-xs">
        ☆
      </span>
    );
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-300 text-xs">
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
  const carName = car.model_details?.brand.name
    ? `${car.model_details.name} (${car.type}, ${car.color_details?.name})`
    : `${car.type}, ${car.color_details?.name}`;

  // Services
  const services = ride.services.map((s) => s.name);

  const departureDate = new Date(ride.departure_date);

  return (
    <Link href={`/rides/${ride.id}`} className={`block w-full ${className}`}>
      <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          
          {/* Section gauche: Driver + Route */}
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            
            {/* Driver Info - toujours horizontal */}
            <div className="flex items-center gap-3">
              <Image
                src={avatar}
                alt={name}
                width={56}
                height={56}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-200 shadow-md object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-gray-700 transition flex items-center gap-2 flex-wrap">
                  <span className="truncate">{name}</span>
                  {isProfessional && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] sm:text-xs rounded-full font-semibold whitespace-nowrap">
                      Pro
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 truncate">
                  {carName}
                </div>
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    {renderStars(rating)}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({rating.toFixed(1)})
                  </span>
                  <span className="text-gray-400 text-[10px] sm:text-xs">
                    {reviewNumbers} reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Route Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
                {/* Départ */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
                    {ride.departure_place}
                  </div>
                  {ride.departure_city && (
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                      {ride.departure_city}
                    </div>
                  )}
                </div>

                <div className="text-gray-400 text-base sm:text-xl flex-shrink-0 px-1">
                  →
                </div>

                {/* Arrivée */}
                <div className="flex flex-col flex-1 min-w-0 items-end">
                  <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate w-full text-right">
                    {ride.arrival_place}
                  </div>
                  {ride.arrival_city && (
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate w-full text-right">
                      {ride.arrival_city}
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="text-xs sm:text-sm text-gray-600 mb-2">
                {departureDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}{" "}
                at{" "}
                {departureDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-1">
                {services.slice(0, 4).map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-full whitespace-nowrap"
                  >
                    {service}
                  </span>
                ))}
                {services.length > 4 && (
                  <span className="px-2 py-1 bg-gray-200 text-gray-500 text-[10px] sm:text-xs rounded-full whitespace-nowrap">
                    +{services.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section droite: Prix + Places */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 lg:gap-1 text-right flex-shrink-0 lg:min-w-[120px] pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6">
            <div className="lg:order-1">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {ride.price} TND
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1 lg:order-2">
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                <span>👥</span>
                <span className="whitespace-nowrap">
                  {ride.nb_places_disponible} seat{ride.nb_places_disponible !== 1 ? "s" : ""} left
                </span>
              </div>
              {ride.round_trip && (
                <div className="text-[10px] sm:text-xs text-blue-600 font-semibold whitespace-nowrap">
                  Round Trip
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
