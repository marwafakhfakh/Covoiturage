"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../api/api";
import AuthLayout from "../../../components/auth/AuthLayout";
import AuthCard from "../../../components/auth/AuthCard";
import FormField from "../../../components/auth/FormField";
import PasswordField from "../../../components/auth/PasswordField";
import CheckboxField from "../../../components/auth/CheckboxField";
import AuthButton from "../../../components/auth/AuthButton";
import SocialLoginButtons from "../../../components/auth/SocialLoginButtons";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
    receiveEmails: false,
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      // Use email as username if username is empty
      const username = formData.username || formData.email.split("@")[0];
      const body = {
        username,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
        first_name: formData.firstName,
        last_name: formData.lastName,
      };
     // await api.post("/api/auth/register/", body);
      await api.post("/api/auth/register/", body);

      router.push("/");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        agreeToTerms: false,
        receiveEmails: false,
        username: "",
      });
    } catch (err: unknown) {
      const error = err as any;
      setError(error?.response?.data?.detail ||
      Object.values(error?.response?.data || {}).flat().join(" ") || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join our community and start sharing rides today"
    >
      {/* Sign Up Form */}
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {/* Success message removed for instant redirect */}
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="username"
              name="username"
              label="Username"
              placeholder="john_doe21"
              value={formData.username}
              onChange={handleChange}
              required={false}
            />
            <FormField
              id="firstName"
              name="firstName"
              label="First name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              id="lastName"
              name="lastName"
              label="Last name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <FormField
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <FormField
            id="phone"
            name="phone"
            type="tel"
            label="Phone number"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {/* Checkboxes */}
          <div className="space-y-4">
            <CheckboxField
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-black hover:text-gray-700 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-black hover:text-gray-700 font-medium"
              >
                Privacy Policy
              </Link>
            </CheckboxField>

            <CheckboxField
              id="receiveEmails"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleChange}
            >
              I want to receive email updates about new features and offers
            </CheckboxField>
          </div>

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </AuthButton>
        </form>

        <SocialLoginButtons />
      </AuthCard>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-black hover:text-gray-700"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
