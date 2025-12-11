// // // app/offer/RouteMapLeaflet.tsx
// // "use client";

// // import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// // import type { LatLngExpression } from "leaflet";
// // import { useEffect, useMemo, useState } from "react";
// // import type { Delegation } from "./DelegationMapLeaflet";
// // import { useMap } from "react-leaflet";
// // import L from "leaflet";

// // function FitBounds({ fromLat, fromLng, toLat, toLng }: { fromLat: number; fromLng: number; toLat: number; toLng: number }) {
// //   const map = useMap();

// //   useEffect(() => {
// //     const bounds = L.latLngBounds(
// //       [fromLat, fromLng],
// //       [toLat, toLng]
// //     );
// //     map.fitBounds(bounds, { padding: [40, 40] });
// //   }, [fromLat, fromLng, toLat, toLng, map]);

// //   return null;
// // }

// // // distance haversine en km
// // function toRad(deg: number) {
// //   return (deg * Math.PI) / 180;
// // }

// // function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
// //   const R = 6371;
// //   const dLat = toRad(b.lat - a.lat);
// //   const dLng = toRad(b.lng - a.lng);
// //   const lat1 = toRad(a.lat);
// //   const lat2 = toRad(b.lat);

// //   const sinDLat = Math.sin(dLat / 2);
// //   const sinDLng = Math.sin(dLng / 2);

// //   const h =
// //     sinDLat * sinDLat +
// //     Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;

// //   const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
// //   return R * c;
// // }

// // interface Props {
// //   delegations: Delegation[];
// //   departureName: string;
// //   arrivalName: string;
// // }

// // export default function RouteMapLeaflet({
// //   delegations,
// //   departureName,
// //   arrivalName,
// // }: Props) {
// //   const from = delegations.find((d) => d.name === departureName);
// //   const to = delegations.find((d) => d.name === arrivalName);

// //   const fromLat = from ? parseFloat(from.latitude) : null;
// //   const fromLng = from ? parseFloat(from.longitude) : null;
// //   const toLat = to ? parseFloat(to.latitude) : null;
// //   const toLng = to ? parseFloat(to.longitude) : null;

// //   const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
// //   const [routeDistance, setRouteDistance] = useState<number>(0);
// //   const [loadingRoute, setLoadingRoute] = useState(false);

// //   const hasBoth =
// //     fromLat !== null &&
// //     fromLng !== null &&
// //     !Number.isNaN(fromLat) &&
// //     !Number.isNaN(fromLng) &&
// //     toLat !== null &&
// //     toLng !== null &&
// //     !Number.isNaN(toLat) &&
// //     !Number.isNaN(toLng);

// //   const center: LatLngExpression = useMemo(() => {
// //     if (hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
// //       return [(fromLat + toLat) / 2, (fromLng + toLng) / 2];
// //     }
// //     return [35.7, 10.0]; // centre Tunisie
// //   }, [hasBoth, fromLat, fromLng, toLat, toLng]);

// //   // Récupérer le trajet réel depuis OSRM
// //   useEffect(() => {
// //     if (!hasBoth || fromLat === null || fromLng === null || toLat === null || toLng === null) {
// //       setRouteCoordinates([]);
// //       setRouteDistance(0);
// //       return;
// //     }

// //     const fetchRoute = async () => {
// //       setLoadingRoute(true);
// //       try {
// //         // API OSRM pour obtenir le trajet routier
// //         const response = await fetch(
// //           `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
// //         );
// //         const data = await response.json();

// //         if (data.code === "Ok" && data.routes && data.routes.length > 0) {
// //           const route = data.routes[0];
// //           const coords: [number, number][] = route.geometry.coordinates.map(
// //             (coord: number[]) => [coord[1], coord[0]] as [number, number]
// //           );
// //           setRouteCoordinates(coords);
// //           setRouteDistance(route.distance / 1000); // convertir en km
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération du trajet:", error);
// //         // En cas d'erreur, utiliser la ligne droite
// //         setRouteCoordinates([[fromLat, fromLng], [toLat, toLng]]);
// //         setRouteDistance(haversineKm({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng }));
// //       } finally {
// //         setLoadingRoute(false);
// //       }
// //     };

// //     fetchRoute();
// //   }, [hasBoth, fromLat, fromLng, toLat, toLng]);

