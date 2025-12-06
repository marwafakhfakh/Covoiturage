import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarApp from "../components/NavbarApp";
import ReduxProvider from "../store/ReduxProvider";
import UserProfileLoader from "../components/UserProfileLoader";
import Footer from "../components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Covoiturage",
  description: "Carpooling App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
        {/* Script Google Maps + Places */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />

        <ReduxProvider>
          <UserProfileLoader>
            <NavbarApp />
            <main>{children}</main>
            <Footer />
          </UserProfileLoader>
        </ReduxProvider>
      </body>
    </html>
  );
}
