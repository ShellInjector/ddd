import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Truck } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check if we're on the homepage
  const isHome = location === "/";

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <Truck className="h-8 w-8 text-primary-600 mr-2" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-primary-700 leading-tight">Coeur Souss</span>
                <span className="text-sm font-semibold text-primary-600 leading-tight">Transport</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection("about", e)}
              className="text-base font-medium text-gray-700 hover:text-primary-600"
            >
              {t("nav.about")}
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection("services", e)}
              className="text-base font-medium text-gray-700 hover:text-primary-600"
            >
              {t("nav.services")}
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection("gallery", e)}
              className="text-base font-medium text-gray-700 hover:text-primary-600"
            >
              {t("nav.gallery")}
            </a>
            <a 
              href="#zones" 
              onClick={(e) => scrollToSection("zones", e)}
              className="text-base font-medium text-gray-700 hover:text-primary-600"
            >
              {t("nav.zones")}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection("contact", e)}
              className="text-base font-medium text-gray-700 hover:text-primary-600"
            >
              {t("nav.contact")}
            </a>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <LanguageSwitcher />
            <a 
              href="#devis" 
              onClick={(e) => scrollToSection("devis", e)}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              {t("nav.quoteBtn")}
            </a>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <Button 
              variant="ghost" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection("about", e)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t("nav.about")}
            </a>
            <a 
              href="#services" 
              onClick={(e) => scrollToSection("services", e)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t("nav.services")}
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection("gallery", e)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t("nav.gallery")}
            </a>
            <a 
              href="#zones" 
              onClick={(e) => scrollToSection("zones", e)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t("nav.zones")}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection("contact", e)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              {t("nav.contact")}
            </a>
            <div className="flex items-center px-3 py-2">
              <LanguageSwitcher />
            </div>
            <a 
              href="/devis" 
              className="block w-full px-5 py-3 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Demander un devis
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
