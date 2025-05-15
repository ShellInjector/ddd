import { useTranslation } from "react-i18next";
import { Home, Building2, Globe, Package, Warehouse, FileText } from "lucide-react";
import RealImage from "./ui/RealImage";

const Services = () => {
  const { t } = useTranslation();

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("devis");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <Home className="h-6 w-6 text-white" />,
      title: t("services.serviceList.0.title"),
      description: t("services.serviceList.0.description"),
    },
    {
      icon: <Building2 className="h-6 w-6 text-white" />,
      title: t("services.serviceList.1.title"),
      description: t("services.serviceList.1.description"),
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: t("services.serviceList.2.title"),
      description: t("services.serviceList.2.description"),
    },
    {
      icon: <Package className="h-6 w-6 text-white" />,
      title: t("services.serviceList.3.title"),
      description: t("services.serviceList.3.description"),
    },
    {
      icon: <Warehouse className="h-6 w-6 text-white" />,
      title: t("services.serviceList.4.title"),
      description: t("services.serviceList.4.description"),
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: t("services.serviceList.5.title"),
      description: t("services.serviceList.5.description"),
    },
  ];

  return (
    <section id="services" className="py-12 bg-gradient-to-l from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            {t("services.subtitle")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("services.title")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("services.description")}
          </p>
        </div>

        <div className="mt-8 mb-12">
          <RealImage 
            alt="Services de déménagement national et international" 
            className="w-full max-w-3xl mx-auto"
          />
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-600 rounded-md p-3">
                      {service.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <a
                    href="#devis"
                    onClick={scrollToQuote}
                    className="text-base font-medium text-primary-600 hover:text-primary-500"
                  >
                    {t("services.requestQuote")} <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
