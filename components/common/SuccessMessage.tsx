interface SuccessMessageProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export default function SuccessMessage({
  icon = "✅",
  title = "Success!",
  description = "Your action has been completed successfully.",
  actionText = "Continue",
  onAction,
  className = "",
}: SuccessMessageProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
