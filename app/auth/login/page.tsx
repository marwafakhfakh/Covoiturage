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
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function Login() {

  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    
    // ✅ NETTOYER tout token avant login
    localStorage.removeItem('auth_token');
    console.log('🧹 Token supprimé avant login');
    
    try {
      const body = {
        username: formData.email,
        password: formData.password,
      };
      const response = await api.post("/api/auth/login/", body);
      
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        console.log('✅ Nouveau token sauvegardé');
      }
      
      const profileRes = await api.get("/api/auth/profile/");
      dispatch(setUser(profileRes.data));
      router.push("/rides");
    } catch (err: unknown) {
  console.error('❌ Login error:', err);
  const errorMessage = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Login échoué";
  setError(errorMessage);

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account">
      <AuthCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <FormField
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <div className="flex items-center justify-between">
            <CheckboxField
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            >
              Remember me
            </CheckboxField>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-black hover:text-gray-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </AuthButton>
        </form>
        <SocialLoginButtons />
      </AuthCard>
      <div className="text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-black hover:text-gray-700"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
