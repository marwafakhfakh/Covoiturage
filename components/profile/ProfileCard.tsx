// import Image from "next/image";
// import type { UserProfile } from "../../store/userSlice";

// interface ProfileCardProps {
//   user: UserProfile;
//   className?: string;
// }

// function renderStars(rating: number) {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating % 1 >= 0.5;

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(
//       <span key={i} className="text-yellow-400 text-lg">
//         ★
//       </span>
//     );
//   }
//   if (hasHalfStar) {
//     stars.push(
//       <span key="half" className="text-yellow-400 text-lg">
//         ☆
//       </span>
//     );
//   }
//   for (let i = stars.length; i < 5; i++) {
//     stars.push(
//       <span key={i} className="text-gray-300 text-lg">
//         ☆
//       </span>
//     );
//   }
//   return stars;
// }

// function VerificationBadge({
//   verified,
//   label,
// }: {
//   verified: boolean;
//   label: string;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span
//         className={`w-5 h-5 rounded-full ${
//           verified ? "bg-black" : "bg-gray-300"
//         }`}
//       >
//         {verified && (
//           <span className="block w-full h-full text-white text-xs leading-5 text-center">
//             ✓
//           </span>
//         )}
//       </span>
//       <span className="text-sm text-gray-700">{label}</span>
//     </div>
//   );
// }

// export default function ProfileCard({
//   user,
//   className = "",
// }: ProfileCardProps) {
//   // Compose name
//   const name = `${user.first_name} ${user.last_name}`.trim() || user.username;
//   const avatar =
//     user.avatar ||
//     user.profile_picture ||
//     "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
//   const email = user.email;
//   const phone = user.phone_number || "";
//   const bio = user.bio || "";
//   const memberSince =
//     user.subscription_end_date?.slice(0, 12) || user.subscription_end_date?.slice(0, 12) || "";
//   // Show review score and numbers
//   const rating = user.review_score || 0;
//   const reviewNumbers = user.review_numbers || 0;
//   // Show package plan if available
//   const packagePlan = user.current_package_plan?.package || "-";
//   // Show subscription status
//   const subscriptionStatus = user.subscription_status;
//   // Show professional badge
//   const isProfessional = user.professional;

//   return (
//     <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
//       <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
//         <div className="flex items-center gap-6">
//           <Image
//             src={avatar}
//             alt={name}
//             width={96}
//             height={96}
//             className="rounded-full border-4 border-gray-200 shadow-lg"
//           />
//           <div>
//             <h1 className="font-bold text-3xl text-gray-900 mb-2 flex items-center gap-2">
//               {name}
//               {isProfessional && (
//                 <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
//                   Pro
//                 </span>
//               )}
//             </h1>
//             <div className="flex items-center gap-2 mb-2">
//               {renderStars(rating)}
//               <span className="text-gray-600 ml-1">({rating.toFixed(1)})</span>
//               <span className="text-gray-400 text-xs">
//                 {reviewNumbers} reviews
//               </span>
//             </div>
//             <div className="text-gray-600 text-sm mb-1">{email}</div>
//             {phone && <div className="text-gray-600 text-sm">{phone}</div>}
//           </div>
//         </div>

//         <div className="flex-1 lg:text-right">
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center lg:text-right">
//             <div>
//               <div className="text-2xl font-bold text-gray-900">
//                 Forfait
//               </div>
//               <div className="text-sm text-gray-600">{packagePlan}</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">
//                 Abonnement
//               </div>
//               <div className="text-sm text-gray-600">{subscriptionStatus}</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-gray-900">
//                  {/* Membre depuis */}
//                  Valide jusqu’au
//               </div>
//               <div className="text-sm text-gray-600">{memberSince}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 pt-6 border-t border-gray-200">
//         {bio && <p className="text-gray-700 italic mb-4">{bio}</p>}
//         <div className="flex flex-wrap gap-4">
//           {/* Optionally show CIN, driving licence, etc. if present */}
//           {user.cin && (
//             <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//               CIN: {user.cin}
//             </span>
//           )}
//           {user.driving_licence && (
//             <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//               Permis de conduire : {user.driving_licence}
//             </span>
//           )}
//           {/* Show auto-renew status if relevant */}
//           <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//             Renouvellement automatique: {user.auto_renew ? "Yes" : "No"}
//           </span>
//           {/* Show active status */}
//           <span
//             className={`px-2 py-1 text-xs rounded ${
//               user.is_active
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {user.is_active ? "Active" : "Inactive"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import Image from "next/image";
import type { UserProfile } from "../../store/userSlice";
import EditProfileModal from "./EditProfileModal";

interface ProfileCardProps {
  user: UserProfile;
  className?: string;
  onProfileUpdate?: () => void;
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-400 text-lg">
        ★
      </span>
    );
  }
  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400 text-lg">
        ☆
      </span>
    );
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <span key={i} className="text-gray-300 text-lg">
        ☆
      </span>
    );
  }
  return stars;
}

