"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import type { Delegation } from "./DelegationMapLeaflet";

// 🔹 Props
export type SingleLocationMapProps = {
  delegations: Delegation[];
  selectedLocation: string | null;
  label: string;
  markerColor: "departure" | "arrival";
  preciseCoords?: { lat: number; lng: number } | null;
  onPreciseLocationSelect?: (lat: number, lng: number) => void;
  onUpdateFormField?: (value: string, lat: number, lng: number) => void; // seulement carte Départ
};

// 🔹 Composant interne pour centrer la carte
function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
}

// 🔹 Bouton pour géolocalisation (📍) — seulement si prop `onUpdateFormField` est fournie
type LocateMeButtonProps = {
  onUpdate: (value: string, lat: number, lng: number) => void;
};

function LocateMeButton({ onUpdate }: LocateMeButtonProps) {
  const map = useMap();

  useEffect(() => {
    const locateControl = new (L.Control as any)({ position: "topright" });

    locateControl.onAdd = () => {
      const button = L.DomUtil.create(
        "button",
        "leaflet-bar leaflet-control leaflet-control-custom"
      );
      button.innerHTML = "📍";
      button.title = "Ma position actuelle";
      button.style.width = "40px";
      button.style.height = "40px";
      button.style.fontSize = "20px";
      button.style.cursor = "pointer";
      button.style.backgroundColor = "white";
      button.style.border = "none";

      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.stopPropagation(e);

        if (!navigator.geolocation) {
          alert("Géolocalisation non supportée");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            map.setView([lat, lng], 15, { animate: true });
            onUpdate("Ma position actuelle", lat, lng);
          },
          () => alert("Impossible de récupérer votre position"),
          { enableHighAccuracy: true }
        );
      });

      return button;
    };

    locateControl.addTo(map);

    return () => {
      locateControl.remove();
    };
  }, [map, onUpdate]);

  return null;
}

// 🔹 Composant principal
export default function SingleLocationMap({
  delegations,
  selectedLocation,
  label,
  markerColor,
  preciseCoords,
  onPreciseLocationSelect,
  onUpdateFormField,
}: SingleLocationMapProps) {
  const defaultCenter: LatLngExpression = [36.8065, 10.1815];
  const [center, setCenter] = useState<LatLngExpression>(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    if (preciseCoords) {
      const pos: LatLngExpression = [preciseCoords.lat, preciseCoords.lng];
      setCenter(pos);
      setMarkerPosition(pos);
      return;
    }

    if (!selectedLocation) {
      setMarkerPosition(null);
      return;
    }

    const found = delegations.find(
      (d) => d.name.toLowerCase() === selectedLocation.toLowerCase()
    );

    if (!found) {
      setError("⚠️ Coordonnées invalides");
      setMarkerPosition(null);
      return;
    }

    const lat = parseFloat(found.latitude);
    const lng = parseFloat(found.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      setError("⚠️ Coordonnées invalides");
      setMarkerPosition(null);
      return;
    }

    const pos: LatLngExpression = [lat, lng];
    setCenter(pos);
    setMarkerPosition(pos);
  }, [selectedLocation, preciseCoords, delegations]);

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">{label}</h3>

      {error && (
        <div className="text-sm text-orange-600 bg-orange-50 border border-orange-200 rounded-md px-3 py-1 inline-block">
          ⚠️ {error}
        </div>
      )}

      <MapContainer
        center={center}
        zoom={8}
        style={{ height: "260px", width: "100%" }}
        className="rounded-xl overflow-hidden border"
      >
        <MapUpdater center={center} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Affiche le bouton 📍 seulement si prop onUpdateFormField existe */}
        {onUpdateFormField && <LocateMeButton onUpdate={onUpdateFormField} />}

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              {markerColor === "departure" ? "Lieu de départ" : "Lieu d'arrivée"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
