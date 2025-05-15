import { useTranslation } from "react-i18next";
import { Shield, Scale, Globe, Clock } from "lucide-react";
import movingImg from "../assets/1.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-12 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            {t("about.subtitle")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des solutions adaptées à tous vos besoins
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Que vous déménagiez à l'intérieur du Maroc ou à l'international, nous proposons des services sur mesure.
          </p>
        </div>

        <div className="mt-8 mb-12 flex justify-center">
          <div className="relative overflow-hidden rounded-lg shadow-xl max-w-3xl">
            <img 
              src={movingImg} 
              alt="Déménagement professionnel - Emballage sécurisé" 
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t("about.features.security.title")}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {t("about.features.security.description")}
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Scale className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t("about.features.fullService.title")}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {t("about.features.fullService.description")}
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t("about.features.coverage.title")}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {t("about.features.coverage.description")}
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {t("about.features.punctuality.title")}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {t("about.features.punctuality.description")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
