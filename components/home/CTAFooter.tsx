import Link from "next/link";

interface CTAFooterProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  backgroundColor?: string;
  className?: string;
}

export default function CTAFooter({
  title = "Prêt à commencer votre voyage ?",
  description = "Rejoignez des milliers de voyageurs qui nous font confiance pour leurs besoins en covoiturage. Sûr, abordable et fiable.",
  primaryButtonText = "Trouver un trajet maintenant",
  primaryButtonHref = "/rides",
  secondaryButtonText = "Proposer un trajet",
  secondaryButtonHref = "/offer",  
  backgroundColor = "bg-gray-100",
  className = "",
}: CTAFooterProps) {
  return (
    <footer
      className={`mb-16 ${backgroundColor} text-gray-800 py-12 border-t border-gray-200 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4 text-black">{title}</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Link
            href={primaryButtonHref}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonHref}
            className="px-8 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition font-semibold"
          >
            {secondaryButtonText}
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
