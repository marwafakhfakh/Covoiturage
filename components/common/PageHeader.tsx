interface PageHeaderProps {
  title: string;
  subtitle?: string;
  searchInfo?: {
    from?: string;
    to?: string;
    date?: string;
  };
  resultCount?: number;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  searchInfo,
  resultCount,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
          {title}
        </h1>

        {searchInfo && (searchInfo.from || searchInfo.to) ? (
          <div className="text-center mb-4">
            <p className="text-lg text-gray-600">
              {searchInfo.from && searchInfo.to ? (
                <>
                  Rides from{" "}
                  <span className="font-semibold text-gray-900">
                    {searchInfo.from}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900">
                    {searchInfo.to}
                  </span>
                </>
              ) : searchInfo.from ? (
                <>
                  Rides from{" "}
                  <span className="font-semibold text-gray-900">
                    {searchInfo.from}
                  </span>
                </>
              ) : (
                <>
                  Rides to{" "}
                  <span className="font-semibold text-gray-900">
                    {searchInfo.to}
                  </span>
                </>
              )}
              {searchInfo.date && (
                <>
                  {" "}
                  on{" "}
                  <span className="font-semibold text-gray-900">
                    {new Date(searchInfo.date).toLocaleDateString()}
                  </span>
                </>
              )}
            </p>
            {typeof resultCount === "number" && (
              <p className="text-sm text-gray-500 mt-2">
                {resultCount} ride{resultCount !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        ) : (
          <div className="text-center mb-4">
            <p className="text-lg text-gray-600 mb-2">
              {subtitle || "All Available Rides"}
            </p>
            {typeof resultCount === "number" && (
              <p className="text-sm text-gray-500">
                {resultCount} ride{resultCount !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
