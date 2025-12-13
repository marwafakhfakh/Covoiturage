// // // app/offer/SingleLocationMap.tsx
// // "use client";

// // import { useEffect, useMemo } from "react";
// // import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// // import type { LatLngExpression } from "leaflet";
// // import type { Delegation } from "./DelegationMapLeaflet";

// // // Composant pour recentrer la carte
// // function MapRecenter({ center, zoom }: { center: LatLngExpression; zoom: number }) {
// //   const map = useMap();
  
// //   useEffect(() => {
// //     map.setView(center, zoom);
// //   }, [center, zoom, map]);
  
// //   return null;
// // }

// // interface SingleLocationMapProps {
// //   delegations: Delegation[];
// //   selectedLocation: string;
// //   label: string;
// //   markerColor?: "departure" | "arrival";
// // }

// // export default function SingleLocationMap({
// //   delegations,
// //   selectedLocation,
// //   label,
// //   markerColor = "departure"
// // }: SingleLocationMapProps) {
// //   // Trouver la délégation sélectionnée
// //   const delegation = delegations.find((d) => d.name === selectedLocation);
  
// //   const lat = delegation ? parseFloat(delegation.latitude) : null;
// //   const lng = delegation ? parseFloat(delegation.longitude) : null;
  
// //   const hasValidCoords = 
// //     lat !== null &&
// //     lng !== null &&
// //     !Number.isNaN(lat) &&
// //     !Number.isNaN(lng);

// //   // Centre de la carte
// //   const center: LatLngExpression = useMemo(() => {
// //     if (hasValidCoords && lat !== null && lng !== null) {
// //       return [lat, lng];
// //     }
// //     return [35.7, 10.0]; // Centre Tunisie par défaut
// //   }, [hasValidCoords, lat, lng]);

// //   // Niveau de zoom
// //   const zoom = hasValidCoords ? 13 : 7;

// //   return (
// //     <div className="space-y-2">
// //       <label className="block text-sm font-semibold text-gray-700">
// //         {label}
// //       </label>
      
// //       <div className="rounded-lg border border-gray-200 overflow-hidden relative">
// //         {!hasValidCoords && selectedLocation && (
// //           <div className="absolute top-2 right-2 z-[1000] bg-yellow-50 px-3 py-1 rounded-full shadow-md text-xs text-yellow-700 border border-yellow-200">
// //             ⚠️ Coordonnées invalides
// //           </div>
// //         )}
        
// //         <MapContainer
// //           center={center}
// //           zoom={zoom}
// //           style={{ height: 200, width: "100%" }}
// //           scrollWheelZoom={false}
// //           zoomControl={true}
// //         >
// //           <TileLayer
// //             attribution='&copy; OpenStreetMap contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />

// //           {/* Recentrer la carte quand la sélection change */}
// //           <MapRecenter center={center} zoom={zoom} />

// //           {/* Afficher le marqueur si les coordonnées sont valides */}
// //           {hasValidCoords && lat !== null && lng !== null && (
// //             <Marker position={[lat, lng]}>
// //               <Popup>
// //                 <div className="text-sm">
// //                   <div className="font-semibold text-gray-900">
// //                     {markerColor === "departure" ? "📍 Départ" : "🎯 Arrivée"}
// //                   </div>
// //                   <div className="text-gray-700 mt-1">{delegation?.name}</div>
// //                 </div>
// //               </Popup>
// //             </Marker>
// //           )}
// //         </MapContainer>
// //       </div>
      
// //       {/* Afficher le nom de la délégation sélectionnée */}
// //       {hasValidCoords && delegation && (
// //         <div className={`text-xs px-3 py-2 rounded-lg ${
// //           markerColor === "departure" 
// //             ? "bg-blue-50 text-blue-700 border border-blue-200" 
// //             : "bg-green-50 text-green-700 border border-green-200"
// //         }`}>
// //           <span className="font-semibold">
// //             {markerColor === "departure" ? "📍" : "🎯"} Sélectionné:
// //           </span>{" "}
// //           {delegation.name}
// //         </div>
// //       )}
      
