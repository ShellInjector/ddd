import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Convert ESM file URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Données de test
const testData = [
  {
    firstName: "Mohammed",
    lastName: "Alami",
    email: "mohammed.alami@example.com",
    phone: "0661234567",
    moveType: "National",
    moveDate: "2025-05-15",
    originAddress: "10 Rue des Palmiers",
    originCity: "Casablanca",
    destinationAddress: "25 Avenue Hassan II",
    destinationCity: "Marrakech",
    homeSize: "3 Bedroom",
    inventory: JSON.stringify({
      furniture: { beds: 2, tables: 1, chairs: 4, sofas: 1 },
      specialItems: ["Piano"]
    }),
    additionalNotes: "J'ai beaucoup de livres à déménager également",
    additionalServices: JSON.stringify(["packing", "furniture_assembly"]),
    referralSource: "Google"
  },
  {
    firstName: "Fatima",
    lastName: "Benali",
    email: "fatima.benali@example.com",
    phone: "0677889900",
    moveType: "International",
    moveDate: "2025-06-10",
    originAddress: "15 Boulevard Zerktouni",
    originCity: "Agadir", 
    destinationAddress: "47 Rue de Rivoli",
    destinationCity: "Paris",
    homeSize: "2 Bedroom",
    inventory: JSON.stringify({
      furniture: { beds: 1, tables: 2, chairs: 6, sofas: 2 },
      specialItems: ["Art Collection"]
    }),
    additionalNotes: "Déménagement pour études",
    additionalServices: JSON.stringify(["packing", "storage", "cleaning"]),
    referralSource: "Facebook"
  },
  {
    firstName: "Karim",
    lastName: "Tazi",
    email: "karim.tazi@example.com",
    phone: "0655443322",
    moveType: "National",
    moveDate: "2025-05-25",
    originAddress: "30 Avenue Mohammed V",
    originCity: "Rabat",
    destinationAddress: "12 Rue Ibn Battouta",
    destinationCity: "Fès",
    homeSize: "4 Bedroom",
    inventory: JSON.stringify({
      furniture: { beds: 3, tables: 2, chairs: 8, sofas: 2 },
      specialItems: ["Antique Furniture"]
    }),
    additionalNotes: "Besoin d'une manipulation spéciale pour les meubles anciens",
    additionalServices: JSON.stringify(["packing", "furniture_disassembly"]),
    referralSource: "Friend"
  }
];

// Chemin du fichier pour stocker les données
const dataPath = path.join(__dirname, 'quote-requests.json');

// Écrire les données dans un fichier JSON
fs.writeFileSync(dataPath, JSON.stringify(testData, null, 2));

console.log(`Données de test écrites dans ${dataPath}`);
console.log("Maintenant, ajoutez ces données à la base de données en utilisant l'API.");
console.log("Exemple de commande curl pour ajouter la première entrée :");
console.log("curl -X POST http://localhost:5000/api/quote-requests -H \"Content-Type: application/json\" -d @quote-requests-0.json");

// Extraire chaque entrée dans un fichier séparé pour faciliter l'utilisation avec curl
testData.forEach((data, index) => {
  const singleDataPath = path.join(__dirname, `quote-requests-${index}.json`);
  fs.writeFileSync(singleDataPath, JSON.stringify(data));
  console.log(`Données #${index + 1} écrites dans ${singleDataPath}`);
});

console.log("Exécution terminée");