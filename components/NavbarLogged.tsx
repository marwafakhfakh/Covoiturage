"use client";
import Link from "next/link";
import { useState } from "react";
import api from "../api/api";

interface NavbarLoggedProps {
  user: {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
  };
}

export default function NavbarLogged({ user }: NavbarLoggedProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName =
    user.first_name || user.last_name
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim()
      : user.username || user.email || "User";

  const handleSignOut = async () => {
    try {
      // Call logout API
      await api.post("/api/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <nav className="w-full bg-white text-black border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-2xl text-black hover:text-gray-700 transition flex items-center"
          >
            <span className="mr-2">🚗</span>
            Covoiturage
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/rides"
              className="text-gray-700 hover:text-black transition font-medium px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Find Rides
            </Link>
            <Link
              href="/offer"
              className="text-gray-700 hover:text-black transition font-medium px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Offer Ride
            </Link>
            {/* User Name Display as Profile Link */}
            <Link
              href="/profile"
              className="flex items-center space-x-2 ml-4 font-medium text-black px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition"
            >
              <svg
                className="w-5 h-5 mr-1 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {userName}
            </Link>
            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 ml-2 font-medium text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-700 transition"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <Link
                href="/rides"
                className="text-gray-700 hover:text-black transition font-medium px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Find Rides
              </Link>
              <Link
                href="/offer"
                className="text-gray-700 hover:text-black transition font-medium px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Offer Ride
              </Link>
              {/* User Name Display Mobile as Profile Link */}
              <Link
                href="/profile"
                className="flex items-center px-3 py-2 font-medium text-black rounded-lg hover:bg-gray-100 hover:text-black transition"
              >
                <svg
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {userName}
              </Link>
              {/* Sign Out Button Mobile */}
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
