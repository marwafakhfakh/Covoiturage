import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarApp from "../components/NavbarApp";
import ReduxProvider from "../store/ReduxProvider";
import UserProfileLoader from "../components/UserProfileLoader";
import Footer from "../components/Footer";
import "leaflet/dist/leaflet.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "نملة  NAMLAA application de covoiturage légal et sécurisé",
  description: "Application de partage de trajets entre citoyens écologique et durable",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black min-h-screen flex flex-col`}
      >
     
      

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