// //       {/* Message si aucune sélection */}
// //       {!selectedLocation && (
// //         <div className="text-xs text-gray-500 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
// //           ℹ️ Sélectionnez un lieu pour voir sa position sur la carte
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // app/offer/SingleLocationMapProps.tsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
// import type { LatLngExpression } from "leaflet";
// import type { Delegation } from "./DelegationMapLeaflet";
// import L from "leaflet";

// // Composant pour recentrer la carte
// function MapRecenter({ center, zoom }: { center: LatLngExpression; zoom: number }) {
//   const map = useMap();
  
//   useEffect(() => {
//     map.setView(center, zoom);
//   }, [center, zoom, map]);
  
//   return null;
// }

// // Composant pour gérer les clics sur la carte
// function MapClickHandler({ 
//   onLocationSelect 
// }: { 
//   onLocationSelect: (lat: number, lng: number) => void 
// }) {
//   useMapEvents({
//     click: (e) => {
//       onLocationSelect(e.latlng.lat, e.latlng.lng);
//     },
//   });
//   return null;
// }

// interface SingleLocationMapProps {
//   delegations: Delegation[];
//   selectedLocation: string;
//   label: string;
//   markerColor?: "departure" | "arrival";
//   onPreciseLocationSelect?: (lat: number, lng: number) => void;
// }

// export default function SingleLocationMap({
//   delegations,
//   selectedLocation,
//   label,
//   markerColor = "departure",
//   onPreciseLocationSelect
// }: SingleLocationMapProps) {
//   // Trouver la délégation sélectionnée
//   const delegation = delegations.find((d) => d.name === selectedLocation);
  
//   const delegationLat = delegation ? parseFloat(delegation.latitude) : null;
//   const delegationLng = delegation ? parseFloat(delegation.longitude) : null;
  
//   // État pour la position précise (cliquée par l'utilisateur)
//   const [preciseLocation, setPreciseLocation] = useState<{lat: number, lng: number} | null>(null);
  
//   // Réinitialiser la position précise quand la délégation change
//   useEffect(() => {
//     setPreciseLocation(null);
//   }, [selectedLocation]);
  
//   const hasValidCoords = 
//     delegationLat !== null &&
//     delegationLng !== null &&
//     !Number.isNaN(delegationLat) &&
//     !Number.isNaN(delegationLng);

//   // Position du marqueur : utiliser la position précise si elle existe, sinon la position de la délégation
//   const markerLat = preciseLocation?.lat ?? delegationLat;
//   const markerLng = preciseLocation?.lng ?? delegationLng;

//   // Centre de la carte
//   const center: LatLngExpression = useMemo(() => {
//     if (hasValidCoords && delegationLat !== null && delegationLng !== null) {
//       return [delegationLat, delegationLng];
//     }
//     return [35.7, 10.0]; // Centre Tunisie par défaut
//   }, [hasValidCoords, delegationLat, delegationLng]);

//   // Niveau de zoom : plus proche pour permettre de voir les détails
//   const zoom = hasValidCoords ? 14 : 7;

//   // Gérer le clic sur la carte
//   const handleLocationSelect = (lat: number, lng: number) => {
//     setPreciseLocation({ lat, lng });
//     if (onPreciseLocationSelect) {
//       onPreciseLocationSelect(lat, lng);
//     }
//   };

//   // Réinitialiser la position précise
//   const handleReset = () => {
//     setPreciseLocation(null);
//     if (onPreciseLocationSelect && delegationLat !== null && delegationLng !== null) {
//       onPreciseLocationSelect(delegationLat, delegationLng);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-gray-700">
//         {label}
//       </label>
      
//       <div className="rounded-lg border border-gray-200 overflow-hidden relative">
//         {!hasValidCoords && selectedLocation && (
//           <div className="absolute top-2 right-2 z-[1000] bg-yellow-50 px-3 py-1 rounded-full shadow-md text-xs text-yellow-700 border border-yellow-200">
//             ⚠️ Coordonnées invalides
//           </div>
//         )}
        
