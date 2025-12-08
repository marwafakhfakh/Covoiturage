interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

interface StatsSectionProps {
  stats?: StatCardProps[];
  className?: string;
}

function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="text-4xl font-bold text-black mb-2">{value}</div>
      <div className="text-xl font-semibold text-black mb-2">{label}</div>
      <div className="text-gray-600">{description}</div>
    </div>
  );
}

export default function StatsSection({
  stats = [
    {
      value: "50,000+",
      label: "Utilisateurs actifs",
      description: "Rejoignez notre communauté de voyageurs en pleine croissance",
    },
    {
      value: "1M+",
      label: "Trajets partagés",
      description: "Des millions de trajets réussis effectués",
    },
    {
      value: "95%",
      label: "Taux de satisfaction",
      description: "Très bien noté par notre communauté",
    },
  ],
  className = "",
}: StatsSectionProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
