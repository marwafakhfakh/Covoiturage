// app/offer/DelegationMapLeaflet.tsx
"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

// Type aligné sur /api/delegations/
export interface Delegation {
  id: number;
  name: string;
  latitude: string;   // ex: "36.8625000"
  longitude: string;  // ex: "10.1956000"
  city: number;       // id de la ville
}

interface DelegationMapLeafletProps {
  delegations: Delegation[];
  selectedValue: string;
  onSelect: (name: string) => void;
  label: string;
}

export default function DelegationMapLeaflet({
  delegations,
  selectedValue,
  onSelect,
  label,
}: DelegationMapLeafletProps) {
  // centre de la carte (Tunisie)
  const center: LatLngExpression = useMemo(
    () => [35.7, 10.0], // lat, lng
    []
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <MapContainer
          center={center}
          zoom={7}
          style={{ height: 280, width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {delegations.map((d) => {
            const lat = parseFloat(d.latitude);
            const lng = parseFloat(d.longitude);
            if (Number.isNaN(lat) || Number.isNaN(lng)) {
              console.warn("Invalid coordinates for delegation:", d.name);
              return null;
            }

            const isSelected = selectedValue === d.name;

            return (
              <Marker
                key={d.id}
                position={[lat, lng]}
                eventHandlers={{
                  click: () => onSelect(d.name),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold">{d.name}</div>
                    {isSelected && (
                      <div className="text-emerald-600 mt-1">
                        Délégation sélectionnée
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
