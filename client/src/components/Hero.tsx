import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import demenagementImg from "../assets/demenagement.jpg";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Image de fond en plein écran */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${demenagementImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Contenu au premier plan */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:text-left max-w-lg md:max-w-2xl bg-white bg-opacity-90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{t("hero.title1")}</span>
              <span className="block text-primary-600">{t("hero.title2")}</span>
            </h1>
            <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              {t("hero.description")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <a
                href="/devis"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 w-full sm:w-auto shadow-lg"
              >
                Demander un devis
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection("contact", e)}
                className="flex items-center justify-center px-8 py-3 border border-secondary-500 text-base font-medium rounded-md text-secondary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 w-full sm:w-auto"
              >
                {t("hero.contactUs")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logo ou marque en haut à gauche */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white drop-shadow-md">Coeur Souss Transport</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;