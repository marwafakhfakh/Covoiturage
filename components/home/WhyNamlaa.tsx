// app/why-namlaa/page.tsx
"use client";

import {
  BanknotesIcon,
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function WhyNamlaa() {
  const features = [
    {
      title: "Économiser sur les frais",
      description:
        "Partage les coûts avec les autres passagers et économise sur tes dépenses de transport quotidiennes, que ce soit pour le travail, les études ou les trajets entre villes.",
      icon: BanknotesIcon,
    },
    {
      title: "Des trajets plus simples et rapides",
      description:
        "Trouve une place en voiture à tout moment et choisis l’horaire qui te convient, avec des trajets disponibles entre de nombreuses villes.",
      icon: ClockIcon,
    },
    {
      title: "Une communauté fiable et sûre",
      description:
        "Profils clairs, numéros de téléphone vérifiés et avis authentiques sur les conducteurs et les passagers pour des trajets plus rassurants.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Rencontrer de nouvelles personnes",
      description:
        "Tes trajets deviennent une occasion de faire des rencontres, d’échanger et de partager le voyage avec des personnes qui ont la même destination que toi.",
      icon: UsersIcon,
    },
    {
      title: "Un réseau dans tout le pays",
      description:
        "Namlaa connecte les grandes villes et les régions intérieures pour te proposer en permanence des solutions de déplacement.",
      icon: GlobeAltIcon,
    },
    {
      title: "Une communication simple et claire",
      description:
        "Messagerie directe entre conducteurs et passagers avant le trajet pour clarifier et convenir de tous les détails.",
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="py-10">
      <div className="container mx-auto max-w-5xl px-4 text-center">
  <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 font-serif">
   علاش  <span className="text-black">نملة</span>
  </h1>
  <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-sans">
    نملة هي منصة كوفويتراج (مشاركة الركوب) مبتكرة في تونس، تربط بين
    السائقين والركّاب باش يشاركوا نفس الطريق ويقسّموا مصاريف التنقل
    بطريقة آمنة، سهلة، واقتصادية والأهم من هذا، نملة موش منصة ربح، بل
    منصة تشاركية هدفها تخفيض المصاريف وتقليل الزحمة، موش تحقيق الأرباح
    على حساب الركّاب
  </p>
</div>

      </section>

      {/* Grid de blocs avec icônes */}
      <section className="pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