//         {hasValidCoords && (
//           <div className="absolute top-2 left-2 z-[1000] bg-white px-3 py-1 rounded-lg shadow-md text-xs text-gray-700 border border-gray-200">
//             📍 Cliquez sur la carte pour affiner la position
//           </div>
//         )}
        
//         <MapContainer
//           center={center}
//           zoom={zoom}
//           style={{ height: 260, width: "100%" }}
//           scrollWheelZoom={true}
//           zoomControl={true}
//         >
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Recentrer la carte quand la sélection change */}
//           <MapRecenter center={center} zoom={zoom} />

//           {/* Gérer les clics sur la carte */}
//           {hasValidCoords && (
//             <MapClickHandler onLocationSelect={handleLocationSelect} />
//           )}

//           {/* Afficher le marqueur si les coordonnées sont valides */}
//           {hasValidCoords && markerLat !== null && markerLng !== null && (
//             <Marker position={[markerLat, markerLng]}>
//               <Popup>
//                 <div className="text-sm">
//                   <div className="font-semibold text-gray-900">
//                     {markerColor === "departure" ? "🏁 Départ" : "🎯 Arrivée"}
//                   </div>
//                   <div className="text-gray-700 mt-1">{delegation?.name}</div>
//                   {preciseLocation && (
//                     <div className="text-xs text-blue-600 mt-1">
//                       📍 Position affinée
//                     </div>
//                   )}
//                 </div>
//               </Popup>
//             </Marker>
//           )}
//         </MapContainer>
//       </div>
      
//       {/* Afficher le nom de la délégation sélectionnée */}
//       {hasValidCoords && delegation && (
//         <div className="space-y-2">
//           <div className={`text-xs px-3 py-2 rounded-lg ${
//             markerColor === "departure" 
//               ? "bg-blue-50 text-blue-700 border border-blue-200" 
//               : "bg-green-50 text-green-700 border border-green-200"
//           }`}>
//             <span className="font-semibold">
//               {markerColor === "departure" ? "🏁" : "🎯"} Sélectionné:
//             </span>{" "}
//             {delegation.name}
//             {preciseLocation && (
//               <span className="ml-2 text-xs">
//                 • Position affinée
//               </span>
//             )}
//           </div>
          
//           {preciseLocation && (
//             <button
//               type="button"
//               onClick={handleReset}
//               className="w-full text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition"
//             >
//               🔄 Réinitialiser au centre de {delegation.name}
//             </button>
//           )}
//         </div>
//       )}
      
//       {/* Message si aucune sélection */}
//       {!selectedLocation && (
//         <div className="text-xs text-gray-500 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
//           ℹ️ Sélectionnez un lieu pour voir sa position sur la carte
//         </div>
//       )}
//     </div>
//   );
// }
// app/offer/SingleLocationMapProps.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { Delegation } from "./DelegationMapLeaflet";

