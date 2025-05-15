import React from "react";
import logoImg from "../../assets/logo-coeur-souss.jpg";

interface RealMoverImageProps {
  alt: string;
  className?: string;
  withOverlay?: boolean;
}

const RealMoverImage: React.FC<RealMoverImageProps> = ({ 
  alt, 
  className = "",
  withOverlay = true
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-xl ${className}`}>
      <img 
        src={logoImg} 
        alt={alt} 
        className="w-full h-full object-contain bg-white p-4"
      />
      {withOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/80 to-transparent px-6 py-4">
          <p className="text-white font-bold text-xl">Coeur Souss Transport</p>
          <p className="text-white/90 text-sm mt-1">Votre partenaire de confiance pour tous vos déménagements</p>
        </div>
      )}
    </div>
  );
};

export default RealMoverImage;