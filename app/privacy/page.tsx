import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔒</span>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            Cette politique explique comment Namlaa collecte, utilise et protège
            vos données personnelles lorsque vous utilisez notre plateforme de
            covoiturage.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {[
          {
            title: "1. Données collectées",
            content:
              "Nous collectons les informations nécessaires à la création et à la gestion de votre compte : nom, numéro de téléphone, adresse e-mail, informations de trajet et données de communication entre utilisateurs.",
          },
          {
            title: "2. Utilisation des données",
            content:
              "Les données collectées sont utilisées pour faciliter le covoiturage, assurer la sécurité des utilisateurs, améliorer nos services et communiquer des informations importantes.",
          },
          {
            title: "3. Partage des données",
            content:
              "Namlaa ne vend ni ne loue vos données personnelles. Certaines informations peuvent être partagées uniquement avec les utilisateurs concernés par un trajet ou lorsque la loi l’exige.",
          },
          {
            title: "4. Sécurité des données",
            content:
              "Nous mettons en œuvre des mesures techniques et organisationnelles afin de protéger vos données contre l’accès non autorisé, la perte ou l’altération.",
          },
          {
            title: "5. Vos droits",
            list: [
              "Accéder à vos données personnelles",
              "Demander leur modification ou suppression",
              "Limiter ou refuser certains traitements",
            ],
          },
          {
            title: "6. Cookies",
            content:
              "Des cookies peuvent être utilisés pour améliorer votre expérience, analyser l’audience et garantir le bon fonctionnement de la plateforme.",
          },
          {
            title: "7. Modifications",
            content:
              "Cette politique peut être mise à jour à tout moment. Les utilisateurs seront informés en cas de modification importante.",
          },
        ].map((section, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-black mb-2">{section.title}</h2>
            {section.content && (
              <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
            )}
            {section.list && (
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">📩 Contact</h2>
          <p className="text-sm text-gray-700">
            Pour toute question relative à la protection des données, vous pouvez
            nous contacter via la page{" "}
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
