"use client";

import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "1️⃣ Créez votre compte",
      description:
        "Inscrivez-vous sur Namlaa avec votre email ou votre numéro WhatsApp. Remplissez vos informations personnelles pour commencer.",
      image: "/how-it-works/signup.png", // mettre l'image correspondante
    },
    {
      title: "2️⃣ Recherchez un trajet",
      description:
        "Entrez votre point de départ et votre destination, choisissez la date et l’heure du trajet, et explorez les offres disponibles.",
      image: "/how-it-works/search.png",
    },
    {
      title: "3️⃣ Réservez votre trajet",
      description:
        "Sélectionnez l’offre qui vous convient et confirmez votre réservation. Vous recevrez une notification de confirmation immédiatement.",
      image: "/how-it-works/booking.png",
    },
    {
      title: "4️⃣ Voyagez en toute sécurité",
      description:
        "Rencontrez votre conducteur ou vos passagers, suivez les instructions de la plateforme et profitez d’un trajet sûr et confortable.",
      image: "/how-it-works/travel.png",
    },
    {
      title: "5️⃣ Notez et laissez un avis",
      description:
        "Après le trajet, laissez un avis pour améliorer la communauté Namlaa et aider les futurs utilisateurs.",
      image: "/how-it-works/review.png",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Comment ça marche – Namlaa
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Découvrez en quelques étapes simples comment utiliser Namlaa pour vos trajets en covoiturage.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-6 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              <Image
                src={step.image}
                alt={step.title}
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {step.title}
              </h2>
              <p className="text-gray-700 text-base md:text-lg">{step.description}</p>
            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">📩 Besoin d’aide ?</h2>
          <p className="text-gray-700 text-sm md:text-base">
            Si vous avez des questions, contactez-nous via la page{" "}
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
