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
  //const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    //setSuccess(false);

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
        phone_number: formData.phone,  // ← Ajoutez cette ligne

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
    } catch (err) {
  console.error('❌ Registration error:', err);
  if (err && typeof err === 'object' && 'response' in err) {
    const error = err as { response?: { data?: { detail?: string; [key: string]: unknown } } };
    const detail = error.response?.data?.detail;
    const allErrors = error.response?.data 
      ? Object.values(error.response.data).flat().join(" ")
      : "";
    setError(detail || allErrors || "Registration failed");
  } else {
    setError("Registration failed");
  }}
 finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
  title="Créez votre compte"
  subtitle="Rejoignez notre communauté et commencez à partager vos trajets dès aujourd'hui"
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
              value={formData.username}
              onChange={handleChange}
              required={false}
            />
            <FormField
              id="firstName"
              name="firstName"
              label="Prenom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              id="lastName"
              name="lastName"
              label="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <FormField
            id="email"
            name="email"
            type="email"
            label="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <FormField
            id="phone"
            name="phone"
            type="tel"
            label="Numero de téléphone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <PasswordField
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
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
  J&apos;accepte les{" "}
  <Link
    href="/terms"
    className="text-black hover:text-gray-700 font-medium"
  >
    Conditions d&apos;utilisation
  </Link>{" "}
  et la{" "}
  <Link
    href="/privacy"
    className="text-black hover:text-gray-700 font-medium"
  >
    Politique de confidentialité
  </Link>
</CheckboxField>


            <CheckboxField
              id="receiveEmails"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleChange}
            >
  Je souhaite recevoir des emails concernant les nouvelles fonctionnalités et les offres
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
  Vous avez déjà un compte ?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-black hover:text-gray-700"
          >
    Connectez-vous ici
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