// Composant pour recentrer la carte
function MapRecenter({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

// Composant pour gérer les clics sur la carte
function MapClickHandler({ 
  onLocationSelect 
}: { 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface SingleLocationMapProps {
  delegations: Delegation[];
  selectedLocation: string;
  label: string;
  markerColor?: "departure" | "arrival";
  onPreciseLocationSelect?: (lat: number, lng: number) => void;
}

export default function SingleLocationMap({
  delegations,
  selectedLocation,
  label,
  markerColor = "departure",
  onPreciseLocationSelect
}: SingleLocationMapProps) {
  // Trouver la délégation sélectionnée
  const delegation = delegations.find((d) => d.name === selectedLocation);
  
  const delegationLat = delegation ? parseFloat(delegation.latitude) : null;
  const delegationLng = delegation ? parseFloat(delegation.longitude) : null;
  
  // État pour la position précise (cliquée par l'utilisateur)
  const [preciseLocation, setPreciseLocation] = useState<{lat: number, lng: number} | null>(null);
  
  // Réinitialiser la position précise quand la délégation change
  useEffect(() => {
    setPreciseLocation(null);
  }, [selectedLocation]);
  
  const hasValidCoords = 
    delegationLat !== null &&
    delegationLng !== null &&
    !Number.isNaN(delegationLat) &&
    !Number.isNaN(delegationLng);

  // Position du marqueur : utiliser la position précise si elle existe, sinon la position de la délégation
  const markerLat = preciseLocation?.lat ?? delegationLat;
  const markerLng = preciseLocation?.lng ?? delegationLng;

  // Centre de la carte
  const center: LatLngExpression = useMemo(() => {
    if (hasValidCoords && delegationLat !== null && delegationLng !== null) {
      return [delegationLat, delegationLng];
    }
    return [35.7, 10.0]; // Centre Tunisie par défaut
  }, [hasValidCoords, delegationLat, delegationLng]);

  // Niveau de zoom : plus proche pour permettre de voir les détails
  const zoom = hasValidCoords ? 14 : 7;

  // Gérer le clic sur la carte
  const handleLocationSelect = (lat: number, lng: number) => {
    setPreciseLocation({ lat, lng });
    if (onPreciseLocationSelect) {
      onPreciseLocationSelect(lat, lng);
    }
  };

  // Réinitialiser la position précise
  const handleReset = () => {
    setPreciseLocation(null);
    if (onPreciseLocationSelect && delegationLat !== null && delegationLng !== null) {
      onPreciseLocationSelect(delegationLat, delegationLng);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      
      <div className="rounded-lg border border-gray-200 overflow-hidden relative">
        {!hasValidCoords && selectedLocation && (
          <div className="absolute top-2 right-2 z-[1000] bg-yellow-50 px-3 py-1 rounded-full shadow-md text-xs text-yellow-700 border border-yellow-200">
            ⚠️ Coordonnées invalides
          </div>
        )}
        
        {hasValidCoords && (
          <div className="absolute top-2 left-2 z-[1000] bg-white px-3 py-1 rounded-lg shadow-md text-xs text-gray-700 border border-gray-200">
            📍 Cliquez sur la carte pour affiner la position
          </div>
        )}
        
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: 260, width: "100%" }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Recentrer la carte quand la sélection change */}
          <MapRecenter center={center} zoom={zoom} />

          {/* Gérer les clics sur la carte */}
          {hasValidCoords && (
            <MapClickHandler onLocationSelect={handleLocationSelect} />
          )}

          {/* Afficher le marqueur si les coordonnées sont valides */}
          {hasValidCoords && markerLat !== null && markerLng !== null && (
            <Marker position={[markerLat, markerLng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    {markerColor === "departure" ? "🚗 Départ" : "🎯 Arrivée"}
                  </div>
                  <div className="text-gray-700 mt-1">{delegation?.name}</div>
                  {preciseLocation && (
                    <div className="text-xs text-blue-600 mt-1">
                      📍 Position affinée
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      
      {/* Afficher le nom de la délégation sélectionnée */}
      {hasValidCoords && delegation && (
        <div className="space-y-2">
          <div className={`text-xs px-3 py-2 rounded-lg ${
            markerColor === "departure" 
              ? "bg-blue-50 text-blue-700 border border-blue-200" 
              : "bg-green-50 text-green-700 border border-green-200"
          }`}>
            <span className="font-semibold">
              {markerColor === "departure" ? "🚗" : "🎯"} Sélectionné:
            </span>{" "}
            {delegation.name}
            {preciseLocation && (
              <span className="ml-2 text-xs">
                • Position affinée
              </span>
            )}
          </div>
          
          {preciseLocation && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 transition"
            >
              🔄 Réinitialiser au centre de {delegation.name}
            </button>
          )}
        </div>
      )}
      
      {/* Message si aucune sélection */}
      {!selectedLocation && (
        <div className="text-xs text-gray-500 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          ℹ️ Sélectionnez un lieu pour voir sa position sur la carte
        </div>
      )}
    </div>
  );
}