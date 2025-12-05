interface ServicesDisplayProps {
  services: string[];
  title?: string;
  className?: string;
}

export default function ServicesDisplay({
  services,
  title = "Services & Amenities",
  className = "",
}: ServicesDisplayProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {services.map((service, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}
