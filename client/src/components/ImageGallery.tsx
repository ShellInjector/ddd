import React from "react";
import { useTranslation } from "react-i18next";

// Import the new image
import banniereAgadir from "../assets/Banniere-villes-Agadir.png";

const ImageGallery: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section id="gallery" className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-8">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            Galerie
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Découvrez nos services en images
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Visualisez notre expertise dans le domaine du déménagement à travers notre galerie de photos professionnelles.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl bg-white p-4">
            <img
              src={banniereAgadir}
              alt="Déménagement à Agadir et autres villes du Maroc - Illustration"
              className="w-full rounded-lg"
            />
            
            <div className="mt-4 px-4 py-3 bg-blue-50 rounded-lg">
              <p className="text-gray-800 font-medium text-lg mb-1">Services de déménagement national et international</p>
              <p className="text-gray-600">Coeur Souss Transport vous accompagne dans tous vos projets de déménagement, que ce soit au Maroc ou à l'international.</p>
            </div>
            
            <div className="absolute top-8 right-8 bg-white/90 px-3 py-2 rounded-lg shadow-md">
              <span className="text-blue-600 font-bold text-sm">Coeur Souss Transport</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;