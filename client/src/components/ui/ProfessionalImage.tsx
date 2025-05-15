import React from "react";
import movingTruckSvg from "../../assets/images/truck.svg";
import movingBoxesSvg from "../../assets/images/professional-boxes.svg";
import movingTeamSvg from "../../assets/images/professional-team.svg";

interface ProfessionalImageProps {
  type: "truck" | "boxes" | "team";
  alt: string;
  className?: string;
  withOverlay?: boolean;
}

const ProfessionalImage: React.FC<ProfessionalImageProps> = ({ 
  type, 
  alt, 
  className = "",
  withOverlay = true
}) => {
  const images = {
    truck: movingTruckSvg,
    boxes: movingBoxesSvg,
    team: movingTeamSvg
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-xl ${className}`}>
      <img 
        src={images[type]} 
        alt={alt} 
        className="w-full h-full object-contain bg-gradient-to-br from-white to-blue-50/50"
      />
      {withOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/90 to-transparent px-6 py-5">
          <p className="text-white font-bold text-xl">{alt}</p>
          <p className="text-white/90 text-sm mt-1">Service de qualité garantie</p>
        </div>
      )}
      <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-md">
        <span className="text-primary-700 font-bold text-sm">Coeur Souss Transport</span>
      </div>
    </div>
  );
};

export default ProfessionalImage;