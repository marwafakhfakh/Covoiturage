"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="w-full bg-white text-black border-b border-gray-200 shadow-sm sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <Image
              src="/namlaa.png" // fichier dans /public
              alt="Namlaa"
              width={90}
              height={60}
              className="object-contain"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link
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
              Trouver un trajet
            </Link> */}
            {/* <Link
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
            </Link> */}
            {/* Sign In & Sign Up Buttons */}
            <Link
              href="/auth/login"
              className="ml-4 px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-gray-900 transition border-2 border-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Se connecter
            </Link>
            <Link
              href="/auth/signup"
              className="ml-2 px-6 py-2 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              S&apos;inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
          <div className="md:hidden">
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
              {/* <Link
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
              </Link> */}
              {/* Sign In & Sign Up Buttons Mobile */}
              <Link
                href="/auth/login"
                className="block w-full text-center mt-2 px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-gray-900 transition border-2 border-black shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/signup"
                className="block w-full text-center mt-2 px-6 py-2 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                S&apos;incrire
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
