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
      label: "Active Users",
      description: "Join our growing community of travelers",
    },
    {
      value: "1M+",
      label: "Rides Shared",
      description: "Millions of successful journeys completed",
    },
    {
      value: "95%",
      label: "Satisfaction Rate",
      description: "Highly rated by our community",
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
