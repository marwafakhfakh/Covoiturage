"use client";
import Link from "next/link";
import { useState } from "react";
import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import FormField from "../../../components/auth/FormField";
import AuthButton from "../../../components/auth/AuthButton";
import SuccessState from "../../../components/auth/SuccessState";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);

    // Handle password reset logic here
    console.log("Password reset requested for:", email);
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SuccessState email={email} onTryAgain={handleTryAgain} />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries! Enter your email address and we'll send you a link to reset your password."
    >
      {/* Reset Form */}
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <AuthButton type="submit" loading={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </AuthButton>
        </form>

        {/* Additional Help */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-black mb-2">Need help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you&apos;re having trouble resetting your password, contact our
              support team.
            </p>
            <Link
              href="/contact"
              className="text-sm text-black hover:text-gray-700 font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </AuthCard>

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
          Retour à la connexion
        </Link>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-gray-600">
         Vous n&apos;avez pas de compte ?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-black hover:text-gray-700"
          >
      Inscrivez-vous ici
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
