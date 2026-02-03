"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userLocationIcon = new L.Icon({
  iconUrl: "/user-location-icon.png",
  iconSize: [32, 32],
});

export default function DelegationMapLeaflet() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.error("Erreur géolocalisation :", err)
      );
    } else {
      console.error("Géolocalisation non supportée par le navigateur");
    }
  }, []);

  return (
    <MapContainer
      center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [36.8, 10.1]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {currentLocation && (
        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={userLocationIcon}>
          <Popup>📍 Vous êtes ici</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