export default function ProfileCard({
  user,
  className = "",
  onProfileUpdate
}: ProfileCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const name = `${user.first_name} ${user.last_name}`.trim() || user.username;
  const avatar =
    user.avatar ||
    user.profile_picture ||
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const email = user.email;
  const phone = user.phone_number || "";
  const bio = user.bio || "";
  const memberSince =
    user.subscription_end_date?.slice(0, 12) || user.subscription_end_date?.slice(0, 12) || "";
  const rating = user.review_score || 0;
  const reviewNumbers = user.review_numbers || 0;
  const packagePlan = user.current_package_plan?.package || "-";
  const subscriptionStatus = user.subscription_status;
  const isProfessional = user.professional;

  const handleEditSuccess = () => {
    if (onProfileUpdate) {
      onProfileUpdate();
    }
  };

  return (
    <>
      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />

      <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex items-center gap-6">
            <Image
              src={avatar}
              alt={name}
              width={96}
              height={96}
              className="rounded-full border-4 border-gray-200 shadow-lg"
            />
            <div>
              <h1 className="font-bold text-3xl text-gray-900 mb-2 flex items-center gap-2">
                {name}
                {isProfessional && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                    Pro
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(rating)}
                <span className="text-gray-600 ml-1">({rating.toFixed(1)})</span>
                <span className="text-gray-400 text-xs">
                  {reviewNumbers} reviews
                </span>
              </div>
              <div className="text-gray-600 text-sm mb-1">{email}</div>
              {phone && <div className="text-gray-600 text-sm">{phone}</div>}
            </div>
          </div>

          <div className="flex-1 lg:text-right">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center lg:text-right">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  Forfait
                </div>
                <div className="text-sm text-gray-600">{packagePlan}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  Abonnement
                </div>
                <div className="text-sm text-gray-600">{subscriptionStatus}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  Valide jusqu'au
                </div>
                <div className="text-sm text-gray-600">{memberSince}</div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            {bio && <p className="text-gray-700 italic flex-1">{bio}</p>}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="ml-4 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier le profil
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {user.cin && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                CIN: {user.cin}
              </span>
            )}
            {user.driving_licence && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                Permis de conduire : {user.driving_licence}
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              Renouvellement automatique: {user.auto_renew ? "Oui" : "No"}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded ${
                user.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div> */}
        <div className="mt-6 pt-6 border-t border-gray-200">
  {bio && (
    <p className="text-gray-700 italic mb-2">
      {bio}
    </p>
  )}

  <div className="flex items-center justify-between mb-2">
    <div className="flex flex-wrap gap-4">
      {user.cin && (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
          CIN: {user.cin}
        </span>
      )}
      {user.driving_licence && (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
          Permis de conduire : {user.driving_licence}
        </span>
      )}
      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
        Renouvellement automatique: {user.auto_renew ? "Oui" : "Non"}
      </span>
      <span
        className={`px-2 py-1 text-xs rounded ${
          user.is_active
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {user.is_active ? "Active" : "Inactive"}
      </span>
    </div>

    <button
      onClick={() => setIsEditModalOpen(true)}
      className="ml-4 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2 shadow-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Modifier le profil
    </button>
  </div>
</div>

      </div>
    </>
  );
}