// //   let distanceKm = routeDistance || 0;
// //   if (distanceKm === 0 && hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
// //     distanceKm = haversineKm(
// //       { lat: fromLat, lng: fromLng },
// //       { lat: toLat, lng: toLng }
// //     );
// //   }

// //   return (
// //     <div className="space-y-2">
// //       <div className="rounded-lg border border-gray-200 overflow-hidden relative">
// //         {loadingRoute && (
// //           <div className="absolute top-2 right-2 z-[1000] bg-white px-3 py-1 rounded-full shadow-md text-xs text-gray-600">
// //             Chargement du trajet...
// //           </div>
// //         )}
// //         <MapContainer
// //           center={center}
// //           zoom={hasBoth ? 8 : 7}
// //           style={{ height: 260, width: "100%" }}
// //           scrollWheelZoom={false}
// //         >
// //           <TileLayer
// //             attribution='&copy; OpenStreetMap contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />

// //           {fromLat !== null && fromLng !== null && !Number.isNaN(fromLat) && !Number.isNaN(fromLng) && (
// //             <Marker position={[fromLat, fromLng]}>
// //               <Popup>
// //                 <strong>Départ</strong>
// //                 <br />
// //                 {from?.name}
// //               </Popup>
// //             </Marker>
// //           )}

// //           {toLat !== null && toLng !== null && !Number.isNaN(toLat) && !Number.isNaN(toLng) && (
// //             <Marker position={[toLat, toLng]}>
// //               <Popup>
// //                 <strong>Arrivée</strong>
// //                 <br />
// //                 {to?.name}
// //               </Popup>
// //             </Marker>
// //           )}

// //           {/* Afficher le trajet routier réel */}
// //           {routeCoordinates.length > 0 && (
// //             <Polyline
// //               positions={routeCoordinates}
// //               color="#10b981"
// //               weight={5}
// //               opacity={0.8}
// //             />
// //           )}

// //           {hasBoth && (
// //             <FitBounds
// //               fromLat={fromLat as number}
// //               fromLng={fromLng as number}
// //               toLat={toLat as number}
// //               toLng={toLng as number}
// //             />
// //           )}
// //         </MapContainer>
// //       </div>

// //       {hasBoth && (
// //         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
// //           <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
// //             Distance {routeDistance > 0 ? "routière" : "estimée"} : {distanceKm.toFixed(1)} km
// //           </div>
// //           <div className="text-xs md:text-sm text-gray-600">
// //             <b>Prix recommandé: </b>[Entre 0.2 - 0.3] TND/Km dans la même ville | Au Forfait [entre 10 - 25] TND entre les villes.
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// // app/offer/RouteMapLeaflet.tsx
// "use client";

// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import type { LatLngExpression } from "leaflet";
// import { useEffect, useMemo, useState } from "react";
// import type { Delegation } from "./DelegationMapLeaflet";
// import { useMap } from "react-leaflet";
// import L from "leaflet";

// function FitBounds({ fromLat, fromLng, toLat, toLng }: { fromLat: number; fromLng: number; toLat: number; toLng: number }) {
//   const map = useMap();

//   useEffect(() => {
//     const bounds = L.latLngBounds(
//       [fromLat, fromLng],
//       [toLat, toLng]
//     );
//     map.fitBounds(bounds, { padding: [50, 50] });
//   }, [fromLat, fromLng, toLat, toLng, map]);

//   return null;
// }

// // distance haversine en km
// function toRad(deg: number) {
//   return (deg * Math.PI) / 180;
// }

// function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
//   const R = 6371;
//   const dLat = toRad(b.lat - a.lat);
//   const dLng = toRad(b.lng - a.lng);
//   const lat1 = toRad(a.lat);
//   const lat2 = toRad(b.lat);

//   const sinDLat = Math.sin(dLat / 2);
//   const sinDLng = Math.sin(dLng / 2);

//   const h =
//     sinDLat * sinDLat +
//     Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;

//   const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
//   return R * c;
// }

// interface Props {
//   delegations: Delegation[];
//   departureName: string;
//   arrivalName: string;
// }

// export default function RouteMapLeaflet({
//   delegations,
//   departureName,
//   arrivalName,
// }: Props) {
//   const from = delegations.find((d) => d.name === departureName);
//   const to = delegations.find((d) => d.name === arrivalName);

//   const fromLat = from ? parseFloat(from.latitude) : null;
//   const fromLng = from ? parseFloat(from.longitude) : null;
//   const toLat = to ? parseFloat(to.latitude) : null;
//   const toLng = to ? parseFloat(to.longitude) : null;

