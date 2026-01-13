export default function TermsPage() {
    return (
      <main className="bg-gray-50">
        
        {/* HERO */}
        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Conditions d’utilisation
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Les présentes conditions régissent l’utilisation de la plateforme
              <strong> Namlaa</strong>, un service de covoiturage intelligent
              conçu pour faciliter vos déplacements en toute sécurité.
            </p>
          </div>
        </section>
  
        {/* CONTENU */}
        <section className="max-w-5xl mx-auto px-6 py-16 space-y-10">
          
          {/* Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              En accédant à la plateforme Namlaa, vous acceptez sans réserve les
              présentes Conditions d’utilisation. Si vous n’êtes pas d’accord avec
              ces conditions, veuillez ne pas utiliser le service.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Description du service
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Namlaa est une plateforme de mise en relation entre conducteurs et
              passagers souhaitant partager un trajet et répartir les frais de
              déplacement. Namlaa agit uniquement en tant qu’intermédiaire
              technologique.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Conditions d’accès
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Être âgé d’au moins 18 ans</li>
              <li>Créer un compte avec des informations exactes</li>
              <li>Détenir un permis valide pour les conducteurs</li>
              <li>Respecter la législation en vigueur</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. Compte utilisateur
            </h2>
            <p className="text-gray-600 leading-relaxed">
              L’utilisateur est responsable de la confidentialité de ses identifiants.
              Toute activité réalisée depuis son compte est réputée effectuée par lui.
              Namlaa se réserve le droit de suspendre ou supprimer un compte en cas d’abus.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              5. Obligations des utilisateurs
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Adopter un comportement respectueux</li>
              <li>Ne pas diffuser de contenu illégal ou trompeur</li>
              <li>Respecter les engagements pris lors des trajets</li>
              <li>Ne pas utiliser Namlaa à des fins frauduleuses</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              6. Responsabilité
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Namlaa ne peut être tenue responsable des incidents, retards,
              annulations ou litiges survenant entre les utilisateurs.
              Chaque utilisateur assume l’entière responsabilité de ses actes.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              7. Sécurité
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bien que Namlaa mette en œuvre des mesures de sécurité, le covoiturage
              comporte des risques inhérents que l’utilisateur accepte en utilisant
              la plateforme.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              8. Données personnelles
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Les données personnelles sont collectées et traitées conformément à la
              Politique de confidentialité de Namlaa. L’utilisateur dispose de droits
              d’accès, de modification et de suppression.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              9. Propriété intellectuelle
            </h2>
            <p className="text-gray-600 leading-relaxed">
              L’ensemble des éléments de la plateforme (logo, marque, design,
              contenus) est protégé par les droits de propriété intellectuelle
              et demeure la propriété exclusive de Namlaa.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              10. Modification des conditions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Namlaa se réserve le droit de modifier les présentes conditions à tout
              moment. Les utilisateurs seront informés via la plateforme.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              11. Droit applicable
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Les présentes Conditions d’utilisation sont régies par le droit tunisien.
              En cas de litige, une solution amiable sera privilégiée.
            </p>
          </div>
  
          {/* Footer info */}
          <div className="border-t pt-6 text-sm text-gray-500">
            Dernière mise à jour : 2025 – Namlaa
          </div>
  
        </section>
      </main>
    );
  }
  