import React from "react";

interface PlaceholderImageProps {
  type: "truck" | "boxes" | "team";
  alt: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ type, alt, className = "" }) => {
  // Définir les couleurs de base pour les images
  const bgColors = {
    truck: "bg-blue-200",
    boxes: "bg-blue-100",
    team: "bg-blue-300"
  };

  const icons = {
    truck: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-24 w-24 text-blue-700" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" 
        />
      </svg>
    ),
    boxes: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-24 w-24 text-blue-700" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0-6.75h-3.75m3.75 0h3.75M9 12.75L12 16.5l3-3.75" 
        />
      </svg>
    ),
    team: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-24 w-24 text-blue-700" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" 
        />
      </svg>
    )
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-lg ${bgColors[type]} ${className}`}>
      <div className="flex items-center justify-center w-full h-full p-8">
        {icons[type]}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/70 to-transparent p-4">
        <p className="text-white font-bold text-lg">{alt}</p>
      </div>
    </div>
  );
};

export default PlaceholderImage;