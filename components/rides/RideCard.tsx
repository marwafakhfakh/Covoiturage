// import Link from "next/link";
// import Image from "next/image";

// export interface RideData {
//   id: number;
//   user: {
//     id: number;
//     first_name: string;
//     last_name: string;
//     username: string;
//     email?: string;
//     review_score?: number;
//     review_numbers?: number;
//     professional?: boolean;
//     current_package_plan?: { package: string };
//     subscription_status?: string;
//     joining_date?: string;
//     date_joined?: string;
//     avatar?: string;
//     profile_picture?: string;
//     phone_number?: string;
//     bio?: string;
//     active?: boolean;
//   };
//   car: {
//     id: number;
//     model_details?: {
//       id: number;
//       name: string;
//       brand: { id: number; name: string };
//     };
//     type: string;
//     color: string;
//     color_details?: { id: number; name: string; code: string } | null;
//     serial_number: string;
//     nb_place: number;
//     engine_type: string;
//     grey_card: string;
//     year?: number;
//     image?: string | null;
//     owner: number;
//   };
//   services: {
//     id: number;
//     name: string;
//     description: string;
//     active: boolean;
//     logo: string | null;
//   }[];
//   departure_date: string;
//   departure_place: string;
//   departure_city?: string;
//   arrival_place: string;
//   arrival_city?: string;
//   status: string;
//   nb_places_disponible: number;
//   price: string;
//   equivalent_price?: string | null;
//   round_trip: boolean;
// }

// interface RideCardProps {
//   ride: RideData;
//   className?: string;
// }

// function renderStars(rating: number) {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(
//       <span key={`full-${i}`} className="text-yellow-400 text-xs">
//         ★
//       </span>
//     );
//   }

//   if (hasHalfStar) {
//     stars.push(
//       <span key="half" className="text-yellow-400 text-xs">
//         ☆
//       </span>
//     );
//   }

//   for (let i = stars.length; i < 5; i++) {
//     stars.push(
//       <span key={`empty-${i}`} className="text-gray-300 text-xs">
//         ☆
//       </span>
//     );
//   }

//   return stars;
// }

// export default function RideCard({ ride, className = "" }: RideCardProps) {
//   // Driver info
//   const user = ride.user;
//   const name =
//     `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username;
//   const avatar =
//     user.avatar ||
//     user.profile_picture ||
//     "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
//   const rating = user.review_score || 0;
//   const reviewNumbers = user.review_numbers || 0;
//   const isProfessional = user.professional;

//   // Car info
//   const car = ride.car;
//   const carName = car.model_details?.brand.name
//     ? ` (${car.model_details.brand.name} ${car.model_details.name} , ${car.color_details?.name}) ${car.serial_number}`
//     : `${car.type}, ${car.color_details?.name}`;

//   // Services
//   const services = ride.services.map((s) => s.name);

//   const departureDate = new Date(ride.departure_date);

//   return (
//     <Link href={`/rides/${ride.id}`} className={`block w-full ${className}`}>
//       <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 group">
//         {/* Layout principal */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          
//           {/* Section gauche: Driver + Route */}
//           <div className="flex flex-col gap-4 flex-1 min-w-0">
            
//             {/* Driver Info - toujours horizontal */}
//             <div className="flex items-center gap-3">
//               <Image
//                 src={avatar}
//                 alt={name}
//                 width={56}
//                 height={56}
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-200 shadow-md object-cover flex-shrink-0"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-gray-700 transition flex items-center gap-2 flex-wrap">
//                   <span className="truncate">{name}</span>
//                   {isProfessional && (
//                     <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] sm:text-xs rounded-full font-semibold whitespace-nowrap">
//                       Pro
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-500 truncate">
//                   {carName}
//                 </div>
//                 <div className="flex items-center gap-1 mt-1 flex-wrap">
//                   <div className="flex items-center gap-0.5">
//                     {renderStars(rating)}
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     ({rating.toFixed(1)})
//                   </span>
//                   <span className="text-gray-400 text-[10px] sm:text-xs">
//                     {reviewNumbers} reviews
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Route Info */}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2">
//                 {/* Départ */}
//                 <div className="flex flex-col flex-1 min-w-0">
//                   <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
//                     {ride.departure_place}
//                   </div>
//                   {ride.departure_city && (
//                     <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
//                       {ride.departure_city}
//                     </div>
//                   )}
//                 </div>

//                 <div className="text-gray-400 text-base sm:text-xl flex-shrink-0 px-1">
//                   →
//                 </div>

