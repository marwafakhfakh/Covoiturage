// // app/rides/[id]/RouteMap.tsx ou components/rides/RouteMap.tsx
// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
// import type { LatLngExpression } from "leaflet";
// import L from "leaflet";
// import api from "../../api/api";

// interface Delegation {
//   id: number;
//   name: string;
//   latitude: string;
//   longitude: string;
//   city: number;
// }

// interface RouteMapProps {
//   from: string;
//   to: string;
//   title?: string;
//   className?: string;
// }

// function FitBounds({ fromLat, fromLng, toLat, toLng }: { 
//   fromLat: number; 
//   fromLng: number; 
//   toLat: number; 
//   toLng: number 
// }) {
//   const map = useMap();

//   useEffect(() => {
//     const bounds = L.latLngBounds([fromLat, fromLng], [toLat, toLng]);
//     map.fitBounds(bounds, { padding: [50, 50] });
//   }, [fromLat, fromLng, toLat, toLng, map]);

//   return null;
// }

// // Calcul de distance haversine
// function toRad(deg: number) {
//   return (deg * Math.PI) / 180;
// }

// function haversineKm(
//   a: { lat: number; lng: number }, 
//   b: { lat: number; lng: number }
// ) {
//   const R = 6371;
//   const dLat = toRad(b.lat - a.lat);
//   const dLng = toRad(b.lng - a.lng);
//   const lat1 = toRad(a.lat);
//   const lat2 = toRad(b.lat);

//   const sinDLat = Math.sin(dLat / 2);
//   const sinDLng = Math.sin(dLng / 2);

//   const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
//   const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
//   return R * c;
// }

// export default function RouteMap({
//   from,
//   to,
//   title = "Trajet & Itinéraire",
//   className = "",
// }: RouteMapProps) {
//   const [delegations, setDelegations] = useState<Delegation[]>([]);
//   const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
//   const [routeDistance, setRouteDistance] = useState<number>(0);
//   const [loadingRoute, setLoadingRoute] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // ✅ Créer les icônes personnalisées bleues
//   const createCustomIcon = (color: string) => {
//     return L.divIcon({
//       className: 'custom-marker',
//       html: `
//         <div style="position: relative;">
//           <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
//             <path d="M20 2c-6.627 0-12 5.373-12 12 0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" 
//                   fill="${color}" 
//                   stroke="white" 
//                   stroke-width="2"/>
//             <circle cx="20" cy="14" r="5" fill="white"/>
//           </svg>
//         </div>
//       `,
//       iconSize: [40, 40],
//       iconAnchor: [20, 40],
//       popupAnchor: [0, -40]
//     });
//   };

//   const departureIcon = useMemo(() => createCustomIcon('#3B82F6'), []); // Bleu
//   const arrivalIcon = useMemo(() => createCustomIcon('#10B981'), []); // Vert

//   // Récupérer les délégations
//   useEffect(() => {
//     const fetchDelegations = async () => {
//       try {
//         const res = await api.get("/api/delegations/");
//         const delegs = Array.isArray(res.data) ? res.data : res.data.results || [];
//         setDelegations(delegs);
//       } catch (error) {
//         console.error("Erreur lors du chargement des délégations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDelegations();
//   }, []);

//   // Trouver les délégations de départ et d'arrivée
//   const fromDelegation = delegations.find((d) => d.name === from);
//   const toDelegation = delegations.find((d) => d.name === to);

//   const fromLat = fromDelegation ? parseFloat(fromDelegation.latitude) : null;
//   const fromLng = fromDelegation ? parseFloat(fromDelegation.longitude) : null;
//   const toLat = toDelegation ? parseFloat(toDelegation.latitude) : null;
//   const toLng = toDelegation ? parseFloat(toDelegation.longitude) : null;

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
//     return [35.7, 10.0];
//   }, [hasBoth, fromLat, fromLng, toLat, toLng]);

//   // Récupérer le trajet routier depuis OSRM
//   useEffect(() => {
//     if (!hasBoth || fromLat === null || fromLng === null || toLat === null || toLng === null) {
//       setRouteCoordinates([]);
//       setRouteDistance(0);
//       return;
//     }

//     const fetchRoute = async () => {
//       setLoadingRoute(true);
//       try {
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
//           setRouteDistance(route.distance / 1000);
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération du trajet:", error);
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
//     distanceKm = haversineKm({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng });
//   }

