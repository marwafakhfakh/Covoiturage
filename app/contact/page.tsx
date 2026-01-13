import ContactHero from "@/components/ContactHero";

export default function ContactPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <ContactHero />

      {/* Formulaire */}
      <section className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          ❓ Foire Aux Questions (FAQ)
        </h2>

        <form className="mt-6 space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

  {/* Email 
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Adresse email
    </label>
    <input
      type="email"
      placeholder="exemple@email.com"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>*/}

  {/* Sujet */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Sujet
    </label>
    <select
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option>Créer un compte</option>
      <option>Proposer un trajet</option>
      <option>Réserver une place</option>
      <option>Sécurité</option>
      <option>Autre</option>
    </select>
  </div>

  {/* Message */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Message
    </label>
    <textarea
      rows={5}
      placeholder="Expliquez votre question ou problème..."
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Bouton */}
  <button
    type="submit"
    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
  >
    Envoyer le message
  </button>
</form>

      </section>

      {/* Section Bureaux 
      <section className="max-w-5xl mx-auto py-16 px-6 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-bold mb-4">📍 Nos bureaux</h2>
        <p><strong>Sfax :</strong> Sfax, Tunisie</p>
        <p><strong>Tunis :</strong> Tunis, Tunisie</p>
        <p className="text-gray-500 mt-2">
          (Bureaux administratifs – service digital disponible 24/7)
        </p>
      </section>*/}
    </main>
  );
}
