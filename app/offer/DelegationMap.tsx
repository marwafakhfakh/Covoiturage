// app/offer/components/DelegationMap.tsx

"use client";

import React, { useState } from "react";

// Type pour une délégation venant de l'API
export interface Delegation {
  id: number;
  name: string;
  latitude: string;   // "36.8625000"
  longitude: string;  // "10.1956000"
}

// Projection simple lat/lng -> coordonnées [0,100] x [0,100] du SVG
type Point = { x: number; y: number };

function project(lat: number, lng: number): Point {
  // bornes approximatives de la Tunisie (à ajuster si besoin)
  const minLat = 30;
  const maxLat = 38;
  const minLng = 7;
  const maxLng = 12;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;

  return { x, y };
}

interface DelegationMapProps {
  selectedValue: string;
  onSelect: (delegation: string) => void;
  label: string;
  delegations: Delegation[];
}

const DelegationMap: React.FC<DelegationMapProps> = ({
  selectedValue,
  onSelect,
  label,
  delegations,
}) => {
  const [hoveredDelegation, setHoveredDelegation] = useState("");

  console.log("Delegations in DelegationMap:", delegations);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* Carte SVG interactive */}
      <div className="relative bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg p-4 border border-gray-200">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-auto"
          style={{ minHeight: "250px", maxHeight: "300px" }}
        >
          {/* Contour simplifié de la Tunisie */}
          <path
            d="M 48,10 L 58,12 L 62,18 L 65,28 L 68,38 L 68,48 L 65,58 L 60,68 L 52,72 L 45,68 L 38,60 L 35,50 L 38,38 L 42,25 L 46,15 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="0.8"
            opacity="0.4"
          />

          {/* Lignes de connexion si hover (optionnel, simple) */}
          {selectedValue &&
            hoveredDelegation &&
            selectedValue !== hoveredDelegation && (() => {
              const from = delegations.find((d) => d.name === selectedValue);
              const to = delegations.find((d) => d.name === hoveredDelegation);

              if (!from || !to) return null;

              const fromLat = parseFloat(from.latitude);
              const fromLng = parseFloat(from.longitude);
              const toLat = parseFloat(to.latitude);
              const toLng = parseFloat(to.longitude);

              if (
                Number.isNaN(fromLat) ||
                Number.isNaN(fromLng) ||
                Number.isNaN(toLat) ||
                Number.isNaN(toLng)
              ) {
                return null;
              }

              const p1 = project(fromLat, fromLng);
              const p2 = project(toLat, toLng);

              return (
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="#8b5cf6"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  opacity="0.6"
                />
              );
            })()}

          {/* Points pour chaque délégation */}
          {delegations.map((delegation) => {
            const lat = parseFloat(delegation.latitude);
            const lng = parseFloat(delegation.longitude);

            if (Number.isNaN(lat) || Number.isNaN(lng)) {
              console.warn(
                `Invalid coordinates for delegation: ${delegation.name}`
              );
              return null;
            }

            const coords = project(lat, lng);

            const isSelected = selectedValue === delegation.name;
            const isHovered = hoveredDelegation === delegation.name;
            const size = isSelected ? 6 : isHovered ? 5 : 4;

            return (
              <g key={delegation.id}>
                {/* Cercle de sélection/hover avec animation */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={size + 2}
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="0.5"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      from={String(size + 2)}
                      to={String(size + 4)}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Point principal */}
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={size}
                  fill={isSelected || isHovered ? "#0f766e" : "#64748b"}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    filter:
                      isSelected || isHovered
                        ? "drop-shadow(0 0 8px rgba(0,0,0,0.3))"
                        : "none",
                  }}
                  onClick={() => onSelect(delegation.name)}
                  onMouseEnter={() => setHoveredDelegation(delegation.name)}
                  onMouseLeave={() => setHoveredDelegation("")}
                />

                {/* Label */}
                <text
                  x={coords.x}
                  y={coords.y - 8}
                  textAnchor="middle"
                  className="pointer-events-none"
                  fill={isSelected ? "#0f766e" : "#1e293b"}
                  style={{
                    fontSize: isSelected || isHovered ? "5px" : "4px",
                    fontWeight: isSelected ? "bold" : "normal",
                  }}
                >
                  {delegation.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Légende */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs border border-gray-200 shadow-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <span>📍</span>
            <span className="font-medium">Cliquez sur une ville</span>
          </div>
        </div>
      </div>

      {/* Select classique */}
      <select
        value={selectedValue}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
        required
      >
        <option value="">Sélectionner</option>
        {delegations.map((d) => (
          <option key={d.id} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-500 mt-2" />
      )}
    </div>
  );
};

export default DelegationMap;

// // app/offer/components/DelegationMap.tsx (ou components/offer/DelegationMap.tsx)

// import React, { useState } from 'react';

// // Définir le type pour les coordonnées
// type DelegationCoords = {
//   x: number;
//   y: number;
//   color: string;
// };

// // Coordonnées pour vos 4 délégations
// const delegationCoordinates: Record<string, DelegationCoords> = {
//   'Tunis': { x: 52, y: 20, color: '#3b82f6' },
//   'Sousse': { x: 55, y: 40, color: '#10b981' },
//   'Mahdia': { x: 60, y: 48, color: '#f59e0b' },
//   'Sfax': { x: 55, y: 58, color: '#ef4444' }
// };
// export function estimateDistanceKm(from: string, to: string): number {
//   const a = delegationCoordinates[from];
//   const b = delegationCoordinates[to];
//   if (!a || !b) return 0;

//   const dx = a.x - b.x;
//   const dy = a.y - b.y;
//   const distPixels = Math.sqrt(dx * dx + dy * dy);
//   const kmPerPixel = 10; // à ajuster selon ton échelle
//   return distPixels * kmPerPixel;
// }
// interface DelegationMapProps {
//   selectedValue: string;
//   onSelect: (delegation: string) => void;
//   label: string;
//   delegations: Array<{ id: number; name: string }>;
// }

// const DelegationMap: React.FC<DelegationMapProps> = ({ 
//   selectedValue, 
//   onSelect, 
//   label,
//   delegations 
// }) => {
//   const [hoveredDelegation, setHoveredDelegation] = useState('');

//   // Debug: Afficher les délégations reçues
//   console.log('Delegations in DelegationMap:', delegations);

//   return (
//     <div className="space-y-3">
//       <label className="block text-sm font-semibold text-gray-700">
//         {label}
//       </label>

//       {/* Carte SVG interactive */}
//       <div className="relative bg-gradient-to-br from-blue-50 to-sky-100 rounded-lg p-4 border border-gray-200">
//         <svg 
//           viewBox="0 0 100 100" 
//           className="w-full h-auto"
//           style={{ minHeight: '250px', maxHeight: '300px' }}
//         >
//           {/* Contour simplifié de la Tunisie */}
//           <path
//             d="M 48,10 L 58,12 L 62,18 L 65,28 L 68,38 L 68,48 L 65,58 L 60,68 L 52,72 L 45,68 L 38,60 L 35,50 L 38,38 L 42,25 L 46,15 Z"
//             fill="#e0f2fe"
//             stroke="#0284c7"
//             strokeWidth="0.8"
//             opacity="0.4"
//           />

//           {/* Ligne de connexion si hover */}
//           {selectedValue && hoveredDelegation && selectedValue !== hoveredDelegation && 
//            delegationCoordinates[selectedValue] && delegationCoordinates[hoveredDelegation] && (
//             <line
//               x1={delegationCoordinates[selectedValue].x}
//               y1={delegationCoordinates[selectedValue].y}
//               x2={delegationCoordinates[hoveredDelegation].x}
//               y2={delegationCoordinates[hoveredDelegation].y}
//               stroke="#8b5cf6"
//               strokeWidth="0.5"
//               strokeDasharray="2,2"
//               opacity="0.6"
//             />
//           )}

//           {/* Points pour chaque délégation */}
//           {delegations.map((delegation) => {
//             const coords = delegationCoordinates[delegation.name];
            
//             // Si la délégation n'a pas de coordonnées, ne pas l'afficher sur la carte
//             if (!coords) {
//               console.warn(`No coordinates for delegation: ${delegation.name}`);
//               return null;
//             }

//             const isSelected = selectedValue === delegation.name;
//             const isHovered = hoveredDelegation === delegation.name;
//             const size = isSelected ? 6 : isHovered ? 5 : 4;

//             return (
//               <g key={delegation.id}>
//                 {/* Cercle de sélection/hover avec animation */}
//                 {(isSelected || isHovered) && (
//                   <circle
//                     cx={coords.x}
//                     cy={coords.y}
//                     r={size + 2}
//                     fill="none"
//                     stroke={coords.color}
//                     strokeWidth="0.5"
//                     opacity="0.3"
//                   >
//                     <animate
//                       attributeName="r"
//                       from={String(size + 2)}
//                       to={String(size + 4)}
//                       dur="1.5s"
//                       repeatCount="indefinite"
//                     />
//                   </circle>
//                 )}

//                 {/* Point principal */}
//                 <circle
//                   cx={coords.x}
//                   cy={coords.y}
//                   r={size}
//                   fill={isSelected ? coords.color : isHovered ? coords.color : '#64748b'}
//                   stroke="white"
//                   strokeWidth="1"
//                   className="cursor-pointer transition-all duration-200"
//                   style={{ 
//                     filter: isSelected || isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
//                   }}
//                   onClick={() => onSelect(delegation.name)}
//                   onMouseEnter={() => setHoveredDelegation(delegation.name)}
//                   onMouseLeave={() => setHoveredDelegation('')}
//                 />

//                 {/* Label */}
//                 <text
//                   x={coords.x}
//                   y={coords.y - 8}
//                   textAnchor="middle"
//                   className="pointer-events-none"
//                   fill={isSelected ? coords.color : '#1e293b'}
//                   style={{ 
//                     fontSize: isSelected || isHovered ? '5px' : '4px',
//                     fontWeight: isSelected ? 'bold' : 'normal'
//                   }}
//                 >
//                   {delegation.name}
//                 </text>
//               </g>
//             );
//           })}
//         </svg>

//         {/* Légende */}
//         <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs border border-gray-200 shadow-sm">
//           <div className="flex items-center gap-1 text-gray-600">
//             <span>📍</span>
//             <span className="font-medium">Cliquez sur une ville</span>
//           </div>
//         </div>
//       </div>

//       {/* Select classique */}
//       <select
//         value={selectedValue}
//         onChange={(e) => onSelect(e.target.value)}
//         className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition bg-white"
//         required
//       >
//         <option value="">Sélectionner</option>
//         {delegations.map((d) => (
//           <option key={d.id} value={d.name}>
//             {d.name}
//           </option>
//         ))}
//       </select>

//       {/* Debug info - à retirer en production */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="text-xs text-gray-500 mt-2">
//         </div>
//       )}
//     </div>
//   );
// };

// export default DelegationMap;