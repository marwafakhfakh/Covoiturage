import Link from "next/link";

export default function SafetyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🛡️</span>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Sécurité
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-2xl">
            Votre sécurité est notre priorité. Découvrez les mesures mises en
            place par Namlaa pour garantir des trajets sûrs, fiables et
            respectueux.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            🔐 Vérification des profils
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Chaque utilisateur est invité à fournir des informations exactes.
            Les profils comportent des avis et des évaluations afin de favoriser
            la confiance entre conducteurs et passagers.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            ⭐ Avis et évaluations
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            À la fin de chaque trajet, les membres peuvent laisser une
            évaluation. Ces retours aident à maintenir une communauté
            respectueuse et fiable.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            🚗 Trajets transparents
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Les informations de trajet (itinéraire, horaires, prix, conducteur)
            sont clairement affichées avant toute réservation.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            📞 Assistance & signalement
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            En cas de problème, les utilisateurs peuvent contacter notre équipe
            ou signaler un comportement inapproprié directement depuis la
            plateforme.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            🧾 Conseils de sécurité
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Vérifiez toujours le profil du conducteur ou du passager</li>
            <li>Communiquez via la plateforme avant le trajet</li>
            <li>Partagez votre trajet avec un proche</li>
            <li>Respectez les règles de conduite et de courtoisie</li>
          </ul>
        </div>

        {/* Back */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block text-sm text-gray-600 hover:text-black transition"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
