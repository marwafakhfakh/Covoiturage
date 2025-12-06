// app/offer/components/DelegationMap.tsx (ou components/offer/DelegationMap.tsx)

import React, { useState } from 'react';

// Définir le type pour les coordonnées
type DelegationCoords = {
  x: number;
  y: number;
  color: string;
};

// Coordonnées pour vos 4 délégations
const delegationCoordinates: Record<string, DelegationCoords> = {
  'Tunis': { x: 52, y: 20, color: '#3b82f6' },
  'Sousse': { x: 55, y: 40, color: '#10b981' },
  'Mahdia': { x: 60, y: 48, color: '#f59e0b' },
  'Sfax': { x: 55, y: 58, color: '#ef4444' }
};

interface DelegationMapProps {
  selectedValue: string;
  onSelect: (delegation: string) => void;
  label: string;
  delegations: Array<{ id: number; name: string }>;
}

const DelegationMap: React.FC<DelegationMapProps> = ({ 
  selectedValue, 
  onSelect, 
  label,
  delegations 
}) => {
  const [hoveredDelegation, setHoveredDelegation] = useState('');

  // Debug: Afficher les délégations reçues
  console.log('Delegations in DelegationMap:', delegations);

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
          style={{ minHeight: '250px', maxHeight: '300px' }}
        >
          {/* Contour simplifié de la Tunisie */}
          <path
            d="M 48,10 L 58,12 L 62,18 L 65,28 L 68,38 L 68,48 L 65,58 L 60,68 L 52,72 L 45,68 L 38,60 L 35,50 L 38,38 L 42,25 L 46,15 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="0.8"
            opacity="0.4"
          />

          {/* Ligne de connexion si hover */}
          {selectedValue && hoveredDelegation && selectedValue !== hoveredDelegation && 
           delegationCoordinates[selectedValue] && delegationCoordinates[hoveredDelegation] && (
            <line
              x1={delegationCoordinates[selectedValue].x}
              y1={delegationCoordinates[selectedValue].y}
              x2={delegationCoordinates[hoveredDelegation].x}
              y2={delegationCoordinates[hoveredDelegation].y}
              stroke="#8b5cf6"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.6"
            />
          )}

          {/* Points pour chaque délégation */}
          {delegations.map((delegation) => {
            const coords = delegationCoordinates[delegation.name];
            
            // Si la délégation n'a pas de coordonnées, ne pas l'afficher sur la carte
            if (!coords) {
              console.warn(`No coordinates for delegation: ${delegation.name}`);
              return null;
            }

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
                    stroke={coords.color}
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
                  fill={isSelected ? coords.color : isHovered ? coords.color : '#64748b'}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer transition-all duration-200"
                  style={{ 
                    filter: isSelected || isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
                  }}
                  onClick={() => onSelect(delegation.name)}
                  onMouseEnter={() => setHoveredDelegation(delegation.name)}
                  onMouseLeave={() => setHoveredDelegation('')}
                />

                {/* Label */}
                <text
                  x={coords.x}
                  y={coords.y - 8}
                  textAnchor="middle"
                  className="pointer-events-none"
                  fill={isSelected ? coords.color : '#1e293b'}
                  style={{ 
                    fontSize: isSelected || isHovered ? '5px' : '4px',
                    fontWeight: isSelected ? 'bold' : 'normal'
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

      {/* Debug info - à retirer en production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 mt-2">
          Délégations disponibles: {delegations.map(d => d.name).join(', ')}
        </div>
      )}
    </div>
  );
};

export default DelegationMap;