//   if (loading) {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
//         <div className="bg-gray-100 rounded-xl p-8 border border-gray-300 h-96 flex items-center justify-center">
//           <div className="text-center text-gray-500">
//             Chargement de la carte...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!hasBoth) {
//     return (
//       <div className={`space-y-4 ${className}`}>
//         <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
//         <div className="bg-gray-100 rounded-xl p-8 border-2 border-dashed border-gray-300">
//           <div className="text-center">
//             <div className="mb-4">
//               <svg
//                 className="w-16 h-16 mx-auto text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700 mb-2">
//               Carte non disponible
//             </h3>
//             <p className="text-gray-500 mb-4 max-w-md mx-auto">
//               Impossible de trouver les coordonnées pour <strong>{from}</strong> et{" "}
//               <strong>{to}</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`space-y-4 ${className}`}>
//       <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      
//       <div className="rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg relative">
//         {loadingRoute && (
//           <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg text-sm text-gray-700 font-medium">
//             Chargement du trajet...
//           </div>
//         )}

//         <MapContainer
//           center={center}
//           zoom={hasBoth ? 8 : 7}
//           style={{ height: 450, width: "100%" }}
//           scrollWheelZoom={true}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* ✅ Marqueur de départ BLEU */}
//           {fromLat !== null && fromLng !== null && (
//             <Marker position={[fromLat, fromLng]} icon={departureIcon}>
//               <Popup>
//                 <div className="text-sm">
//                   <strong className="text-blue-600">📍 Départ</strong>
//                   <br />
//                   {from}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* ✅ Marqueur d'arrivée VERT */}
//           {toLat !== null && toLng !== null && (
//             <Marker position={[toLat, toLng]} icon={arrivalIcon}>
//               <Popup>
//                 <div className="text-sm">
//                   <strong className="text-green-600">🏁 Arrivée</strong>
//                   <br />
//                   {to}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Trajet routier */}
//           {routeCoordinates.length > 0 && (
//             <Polyline
//               positions={routeCoordinates}
//               color="#10b981"
//               weight={6}
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

//       {/* Informations sur le trajet */}
//       {hasBoth && (
//         <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
//                 <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-600 font-medium">Distance totale</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {distanceKm.toFixed(1)} km
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-600 font-medium">Durée estimée</div>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {Math.round((distanceKm / 80) * 60)} min
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-4 pt-4 border-t border-emerald-200">
//             <div className="flex items-start gap-2 text-sm text-gray-700">
//               <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <div>
//                 <strong>Itinéraire:</strong> {from} → {to}
//                 <br />
//                 <span className="text-gray-500">
//                   Distance {routeDistance > 0 ? "routière calculée" : "estimée en ligne droite"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// app/rides/[id]/RouteMap.tsx ou components/rides/RouteMap.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import api from "../../api/api";

interface Delegation {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  city: number;
}

interface RouteMapProps {
  from: string;
  to: string;
  // ✅ NOUVEAU : Coordonnées GPS directes (optionnelles)
  fromLat?: number | null;
  fromLng?: number | null;
  toLat?: number | null;
  toLng?: number | null;
  title?: string;
  className?: string;
}

