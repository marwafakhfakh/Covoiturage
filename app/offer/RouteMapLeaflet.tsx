// app/offer/RouteMapLeaflet.tsx
"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useMemo } from "react";
import type { Delegation } from "./DelegationMapLeaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";

function FitBounds({ fromLat, fromLng, toLat, toLng }: { fromLat: number; fromLng: number; toLat: number; toLng: number }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      [fromLat, fromLng],
      [toLat, toLng]
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [fromLat, fromLng, toLat, toLng, map]);

  return null;
}

// distance haversine en km
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

interface Props {
  delegations: Delegation[];
  departureName: string;
  arrivalName: string;
}

export default function RouteMapLeaflet({
  delegations,
  departureName,
  arrivalName,
}: Props) {
  const from = delegations.find((d) => d.name === departureName);
  const to = delegations.find((d) => d.name === arrivalName);

  const fromLat = from ? parseFloat(from.latitude) : null;
  const fromLng = from ? parseFloat(from.longitude) : null;
  const toLat = to ? parseFloat(to.latitude) : null;
  const toLng = to ? parseFloat(to.longitude) : null;

  const hasBoth =
    fromLat !== null &&
    fromLng !== null &&
    !Number.isNaN(fromLat) &&
    !Number.isNaN(fromLng) &&
    toLat !== null &&
    toLng !== null &&
    !Number.isNaN(toLat) &&
    !Number.isNaN(toLng);

  const center: LatLngExpression = useMemo(() => {
    if (hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
      return [(fromLat + toLat) / 2, (fromLng + toLng) / 2];
    }
    return [35.7, 10.0]; // centre Tunisie
  }, [hasBoth, fromLat, fromLng, toLat, toLng]);

  let distanceKm = 0;
  if (hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
    distanceKm = haversineKm(
      { lat: fromLat, lng: fromLng },
      { lat: toLat, lng: toLng }
    );
  }

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <MapContainer
          center={center}
          zoom={hasBoth ? 8 : 7}
          style={{ height: 260, width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {fromLat !== null && fromLng !== null && !Number.isNaN(fromLat) && !Number.isNaN(fromLng) && (
            <Marker position={[fromLat, fromLng]}>
              <Popup>
                <strong>Départ</strong>
                <br />
                {from?.name}
              </Popup>
            </Marker>
          )}

          {toLat !== null && toLng !== null && !Number.isNaN(toLat) && !Number.isNaN(toLng) && (
            <Marker position={[toLat, toLng]}>
              <Popup>
                <strong>Arrivée</strong>
                <br />
                {to?.name}
              </Popup>
            </Marker>
          )}
          {hasBoth && (
            <FitBounds
                fromLat={fromLat as number}
                fromLng={fromLng as number}
                toLat={toLat as number}
                toLng={toLng as number}
            />
            )}

          {/* {hasBoth && (
            <Polyline
              positions={[
                [fromLat as number, fromLng as number],
                [toLat as number, toLng as number],
              ]}
              color="#10b981"
              weight={4}
            />
          )} */}
        </MapContainer>
      </div>

      {hasBoth && (
        <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          Distance estimée : {distanceKm.toFixed(1)} km
        </div>
      )}
    </div>
  );
}
