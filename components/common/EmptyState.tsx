import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  icon = "🚗",
  title = "No rides found",
  description = "Try adjusting your search criteria or check back later for new rides.",
  actionText = "Offer a Ride Instead",
  actionHref = "/offer",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link
        href={actionHref}
        className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
      >
        {actionText}
      </Link>
    </div>
  );
}
