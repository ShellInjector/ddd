import { useTranslation } from "react-i18next";
import { MapPin, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaFlag } from "react-icons/fa";

// Fix leaflet marker icon issue in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// @ts-ignore - Type safety for leaflet prototype
L.Marker.prototype.options.icon = DefaultIcon;

// Type definition for locations
interface Location {
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  isNational: boolean;
}

const ServiceZones = () => {
  const { t } = useTranslation();
  const [showMap, setShowMap] = useState(false);

  // Coordonnées des villes marocaines et pays internationaux
  const locations: Location[] = [
    // Villes marocaines
    { name: "Casablanca", coordinates: [33.5731, -7.5898], isNational: true },
    { name: "Rabat", coordinates: [34.0209, -6.8416], isNational: true },
    { name: "Marrakech", coordinates: [31.6295, -7.9811], isNational: true },
    { name: "Fès", coordinates: [34.0181, -5.0078], isNational: true },
    { name: "Tanger", coordinates: [35.7595, -5.8340], isNational: true },
    { name: "Meknès", coordinates: [33.8731, -5.5407], isNational: true },
    { name: "Agadir", coordinates: [30.4278, -9.5981], isNational: true },
    { name: "Oujda", coordinates: [34.6805, -1.9005], isNational: true },
    { name: "El Jadida", coordinates: [33.2316, -8.5007], isNational: true },
    
    // Pays internationaux
    { name: "France (Paris)", coordinates: [48.8566, 2.3522], isNational: false },
    { name: "Espagne (Madrid)", coordinates: [40.4168, -3.7038], isNational: false },
    { name: "Portugal (Lisbonne)", coordinates: [38.7223, -9.1393], isNational: false },
    { name: "États-Unis (New York)", coordinates: [40.7128, -74.0060], isNational: false },
    { name: "Royaume-Uni (Londres)", coordinates: [51.5074, -0.1278], isNational: false },
    { name: "Allemagne (Berlin)", coordinates: [52.5200, 13.4050], isNational: false },
    { name: "Italie (Rome)", coordinates: [41.9028, 12.4964], isNational: false },
    { name: "Belgique (Bruxelles)", coordinates: [50.8503, 4.3517], isNational: false },
    { name: "Canada (Toronto)", coordinates: [43.6532, -79.3832], isNational: false }
  ];

  const moroccanCities = locations.filter(location => location.isNational).map(city => city.name);
  const internationalCountries = locations.filter(location => !location.isNational).map(country => country.name);
  
  // Create polylines connecting Agadir to other locations
  const agadir = locations.find(loc => loc.name === "Agadir")?.coordinates || [30.4278, -9.5981];
  
  // Grouper les emplacements nationaux et internationaux pour l'affichage
  const nationalLocations = locations.filter(loc => loc.isNational);
  const internationalLocations = locations.filter(loc => !loc.isNational);

  // Function to get flag color based on country
  const getFlagColor = (country: string): string => {
    if (country.includes("France")) return "text-blue-600";
    if (country.includes("Espagne")) return "text-red-600";
    if (country.includes("Portugal")) return "text-green-600";
    if (country.includes("États-Unis")) return "text-blue-700";
    if (country.includes("Royaume-Uni")) return "text-blue-800";
    if (country.includes("Allemagne")) return "text-yellow-600";
    if (country.includes("Italie")) return "text-green-700";
    if (country.includes("Belgique")) return "text-yellow-500";
    if (country.includes("Canada")) return "text-red-700";
    return "text-purple-500";
  };

  // Effet pour afficher la carte après que le composant soit monté
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Map component
  const MovingServicesMap = () => {
    return (
      <MapContainer 
        center={agadir}
        zoom={4} 
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marqueurs pour les villes marocaines */}
        {nationalLocations.map((location, idx) => (
          <Marker key={`national-${idx}`} position={location.coordinates}>
            <Popup>
              <div className="text-center">
                <strong className="text-primary-700">{location.name}</strong>
                <p className="text-xs mt-1">Déménagement national</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Marqueurs pour les pays internationaux */}
        {internationalLocations.map((location, idx) => (
          <Marker key={`international-${idx}`} position={location.coordinates}>
            <Popup>
              <div className="text-center">
                <strong className="text-primary-700">{location.name}</strong>
                <p className="text-xs mt-1">Déménagement international</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Polylines connecting Agadir to other cities in Morocco */}
        {nationalLocations.map((location, idx) => (
          location.name !== "Agadir" && (
            <Polyline
              key={`national-line-${idx}`}
              positions={[agadir, location.coordinates]}
              pathOptions={{ color: '#f97316', weight: 2, dashArray: '5,10' }}
            />
          )
        ))}
        
        {/* Polylines connecting Agadir to international locations */}
        {internationalLocations.map((location, idx) => (
          <Polyline
            key={`international-line-${idx}`}
            positions={[agadir, location.coordinates]}
            pathOptions={{ color: '#EC4899', weight: 2, dashArray: '5,10' }}
          />
        ))}
      </MapContainer>
    );
  };

  return (
    <section id="zones" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-secondary-600 font-semibold tracking-wide uppercase">
            {t("zones.subtitle")}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("zones.title")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("zones.description")}
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-orange-600 mb-4 flex items-center">
                <MapPin className="h-5 w-5 text-orange-500 mr-1" />
                {t("zones.national")}
              </h3>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {moroccanCities.map((city, index) => (
                      <div key={index} className="flex items-center">
                        <MapPin className="h-5 w-5 text-orange-500" />
                        <span className="ml-2 text-gray-700">{city}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">{t("zones.nationalMore")}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-pink-600 mb-4 flex items-center">
                <FaFlag className="h-5 w-5 text-pink-500 mr-1" />
                {t("zones.international")}
              </h3>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {internationalCountries.map((country, index) => (
                      <div key={index} className="flex items-center">
                        <FaFlag className={`h-5 w-5 ${getFlagColor(country)}`} />
                        <span className="ml-2 text-gray-700">{country}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">{t("zones.internationalMore")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{t("zones.mapTitle")}</h3>
              <div className="rounded-lg overflow-hidden bg-gray-100 relative h-[500px]">
                {showMap ? (
                  <MovingServicesMap />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-600 font-medium bg-white bg-opacity-75 px-4 py-2 rounded">
                      Chargement de la carte...
                    </p>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 z-10 bg-white p-3 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-1 bg-orange-500 mr-2"></div>
                    <span className="text-xs text-orange-700 font-medium">Déménagement national</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-pink-500 mr-2"></div>
                    <span className="text-xs text-pink-700 font-medium">Déménagement international</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceZones;
