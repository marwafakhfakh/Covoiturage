import Link from "next/link";

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "Comment créer un compte sur Namlaa ?",
      answer:
        "Pour créer un compte, cliquez sur 'S’inscrire', remplissez vos informations personnelles, et confirmez votre adresse e-mail.",
    },
    {
      question: "Comment réserver un trajet ?",
      answer:
        "Recherchez votre trajet en entrant le point de départ et la destination, sélectionnez l’offre souhaitée et confirmez la réservation.",
    },
    {
      question: "Comment annuler un trajet réservé ?",
      answer:
        "Vous pouvez annuler votre trajet depuis la section 'Mes réservations'. Selon le délai, des frais d’annulation peuvent s’appliquer.",
    },
    {
      question: "Comment contacter un conducteur ou un passager ?",
      answer:
        "Vous pouvez envoyer un message via le chat intégré sur la page du trajet réservé.",
    },
    {
      question: "Comment signaler un problème ou un abus ?",
      answer:
        "Utilisez le formulaire de contact disponible sur la page Contact ou signalez directement depuis le trajet concerné.",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Centre d’aide – Namlaa
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Trouvez des réponses aux questions les plus fréquentes sur notre
            plateforme de covoiturage.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-700 text-sm md:text-base">{faq.answer}</p>
          </div>
        ))}

        {/* Contact */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">📩 Contact</h2>
          <p className="text-sm md:text-base text-gray-700">
            Vous n’avez pas trouvé de réponse ? Contactez-nous via la page{" "}
            <Link
              href="/contact"
              className="text-indigo-600 font-medium hover:underline"
            >
              Contact
            </Link>
            .
          </p>
        </div>

        {/* Back */}
        <div className="pt-4 text-center">
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