//                 {/* Arrivée */}
//                 <div className="flex flex-col flex-1 min-w-0 items-end">
//                   <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate w-full text-right">
//                     {ride.arrival_place}
//                   </div>
//                   {ride.arrival_city && (
//                     <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate w-full text-right">
//                       {ride.arrival_city}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Date & Time */}
//               <div className="text-xs sm:text-sm text-gray-600 mb-2">
//   {departureDate.toLocaleDateString("fr-FR", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//     timeZone: "UTC",
//   })}{" "}
//   à{" "}
//   {departureDate.toLocaleTimeString("fr-FR", {
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: "UTC",
//   })}
// </div>

//               {/* <div className="text-xs sm:text-sm text-gray-600 mb-2">
//                 {departureDate.toLocaleDateString("en-US", {
//                   weekday: "short",
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                   timeZone: "UTC",
//                 })}{" "}
//                 at{" "}
//                 {departureDate.toLocaleTimeString("en-US", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   timeZone: "UTC",
//                 })}
//               </div> */}

//               {/* Services */}
//               <div className="flex flex-wrap gap-1">
//                 {services.slice(0, 4).map((service, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-full whitespace-nowrap"
//                   >
//                     {service}
//                   </span>
//                 ))}
//                 {services.length > 4 && (
//                   <span className="px-2 py-1 bg-gray-200 text-gray-500 text-[10px] sm:text-xs rounded-full whitespace-nowrap">
//                     +{services.length - 4} more
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Section droite: Prix + Places */}
//           <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 lg:gap-1 text-right flex-shrink-0 lg:min-w-[120px] pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6">
//             <div className="lg:order-1">
//               <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
//                 {ride.price} TND
//               </div>
//             </div>
            
//             <div className="flex flex-col items-end gap-1 lg:order-2">
//               <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
//                 <span>👥</span>
//                 <span className="whitespace-nowrap">
//                   {ride.nb_places_disponible} seat{ride.nb_places_disponible !== 1 ? "s" : ""} left
//                 </span>
//               </div>
//               {ride.round_trip && (
//                 <div className="text-[10px] sm:text-xs text-blue-600 font-semibold whitespace-nowrap">
//                   Round Trip
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
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

  const car = ride.car;
  const carName = car.model_details?.brand.name
    ? `${car.model_details.brand.name} ${car.model_details.name}`
    : car.type;

  const services = ride.services.map((s) => s.name);
  const departureDate = new Date(ride.departure_date);

  return (
    <Link href={`/rides/${ride.id}`} className={`block w-full ${className}`}>
      <div className="bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all duration-200 p-4 group">
        
        {/* Header: Driver + Prix */}
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Driver Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Image
              src={avatar}
              alt={name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-gray-100 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900 truncate">
                  {name}
                </span>
                {isProfessional && (
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded font-semibold">
                    Pro
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex">{renderStars(rating)}</div>
                <span className="text-[11px] text-gray-500">
                  {rating.toFixed(1)} ({reviewNumbers})
                </span>
              </div>
            </div>
          </div>

          {/* Prix */}
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-gray-900">
              {ride.price}
              <span className="text-sm font-normal text-gray-500 ml-1">TND</span>
            </div>
            {ride.round_trip && (
              <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                Aller-retour
              </div>
            )}
          </div>
        </div>

        {/* Route principale */}
        <div className="mb-3">
          <div className="flex items-center gap-3">
            {/* Départ */}
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-gray-900 truncate">
                {ride.departure_place}
              </div>
              {ride.departure_city && (
                <div className="text-xs text-gray-500 truncate">
                  {ride.departure_city}
                </div>
              )}
            </div>

            {/* Icône flèche */}
            <div className="flex-shrink-0 px-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* Arrivée */}
            <div className="flex-1 min-w-0 text-right">
              <div className="text-base font-bold text-gray-900 truncate">
                {ride.arrival_place}
              </div>
              {ride.arrival_city && (
                <div className="text-xs text-gray-500 truncate">
                  {ride.arrival_city}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date & Infos complémentaires */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            {/* Date */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {departureDate.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  timeZone: "UTC",
                })}
              </span>
            </div>

            {/* Heure */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {departureDate.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}
              </span>
            </div>

            {/* Voiture */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span className="truncate max-w-[150px]">{car.model_details?.brand.name} {car.model_details?.name} - {car.serial_number}</span>
            </div>
          </div>

          {/* Places disponibles */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 flex-shrink-0">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>
              {ride.nb_places_disponible} place{ride.nb_places_disponible !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Services (optionnel, compact) */}
        {services.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
            {services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-50 text-gray-600 text-[10px] rounded-full"
              >
                {service}
              </span>
            ))}
            {services.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full">
                +{services.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}