"use client";
import { useState } from "react";

interface AdvantageItemProps {
  icon: string;
  title: string;
  description: string;
}

interface NewsletterFormData {
  email: string;
}

interface AdvantagesSectionProps {
  title?: string;
  advantages?: AdvantageItemProps[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (data: NewsletterFormData) => void;
  className?: string;
}

function AdvantageItem({ icon, title, description }: AdvantageItemProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function NewsletterCard({
  title = "Rejoignez notre newsletter",
  description = "Recevez les dernières nouveautés, offres exclusives et conseils de voyage directement dans votre boîte mail.",
  
  onSubmit,
}: {
  title?: string;
  description?: string;
  onSubmit?: (data: NewsletterFormData) => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email });
    }
    setEmail(""); // Reset form
  };

  return (
    <div className="p-8 rounded-2xl shadow-xl bg-white border border-gray-200">
      <h3 className="text-2xl font-bold mb-6 text-black">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
        >
    S’abonner
        </button>
      </form>
    </div>
  );
}

export default function AdvantagesSection({
  title = "Nos avantages",
  advantages = [
    {
      icon: "⚡",
      title: "Réservation instantanée",
      description: "Réservez votre trajet en quelques secondes grâce à notre processus simplifié",
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Optimisé pour les appareils mobiles pour plus de commodité en déplacement",
    },
    {
      icon: "💬",
      title: "Support 24/7",
      description: "Assistance client disponible à tout moment pour résoudre vos problèmes",
    },
  ],
  
  newsletterTitle,
  newsletterDescription,
  onNewsletterSubmit,
  className = "",
}: AdvantagesSectionProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {advantages.map((advantage, index) => (
              <AdvantageItem
                key={index}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
              />
            ))}
          </div>
          <NewsletterCard
            title={newsletterTitle}
            description={newsletterDescription}
            onSubmit={onNewsletterSubmit}
          />
        </div>
      </div>
    </section>
  );
}
