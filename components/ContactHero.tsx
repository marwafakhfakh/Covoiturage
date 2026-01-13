import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="bg-gray-100 py-16 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white shadow-2xl px-8 md:px-12 py-16 flex flex-col lg:flex-row items-center gap-12 rounded-xl">
          
        {/* Texte */}
<div className="flex-1">
  <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
    Contact – Namlaa
  </h1>
  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-4">
    Vous avez une question, une suggestion ou besoin d’aide ?
    <br className="hidden lg:block" />
    <strong className="text-indigo-600 font-semibold block mt-2 lg:mt-0 lg:inline">
      L’équipe Namlaa
    </strong>{" "}
    est à votre écoute.
  </p>

  {/* Email et téléphone */}
  <div className="text-gray-700 text-base md:text-lg space-y-1">
    <p>
      📧 Email :{" "}
      <a href="mailto:contact@namlaa.com" className="text-indigo-600 hover:underline">
      founders@namlaa.com 
      </a>
    </p>
    <p>
      📞 Téléphone :{" "}
      <a href="tel:+21612345678" className="text-indigo-600 hover:underline">
        +216 24 605 900
      </a>
    </p>
  </div>
</div>

          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Image
              src="/namlatrad.png"
              alt="Contact Namlaa"
              width={400}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
