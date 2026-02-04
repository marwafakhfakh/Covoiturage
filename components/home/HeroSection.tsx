// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface HeroSectionProps {
//   title?: string;
//   subtitle?: string;
//   backgroundImage?: string;
//   primaryButtonText?: string;
//   primaryButtonHref?: string;
//   secondaryButtonText?: string;
//   secondaryButtonHref?: string;
// }

// export default function HeroSection({
//   title = " ثنيتي وثنيتك… علاش ما يوّلوش كيف كيف",
//   backgroundImage = "/namlacouverture.jpg",
//   primaryButtonText = "Trouver un trajet",
//   primaryButtonHref = "/rides",
//   secondaryButtonText = "Proposer un trajet",
//   secondaryButtonHref = "/offer",
// }: HeroSectionProps) {
//   return (
//     <section className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <Image
//           src={backgroundImage}
//           alt="People sharing a car journey"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/50"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 text-center max-w-4xl mx-auto">
//         <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
//           {title}
//         </h1>
//         <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
         
//         </p>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href={primaryButtonHref}
//             className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition font-semibold"
//           >
//             {primaryButtonText}
//           </Link>
//           <Link
//             href={secondaryButtonHref}
//             className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
//           >
//             {secondaryButtonText}
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

// Type pour l'utilisateur
interface User {
  id: number;
  email: string;
  name?: string;
  // Ajoute d'autres propriétés selon ton modèle User
}

// Type pour le Redux store
interface RootState {
  user: {
    user: User | null;
  };
}

export default function HeroSection({
  title = " ثنيتي وثنيتك… علاش ما يوّلوش كيف كيف",
  backgroundImage = "/namlacouverture.jpg",
  primaryButtonText = "Trouver un trajet",
  primaryButtonHref = "/rides",
  secondaryButtonText = "Proposer un trajet",
  secondaryButtonHref = "/offer",
}: HeroSectionProps) {
  // Vérifier si l'utilisateur est connecté
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!user;

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="People sharing a car journey"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          {title}
        </h1>
        <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
         
        </p>

        {/* Action Buttons - Affichés uniquement si connecté */}
        {isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonHref}
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonHref}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
            >
              {secondaryButtonText}
            </Link>
          </div>
        )}

        {/* Message si non connecté */}
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Se connecter
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
            >
              S&apos;inscrire
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}