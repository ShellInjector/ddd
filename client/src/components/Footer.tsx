import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <svg className="h-8 w-auto text-white" viewBox="0 0 40 40" fill="currentColor">
                <path d="M34 22h-2v-8c0-2.2-1.8-4-4-4h-8V8h2c1.1 0 2-.9 2-2s-.9-2-2-2h-6c-1.1 0-2 .9-2 2s.9 2 2 2h2v2h-8c-2.2 0-4 1.8-4 4v8H4c-1.1 0-2 .9-2 2s.9 2 2 2h2v6c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2v-6h2c1.1 0 2-.9 2-2s-.9-2-2-2zm-6-8v8H12v-8h16zm-2 16H8v-4h18v4z" />
              </svg>
              <span className="ml-2 text-xl font-bold text-white">Coeur Souss Transport</span>
            </div>
            <p className="mt-4 text-base text-gray-300">
              {t("footer.description")}
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t("footer.categories.services")}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {(t("footer.categories.servicesList", { returnObjects: true }) as string[]).map(
                (service: string, index: number) => (
                  <li key={index}>
                    <a href="#services" className="text-base text-gray-300 hover:text-white">
                      {service}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t("footer.categories.zones")}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {(t("footer.categories.zonesList", { returnObjects: true }) as string[]).map(
                (zone: string, index: number) => (
                  <li key={index}>
                    <a href="#zones" className="text-base text-gray-300 hover:text-white">
                      {zone}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t("footer.categories.legal")}
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {(t("footer.categories.legalList", { returnObjects: true }) as string[]).map(
                (legal: string, index: number) => (
                  <li key={index}>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      {legal}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
