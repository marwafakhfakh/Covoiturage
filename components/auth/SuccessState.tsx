import Link from "next/link";

interface SuccessStateProps {
  email: string;
  onTryAgain: () => void;
}

export default function SuccessState({ email, onTryAgain }: SuccessStateProps) {
  return (
    <>
      {/* Header */}
      <div className="text-center">
        <Link href="/" className="flex items-center justify-center mb-6">
          <span className="text-3xl mr-3">🚗</span>
          <span className="font-bold text-3xl text-black">Covoiturage</span>
        </Link>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-black">Check your email</h2>
        <p className="mt-2 text-gray-600">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-black">{email}</span>
        </p>
      </div>

      {/* Success Card */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Please check your email and click on the link to reset your
            password. If you don&apos;t see the email, check your spam folder.
          </p>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4">
              Didn&apos;t receive the email?
            </p>
            <button
              onClick={onTryAgain}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/auth/login"
          className="font-medium text-black hover:text-gray-700 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to sign in
        </Link>
      </div>
    </>
  );
}
