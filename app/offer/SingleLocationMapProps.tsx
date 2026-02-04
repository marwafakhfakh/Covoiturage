"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
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
  onUpdateFormField?: (value: string, lat: number, lng: number) => void;
};

// 🔹 Centre la carte dynamiquement
function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
}

// 🔹 Gestion clic sur la carte
function MapClickHandler({
  onSelect,
}: {
  onSelect?: (value: string, lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (!onSelect) return;

      const { lat, lng } = e.latlng;
      onSelect(`${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng);
    },
  });

  return null;
}

// 🔹 Bouton 📍 géolocalisation (optionnel)
function LocateMeButton({
  onUpdate,
}: {
  onUpdate: (value: string, lat: number, lng: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const locateControl = new (L.Control as any)({ position: "topright" });

    locateControl.onAdd = () => {
      const button = L.DomUtil.create(
        "button",
        "leaflet-bar leaflet-control"
      );
      button.innerHTML = "📍";
      button.style.width = "40px";
      button.style.height = "40px";
      button.style.fontSize = "20px";
      button.style.background = "white";
      button.style.cursor = "pointer";
      button.style.border = "none";

      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.stopPropagation(e);

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
    return () => locateControl.remove();
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
  onUpdateFormField,
}: SingleLocationMapProps) {
  const defaultCenter: LatLngExpression = [36.8065, 10.1815];
  const [center, setCenter] = useState<LatLngExpression>(defaultCenter);
  const [markerPosition, setMarkerPosition] =
    useState<LatLngExpression | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Synchronisation position
  useEffect(() => {
    setError(null);
  
    // ✅ PRIORITÉ À LA MAP
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
  
    // ✅ Si c'est "lat, lng" → PAS d'erreur
    if (selectedLocation.includes(",")) {
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

        {/* 📍 Bouton GPS */}
        {onUpdateFormField && <LocateMeButton onUpdate={onUpdateFormField} />}

        {/* 🖱️ Clic sur la carte */}
        {onUpdateFormField && (
          <MapClickHandler onSelect={onUpdateFormField} />
        )}

        {/* 📍 Marker draggable */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={!!onUpdateFormField}
            eventHandlers={{
              dragend: (e) => {
                if (!onUpdateFormField) return;

                const { lat, lng } = e.target.getLatLng();
                onUpdateFormField(
                  `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
                  lat,
                  lng
                );
              },
            }}
          >
            <Popup>
              {markerColor === "departure"
                ? "Lieu de départ"
                : "Lieu d'arrivée"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