function FitBounds({ fromLat, fromLng, toLat, toLng }: { 
  fromLat: number; 
  fromLng: number; 
  toLat: number; 
  toLng: number 
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([fromLat, fromLng], [toLat, toLng]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [fromLat, fromLng, toLat, toLng, map]);

  return null;
}

// Calcul de distance haversine
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function haversineKm(
  a: { lat: number; lng: number }, 
  b: { lat: number; lng: number }
) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export default function RouteMap({
  from,
  to,
  fromLat: propFromLat,
  fromLng: propFromLng,
  toLat: propToLat,
  toLng: propToLng,
  title = "Trajet & Itinéraire",
  className = "",
}: RouteMapProps) {
  const [delegations, setDelegations] = useState<Delegation[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [routeDistance, setRouteDistance] = useState<number>(0);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Créer les icônes personnalisées
  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="position: relative;">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2c-6.627 0-12 5.373-12 12 0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" 
                  fill="${color}" 
                  stroke="white" 
                  stroke-width="2"/>
            <circle cx="20" cy="14" r="5" fill="white"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  const departureIcon = useMemo(() => createCustomIcon('#3B82F6'), []);
  const arrivalIcon = useMemo(() => createCustomIcon('#10B981'), []);

  // ✅ NOUVEAU : Utiliser les coordonnées directes si disponibles
  const usingDirectCoords = 
    propFromLat != null && 
    propFromLng != null && 
    propToLat != null && 
    propToLng != null &&
    !Number.isNaN(propFromLat) &&
    !Number.isNaN(propFromLng) &&
    !Number.isNaN(propToLat) &&
    !Number.isNaN(propToLng);

  // Récupérer les délégations seulement si on n'utilise pas les coordonnées directes
  useEffect(() => {
    if (usingDirectCoords) {
      setLoading(false);
      return;
    }

    const fetchDelegations = async () => {
      try {
        const res = await api.get("/api/delegations/");
        const delegs = Array.isArray(res.data) ? res.data : res.data.results || [];
        setDelegations(delegs);
      } catch (error) {
        console.error("Erreur lors du chargement des délégations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelegations();
  }, [usingDirectCoords]);

  // ✅ Déterminer les coordonnées à utiliser
  let fromLat: number | null;
  let fromLng: number | null;
  let toLat: number | null;
  let toLng: number | null;

  if (usingDirectCoords) {
    // Utiliser les coordonnées directes
    fromLat = propFromLat!;
    fromLng = propFromLng!;
    toLat = propToLat!;
    toLng = propToLng!;
  } else {
    // Chercher dans les délégations
    const fromDelegation = delegations.find((d) => d.name === from);
    const toDelegation = delegations.find((d) => d.name === to);

    fromLat = fromDelegation ? parseFloat(fromDelegation.latitude) : null;
    fromLng = fromDelegation ? parseFloat(fromDelegation.longitude) : null;
    toLat = toDelegation ? parseFloat(toDelegation.latitude) : null;
    toLng = toDelegation ? parseFloat(toDelegation.longitude) : null;
  }

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

  // Récupérer le trajet routier depuis OSRM
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
    distanceKm = haversineKm({ lat: fromLat, lng: fromLng }, { lat: toLat, lng: toLng });
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="bg-gray-100 rounded-xl p-8 border border-gray-300 h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            Chargement de la carte...
          </div>
        </div>
      </div>
    );
  }

  if (!hasBoth) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="bg-gray-100 rounded-xl p-8 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Carte non disponible
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Impossible de trouver les coordonnées pour <strong>{from}</strong> et{" "}
              <strong>{to}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      
      <div className="rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg relative">
        {loadingRoute && (
          <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg text-sm text-gray-700 font-medium">
            Chargement du trajet...
          </div>
        )}

        <MapContainer
          center={center}
          zoom={hasBoth ? 8 : 7}
          style={{ height: 450, width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {fromLat !== null && fromLng !== null && (
            <Marker position={[fromLat, fromLng]} icon={departureIcon}>
              <Popup>
                <div className="text-sm">
                  <strong className="text-blue-600">📍 Départ</strong>
                  <br />
                  {from}
                  {usingDirectCoords && (
                    <div className="text-xs text-gray-500 mt-1">
                      {fromLat.toFixed(6)}, {fromLng.toFixed(6)}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {toLat !== null && toLng !== null && (
            <Marker position={[toLat, toLng]} icon={arrivalIcon}>
              <Popup>
                <div className="text-sm">
                  <strong className="text-green-600">🏁 Arrivée</strong>
                  <br />
                  {to}
                  {usingDirectCoords && (
                    <div className="text-xs text-gray-500 mt-1">
                      {toLat.toFixed(6)}, {toLng.toFixed(6)}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {routeCoordinates.length > 0 && (
            <Polyline
              positions={routeCoordinates}
              color="#10b981"
              weight={6}
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
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">Distance totale</div>
                <div className="text-2xl font-bold text-gray-900">
                  {distanceKm.toFixed(1)} km
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">Durée estimée</div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((distanceKm / 80) * 60)} min
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-200">
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong>Itinéraire:</strong> {from} → {to}
                <br />
                <span className="text-gray-500">
                  {usingDirectCoords 
                    ? "Coordonnées GPS précises utilisées" 
                    : routeDistance > 0 
                      ? "Distance routière calculée" 
                      : "Distance estimée en ligne droite"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}