//   const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
//   const [routeDistance, setRouteDistance] = useState<number>(0);
//   const [loadingRoute, setLoadingRoute] = useState(false);

//   const hasBoth =
//     fromLat !== null &&
//     fromLng !== null &&
//     !Number.isNaN(fromLat) &&
//     !Number.isNaN(fromLng) &&
//     toLat !== null &&
//     toLng !== null &&
//     !Number.isNaN(toLat) &&
//     !Number.isNaN(toLng);

//   const center: LatLngExpression = useMemo(() => {
//     if (hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
//       return [(fromLat + toLat) / 2, (fromLng + toLng) / 2];
//     }
//     return [35.7, 10.0]; // centre Tunisie
//   }, [hasBoth, fromLat, fromLng, toLat, toLng]);

//   // Récupérer le trajet réel depuis OSRM
//   useEffect(() => {
//     if (!hasBoth || fromLat === null || fromLng === null || toLat === null || toLng === null) {
//       setRouteCoordinates([]);
//       setRouteDistance(0);
//       return;
//     }

//     const fetchRoute = async () => {
//       setLoadingRoute(true);
//       try {
//         // API OSRM pour obtenir le trajet routier
//         const response = await fetch(
//           `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
//         );
//         const data = await response.json();

//         if (data.code === "Ok" && data.routes && data.routes.length > 0) {
//           const route = data.routes[0];
//           const coords: [number, number][] = route.geometry.coordinates.map(
//             (coord: number[]) => [coord[1], coord[0]] as [number, number]
//           );
//           setRouteCoordinates(coords);
//           setRouteDistance(route.distance / 1000); // convertir en km
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération du trajet:", error);
//         // En cas d'erreur, utiliser la ligne droite
//         setRouteCoordinates([[fromLat, fromLng], [toLat, toLng]]);
//         setRouteDistance(haversineKm({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng }));
//       } finally {
//         setLoadingRoute(false);
//       }
//     };

//     fetchRoute();
//   }, [hasBoth, fromLat, fromLng, toLat, toLng]);

//   let distanceKm = routeDistance || 0;
//   if (distanceKm === 0 && hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
//     distanceKm = haversineKm(
//       { lat: fromLat, lng: fromLng },
//       { lat: toLat, lng: toLng }
//     );
//   }

//   return (
//     <div className="space-y-2">
//       <div className="rounded-lg border border-gray-200 overflow-hidden relative">
//         {loadingRoute && (
//           <div className="absolute top-2 right-2 z-[1000] bg-white px-3 py-1 rounded-full shadow-md text-xs text-gray-600">
//             Chargement du trajet...
//           </div>
//         )}
//         <MapContainer
//           center={center}
//           zoom={hasBoth ? 8 : 7}
//           style={{ height: 260, width: "100%" }}
//           scrollWheelZoom={true}
//         >
//           <TileLayer
//             attribution='&copy; OpenStreetMap contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {fromLat !== null && fromLng !== null && !Number.isNaN(fromLat) && !Number.isNaN(fromLng) && (
//             <Marker position={[fromLat, fromLng]}>
//               <Popup>
//                 <strong>Départ</strong>
//                 <br />
//                 {from?.name}
//               </Popup>
//             </Marker>
//           )}

//           {toLat !== null && toLng !== null && !Number.isNaN(toLat) && !Number.isNaN(toLng) && (
//             <Marker position={[toLat, toLng]}>
//               <Popup>
//                 <strong>Arrivée</strong>
//                 <br />
//                 {to?.name}
//               </Popup>
//             </Marker>
//           )}

//           {/* Afficher le trajet routier réel */}
//           {routeCoordinates.length > 0 && (
//             <Polyline
//               positions={routeCoordinates}
//               color="#10b981"
//               weight={5}
//               opacity={0.8}
//             />
//           )}

//           {hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null && (
//             <FitBounds
//               fromLat={fromLat}
//               fromLng={fromLng}
//               toLat={toLat}
//               toLng={toLng}
//             />
//           )}
//         </MapContainer>
//       </div>

