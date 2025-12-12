import Image from "next/image";
import type { UserProfile } from "../../store/userSlice";

interface ProfileCardProps {
  user: UserProfile;
  className?: string;
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

function VerificationBadge({
  verified,
  label,
}: {
  verified: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-5 h-5 rounded-full ${
          verified ? "bg-black" : "bg-gray-300"
        }`}
      >
        {verified && (
          <span className="block w-full h-full text-white text-xs leading-5 text-center">
            ✓
          </span>
        )}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

export default function ProfileCard({
  user,
  className = "",
}: ProfileCardProps) {
  // Compose name
  const name = `${user.first_name} ${user.last_name}`.trim() || user.username;
  const avatar =
    user.avatar ||
    user.profile_picture ||
    "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
  const email = user.email;
  const phone = user.phone_number || "";
  const bio = user.bio || "";
  const memberSince =
    user.joining_date?.slice(0, 4) || user.date_joined?.slice(0, 4) || "";
  // Show review score and numbers
  const rating = user.review_score || 0;
  const reviewNumbers = user.review_numbers || 0;
  // Show package plan if available
  const packagePlan = user.current_package_plan?.package || "-";
  // Show subscription status
  const subscriptionStatus = user.subscription_status;
  // Show professional badge
  const isProfessional = user.professional;

  return (
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
                {packagePlan}
              </div>
              <div className="text-sm text-gray-600">Package</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {subscriptionStatus}
              </div>
              <div className="text-sm text-gray-600">Subscription</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {memberSince}
              </div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        {bio && <p className="text-gray-700 italic mb-4">{bio}</p>}
        <div className="flex flex-wrap gap-4">
          {/* Optionally show CIN, driving licence, etc. if present */}
          {user.cin && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              CIN: {user.cin}
            </span>
          )}
          {user.driving_licence && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              Driving Licence: {user.driving_licence}
            </span>
          )}
          {/* Show auto-renew status if relevant */}
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            Auto Renew: {user.auto_renew ? "Yes" : "No"}
          </span>
          {/* Show active status */}
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
      </div>
    </div>
  );
}
