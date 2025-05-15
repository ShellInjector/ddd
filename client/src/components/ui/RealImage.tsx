import React from "react";
import demenagementImg from "../../assets/demenagement.jpg";

interface RealImageProps {
  alt: string;
  className?: string;
  withOverlay?: boolean;
}

const RealImage: React.FC<RealImageProps> = ({ 
  alt, 
  className = "",
  withOverlay = true
}) => {
  return (
    <div className={`relative overflow-hidden rounded-lg shadow-xl ${className}`}>
      <img 
        src={demenagementImg} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
      {withOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/90 to-transparent px-6 py-5">
          <p className="text-white font-bold text-xl">{alt}</p>
          <p className="text-white/90 text-sm mt-1">Déménagement professionnel depuis 2005</p>
        </div>
      )}
      <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-md">
        <span className="text-primary-700 font-bold text-sm">Coeur Souss Transport</span>
      </div>
      <div className="absolute top-4 left-4 bg-secondary-500/90 px-3 py-2 rounded-lg shadow-md">
        <span className="text-white font-bold text-sm">100% Satisfaction</span>
      </div>
    </div>
  );
};

export default RealImage;