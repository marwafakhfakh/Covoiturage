"use client";

import HeroSection from "../components/home/HeroSection";
import SearchForm from "../components/home/SearchForm";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import AdvantagesSection from "../components/home/AdvantagesSection";
import CTAFooter from "../components/home/CTAFooter";
import WhyNamlaa from "@/components/home/WhyNamlaa";

// adapter le chemin selon où est ton fichier


export default function Home() {
  const handleNewsletterSubmit = (data: { email: string }) => {
    console.log("Newsletter subscription:", data);
    alert("Thanks for subscribing to our newsletter!");
  };

  return (
    <div className="bg-white">
      <HeroSection />

      <SearchForm
        onSearch={(formData) => {
          const params = new URLSearchParams();
          Object.entries(formData).forEach(([key, value]) => {
            if (value) params.append(key, value);
          });
          window.location.href = `/rides?${params.toString()}`;
        }}
      />

      {/* Bloc علاش namlaa ? inséré après SearchForm */}
      <WhyNamlaa />

      <StatsSection />
      <FeaturesSection />
      <AdvantagesSection onNewsletterSubmit={handleNewsletterSubmit} />
      <CTAFooter />
    </div>
  );
}
