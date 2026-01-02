import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  className?: string;
}

export default function EmptyStateTr({
  icon = "🔐",
  title = "Vous devez créer un compte",
  description = "Pour accéder aux trajets disponibles et proposer vos propres trajets, veuillez créer un compte ou vous connecter.",
  actionText = "Créer un compte",
  actionHref = "/auth/signup",
  secondaryActionText = "Se connecter",
  secondaryActionHref = "/auth/login",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href={actionHref}
          className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition font-bold shadow-md border-2 border-black"
        >
          {actionText}
        </Link>
        <Link
          href={secondaryActionHref}
          className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-gray-50 transition font-bold shadow-md border-2 border-black"
        >
          {secondaryActionText}
        </Link>
      </div>
    </div>
  );
}