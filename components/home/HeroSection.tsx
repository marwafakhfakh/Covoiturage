"use client";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function HeroSection({
  title = " ثنيتي وثنيتك… علاش ما يوّلوش كيف كيف",
  backgroundImage = "/namlacouverture.jpg",
  primaryButtonText = "Trouver un trajet",
  primaryButtonHref = "/rides",
  secondaryButtonText = "Proposer un trajet",
  secondaryButtonHref = "/offer",
}: HeroSectionProps) {
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

        {/* Action Buttons */}
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
      </div>
    </section>
  );
}