//       {hasBoth && (
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-2">
//           <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
//             Distance {routeDistance > 0 ? "routière" : "estimée"} : {distanceKm.toFixed(1)} km
//           </div>
//           <div className="text-xs md:text-sm text-gray-600">
//             <b>Prix recommandé: </b>[Entre 0.2 - 0.3] TND/Km dans la même ville | Au Forfait [entre 10 - 25] TND entre les villes.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// app/offer/RouteMapLeaflet.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useEffect, useMemo, useState } from "react";
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
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [fromLat, fromLng, toLat, toLng, map]);

  return null;
}

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

// Fonction pour calculer le prix basé sur la distance
function calculatePrice(distanceKm: number): number {
  if (distanceKm === 0) return 0;
  
  // Calculer le nombre de tranches de 4 km
  const tranches = Math.ceil(distanceKm / 4);
  
  // Prix = 0.5 TND par tranche de 4 km, avec minimum de 1 TND
  const price = tranches * 0.5;
  
  return Math.max(1, price);
}

interface Props {
  delegations: Delegation[];
  departureName: string;
  arrivalName: string;
  onDistanceCalculated?: (distance: number, suggestedPrice: number) => void;
}

export default function RouteMapLeaflet({
  delegations,
  departureName,
  arrivalName,
  onDistanceCalculated,
}: Props) {
  const from = delegations.find((d) => d.name === departureName);
  const to = delegations.find((d) => d.name === arrivalName);

  const fromLat = from ? parseFloat(from.latitude) : null;
  const fromLng = from ? parseFloat(from.longitude) : null;
  const toLat = to ? parseFloat(to.latitude) : null;
  const toLng = to ? parseFloat(to.longitude) : null;

  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [routeDistance, setRouteDistance] = useState<number>(0);
  const [loadingRoute, setLoadingRoute] = useState(false);

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
    return [35.7, 10.0];
  }, [hasBoth, fromLat, fromLng, toLat, toLng]);

  useEffect(() => {
    if (!hasBoth || fromLat === null || fromLng === null || toLat === null || toLng === null) {
      setRouteCoordinates([]);
      setRouteDistance(0);
      return;
    }

    const fetchRoute = async () => {
      setLoadingRoute(true);
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
        );
        const data = await response.json();

        if (data.code === "Ok" && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coords: [number, number][] = route.geometry.coordinates.map(
            (coord: number[]) => [coord[1], coord[0]] as [number, number]
          );
          setRouteCoordinates(coords);
          setRouteDistance(route.distance / 1000);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du trajet:", error);
        setRouteCoordinates([[fromLat, fromLng], [toLat, toLng]]);
        setRouteDistance(haversineKm({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng }));
      } finally {
        setLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [hasBoth, fromLat, fromLng, toLat, toLng]);

  let distanceKm = routeDistance || 0;
  if (distanceKm === 0 && hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null) {
    distanceKm = haversineKm(
      { lat: fromLat, lng: fromLng },
      { lat: toLat, lng: toLng }
    );
  }

  // Calculer le prix suggéré
  const suggestedPrice = calculatePrice(distanceKm);

  // Notifier le parent du changement de distance et prix
  useEffect(() => {
    if (distanceKm > 0 && onDistanceCalculated) {
      onDistanceCalculated(distanceKm, suggestedPrice);
    }
  }, [distanceKm, suggestedPrice, onDistanceCalculated]);

  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-gray-200 overflow-hidden relative">
        {loadingRoute && (
          <div className="absolute top-2 right-2 z-[1000] bg-white px-3 py-1 rounded-full shadow-md text-xs text-gray-600">
            Chargement du trajet...
          </div>
        )}
        <MapContainer
          center={center}
          zoom={hasBoth ? 8 : 7}
          style={{ height: 260, width: "100%" }}
          scrollWheelZoom={true}
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

          {routeCoordinates.length > 0 && (
            <Polyline
              positions={routeCoordinates}
              color="#10b981"
              weight={5}
              opacity={0.8}
            />
          )}

          {hasBoth && fromLat !== null && fromLng !== null && toLat !== null && toLng !== null && (
            <FitBounds
              fromLat={fromLat}
              fromLng={fromLng}
              toLat={toLat}
              toLng={toLng}
            />
          )}
        </MapContainer>
      </div>

      {hasBoth && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              Distance {routeDistance > 0 ? "routière" : "estimée"} : <strong>{distanceKm.toFixed(1)} km</strong>
            </div>
            <div className="text-sm text-blue-800 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              Prix suggéré : <strong>{suggestedPrice.toFixed(1)} TND</strong>
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
}