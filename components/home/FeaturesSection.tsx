interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: FeatureCardProps[];
  backgroundColor?: string;
  className?: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl text-center shadow-lg bg-white border border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function FeaturesSection({
  title = "Pourquoi nous choisir ?",
  subtitle = "Nous nous engageons à rendre votre expérience de voyage sûre, abordable et agréable.",
  features = [
    {
      icon: "🛡️",
      title: "Sûr & Sécurisé",
      description: "Conducteurs vérifiés et système de paiement sécurisé",
    },
    {
      icon: "💰",
      title: "Économique",
      description: "Économisez de l’argent en partageant les frais de voyage",
    },
    {
      icon: "🌱",
      title: "Écologique",
      description: "Réduisez ensemble votre empreinte carbone",
    },
    {
      icon: "👥",
      title: "Social",
      description: "Rencontrez de nouvelles personnes et faites-vous des amis",
    }    
  ],
  backgroundColor = "bg-gray-50",
  className = "",
}: FeaturesSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-black">
          {title}
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
