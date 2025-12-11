// // "use client";

// // import { useState } from "react";

// // interface SearchFormData {
// //   from: string;   // départ : ville / délégation
// //   to: string;     // arrivée : ville / délégation
// //   date: string;
// //   seats: string;
// // }

// // interface SearchFormProps {
// //   onSearch?: (formData: SearchFormData) => void;
// //   initialData?: Partial<SearchFormData>;
// //   title?: string;
// //   className?: string;
// // }

// // export default function SearchForm({
  
// //   onSearch,
// //   initialData = {},
// //   title = "Trouvez votre trajet idéal",
// //   className = "",
// // }: SearchFormProps) {
// //   const [searchForm, setSearchForm] = useState<SearchFormData>({
// //     from: initialData.from ||  "",
// //     to: initialData.to || "",
// //     date: initialData.date || "",
// //     seats: initialData.seats || "1",
// //   });

// //   const handleSearchChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setSearchForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSearch = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (onSearch) {
// //       onSearch(searchForm);
// //     } else {
// //       const params = new URLSearchParams();
// //       Object.entries(searchForm).forEach(([key, value]) => {
// //         if (value) params.append(key, value);
// //       });
// //       window.location.href = `/rides?${params.toString()}`;
// //     }
// //   };

// //   return (
// //     <section className={`py-16 bg-gray-50 ${className}`}>
// //       <div className="container mx-auto max-w-7xl px-4">
// //         <h2 className="text-3xl font-bold text-center mb-8 text-black">
// //           {title}
// //         </h2>

// //         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
// //           <form onSubmit={handleSearch} className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //               {/* From (délégation / ville de départ) */}
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-black">
// //                 De
// //                 </label>
// //                 <input
// //                   name="from"
// //                   value={searchForm.from}
// //                   onChange={handleSearchChange}
// //                   placeholder="Ex: Sfax, Sidi Mansour"
// //                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
// //                   required
// //                 />
// //               </div>

// //               {/* To (délégation / ville d’arrivée) */}
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-black">
// //                 Vers
// //                 </label>
// //                 <input
// //                   name="to"
// //                   value={searchForm.to}
// //                   onChange={handleSearchChange}
// //                   placeholder="Ex: Tunis, La Marsa"
// //                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
// //                   required
// //                 />
// //               </div>

// //               {/* Seats */}
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-black">
// //                 Nombre de places
// //                 </label>
// //                 <input
// //                   name="seats"
// //                   type="number"
// //                   min="1"
// //                   value={searchForm.seats || ""}
// //                   onChange={handleSearchChange}
// //                   placeholder="Seats"
// //                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
// //                 />
// //               </div>

// //               {/* Date */}
// //               <div className="space-y-2">
// //                 <label className="block text-sm font-semibold text-black">
// //                   Date
// //                 </label>
// //                 <input
// //                   name="date"
// //                   type="date"
// //                   value={searchForm.date}
// //                   onChange={handleSearchChange}
// //                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
// //                   required
// //                 />
// //               </div>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition cursor-pointer"
// //             >
// //               Rechercher des trajets
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import api from "../../api/api";

// interface SearchFormData {
//   from: string;
//   to: string;
//   date: string;
//   seats: string;
// }

// interface SearchFormProps {
//   onSearch?: (formData: SearchFormData) => void;
//   initialData?: Partial<SearchFormData>;
//   title?: string;
//   className?: string;
// }

// interface City {
//   id: number;
//   name: string;
//   short_name: string;
// }

// interface Delegation {
//   id: number;
//   name: string;
//   city: number;
// }

// interface LocationOption {
//   value: string;
//   label: string;
//   type: 'city' | 'delegation';
//   cityName?: string;
// }

// export default function SearchForm({
//   onSearch,
//   initialData = {},
//   title = "Trouvez votre trajet idéal",
//   className = "",
// }: SearchFormProps) {
//   const [searchForm, setSearchForm] = useState<SearchFormData>({
//     from: initialData.from || "",
//     to: initialData.to || "",
//     date: initialData.date || "",
//     seats: initialData.seats || "1",
//   });

//   const [cities, setCities] = useState<City[]>([]);
//   const [delegations, setDelegations] = useState<Delegation[]>([]);
//   const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
//   const [showFromSuggestions, setShowFromSuggestions] = useState(false);
//   const [showToSuggestions, setShowToSuggestions] = useState(false);
//   const [filteredFromOptions, setFilteredFromOptions] = useState<LocationOption[]>([]);
//   const [filteredToOptions, setFilteredToOptions] = useState<LocationOption[]>([]);

//   // Charger les villes et délégations au montage
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const [citiesRes, delegationsRes] = await Promise.all([
//           api.get("/api/cities/"),
//           api.get("/api/delegations/"),
//         ]);

//         const citiesData = Array.isArray(citiesRes.data) 
//           ? citiesRes.data 
//           : citiesRes.data.results || [];
        
//         const delegationsData = Array.isArray(delegationsRes.data)
//           ? delegationsRes.data
//           : delegationsRes.data.results || [];

//         setCities(citiesData);
//         setDelegations(delegationsData);

//         // Créer les options de localisation
//         const options: LocationOption[] = [];

//         // Ajouter les villes
//         citiesData.forEach((city: City) => {
//           options.push({
//             value: city.name,
//             label: `${city.name} (Ville)`,
//             type: 'city',
//           });
//         });

//         // Ajouter les délégations
//         delegationsData.forEach((delegation: Delegation) => {
//           const city = citiesData.find((c: City) => c.id === delegation.city);
//           options.push({
//             value: delegation.name,
//             label: `${delegation.name}${city ? ` - ${city.name}` : ''}`,
//             type: 'delegation',
//             cityName: city?.name,
//           });
//         });

//         setLocationOptions(options);
//       } catch (error) {
//         console.error("Erreur lors du chargement des localisations:", error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   const handleSearchChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setSearchForm((prev) => ({ ...prev, [name]: value }));

//     // Filtrer les suggestions pour "from"
//     if (name === "from") {
//       const filtered = locationOptions.filter((option) =>
//         option.value.toLowerCase().includes(value.toLowerCase()) ||
//         option.cityName?.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredFromOptions(filtered);
//       setShowFromSuggestions(value.length > 0);
//     }

//     // Filtrer les suggestions pour "to"
//     if (name === "to") {
//       const filtered = locationOptions.filter((option) =>
//         option.value.toLowerCase().includes(value.toLowerCase()) ||
//         option.cityName?.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredToOptions(filtered);
//       setShowToSuggestions(value.length > 0);
//     }
//   };

//   const handleSelectLocation = (field: 'from' | 'to', value: string) => {
//     setSearchForm((prev) => ({ ...prev, [field]: value }));
//     if (field === 'from') {
//       setShowFromSuggestions(false);
//     } else {
//       setShowToSuggestions(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (onSearch) {
//       onSearch(searchForm);
//     } else {
//       const params = new URLSearchParams();
//       Object.entries(searchForm).forEach(([key, value]) => {
//         if (value) params.append(key, value);
//       });
//       window.location.href = `/rides?${params.toString()}`;
//     }
//   };

//   return (
//     <section className={`py-16 bg-gray-50 ${className}`}>
//       <div className="container mx-auto max-w-7xl px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-black">
//           {title}
//         </h2>

//         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
//           <form onSubmit={handleSearch} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* From (délégation / ville de départ) */}
//               <div className="space-y-2 relative">
//                 <label className="block text-sm font-semibold text-black">
//                   De
//                 </label>
//                 <input
//                   name="from"
//                   value={searchForm.from}
//                   onChange={handleSearchChange}
//                   onFocus={() => {
//                     if (searchForm.from) {
//                       const filtered = locationOptions.filter((option) =>
//                         option.value.toLowerCase().includes(searchForm.from.toLowerCase())
//                       );
//                       setFilteredFromOptions(filtered);
//                       setShowFromSuggestions(true);
//                     }
//                   }}
//                   onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
//                   placeholder="Ex: Sousse, Tunis..."
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
//                   required
//                   autoComplete="off"
//                 />
//                 {showFromSuggestions && filteredFromOptions.length > 0 && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {filteredFromOptions.slice(0, 10).map((option, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSelectLocation('from', option.value)}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       >
//                         <div className="font-medium text-gray-900">{option.value}</div>
//                         {option.type === 'delegation' && option.cityName && (
//                           <div className="text-xs text-gray-500">{option.cityName}</div>
//                         )}
//                         {option.type === 'city' && (
//                           <div className="text-xs text-blue-600">Ville</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* To (délégation / ville d'arrivée) */}
//               <div className="space-y-2 relative">
//                 <label className="block text-sm font-semibold text-black">
//                   Vers
//                 </label>
//                 <input
//                   name="to"
//                   value={searchForm.to}
//                   onChange={handleSearchChange}
//                   onFocus={() => {
//                     if (searchForm.to) {
//                       const filtered = locationOptions.filter((option) =>
//                         option.value.toLowerCase().includes(searchForm.to.toLowerCase())
//                       );
//                       setFilteredToOptions(filtered);
//                       setShowToSuggestions(true);
//                     }
//                   }}
//                   onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
//                   placeholder="Ex: Sfax, Monastir..."
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
//                   required
//                   autoComplete="off"
//                 />
//                 {showToSuggestions && filteredToOptions.length > 0 && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {filteredToOptions.slice(0, 10).map((option, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleSelectLocation('to', option.value)}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//                       >
//                         <div className="font-medium text-gray-900">{option.value}</div>
//                         {option.type === 'delegation' && option.cityName && (
//                           <div className="text-xs text-gray-500">{option.cityName}</div>
//                         )}
//                         {option.type === 'city' && (
//                           <div className="text-xs text-blue-600">Ville</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Seats */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-black">
//                   Nombre de places
//                 </label>
//                 <input
//                   name="seats"
//                   type="number"
//                   min="1"
//                   value={searchForm.seats || ""}
//                   onChange={handleSearchChange}
//                   placeholder="1"
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
//                 />
//               </div>

//               {/* Date */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-black">
//                   Date
//                 </label>
//                 <input
//                   name="date"
//                   type="date"
//                   value={searchForm.date}
//                   onChange={handleSearchChange}
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition cursor-pointer"
//             >
//               Rechercher des trajets
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import api from "../../api/api";

interface SearchFormData {
  from: string;
  to: string;
  date: string;
  seats: string;
}

interface SearchFormProps {
  onSearch?: (formData: SearchFormData) => void;
  initialData?: Partial<SearchFormData>;
  title?: string;
  className?: string;
}

interface City {
  id: number;
  name: string;
  short_name: string;
}

interface Delegation {
  id: number;
  name: string;
  city: number;
}

interface LocationOption {
  value: string;
  label: string;
  type: 'city' | 'delegation';
  cityName?: string;
}

export default function SearchForm({
  onSearch,
  initialData = {},
  title = "Trouvez votre trajet idéal",
  className = "",
}: SearchFormProps) {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    from: initialData.from || "",
    to: initialData.to || "",
    date: initialData.date || "",
    seats: initialData.seats || "1",
  });

  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [filteredFromOptions, setFilteredFromOptions] = useState<LocationOption[]>([]);
  const [filteredToOptions, setFilteredToOptions] = useState<LocationOption[]>([]);

  // Charger les villes et délégations au montage
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const citiesRes = await api.get("/api/cities/");
        const delegationsRes = await api.get("/api/delegations/");

        const citiesData = Array.isArray(citiesRes.data) 
          ? citiesRes.data 
          : citiesRes.data.results || [];
        
        const delegationsData = Array.isArray(delegationsRes.data)
          ? delegationsRes.data
          : delegationsRes.data.results || [];

        // Créer les options de localisation
        const options: LocationOption[] = [];

        // Ajouter les villes
        citiesData.forEach((city: City) => {
          options.push({
            value: city.name,
            label: `${city.name} (Ville)`,
            type: 'city',
          });
        });

        // Ajouter les délégations
        delegationsData.forEach((delegation: Delegation) => {
          const city = citiesData.find((c: City) => c.id === delegation.city);
          options.push({
            value: delegation.name,
            label: `${delegation.name}${city ? ` - ${city.name}` : ''}`,
            type: 'delegation',
            cityName: city?.name,
          });
        });

        setLocationOptions(options);
      } catch (error) {
        console.error("Erreur lors du chargement des localisations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));

    // Filtrer les suggestions pour "from"
    if (name === "from") {
      const filtered = locationOptions.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase()) ||
        option.cityName?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFromOptions(filtered);
      setShowFromSuggestions(value.length > 0);
    }

    // Filtrer les suggestions pour "to"
    if (name === "to") {
      const filtered = locationOptions.filter((option) =>
        option.value.toLowerCase().includes(value.toLowerCase()) ||
        option.cityName?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredToOptions(filtered);
      setShowToSuggestions(value.length > 0);
    }
  };

  const handleSelectLocation = (field: 'from' | 'to', value: string) => {
    setSearchForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'from') {
      setShowFromSuggestions(false);
    } else {
      setShowToSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchForm);
    } else {
      const params = new URLSearchParams();
      Object.entries(searchForm).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      window.location.href = `/rides?${params.toString()}`;
    }
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {title}
        </h2>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* From (délégation / ville de départ) */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-black">
                  De
                </label>
                <input
                  name="from"
                  value={searchForm.from}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchForm.from) {
                      const filtered = locationOptions.filter((option) =>
                        option.value.toLowerCase().includes(searchForm.from.toLowerCase())
                      );
                      setFilteredFromOptions(filtered);
                      setShowFromSuggestions(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                  placeholder="Ex: Sousse, Tunis..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                  autoComplete="off"
                />
                {showFromSuggestions && filteredFromOptions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredFromOptions.slice(0, 10).map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectLocation('from', option.value)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        <div className="font-medium text-gray-900">{option.value}</div>
                        {option.type === 'delegation' && option.cityName && (
                          <div className="text-xs text-gray-500">{option.cityName}</div>
                        )}
                        {option.type === 'city' && (
                          <div className="text-xs text-blue-600">Ville</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* To (délégation / ville d'arrivée) */}
              <div className="space-y-2 relative">
                <label className="block text-sm font-semibold text-black">
                  Vers
                </label>
                <input
                  name="to"
                  value={searchForm.to}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchForm.to) {
                      const filtered = locationOptions.filter((option) =>
                        option.value.toLowerCase().includes(searchForm.to.toLowerCase())
                      );
                      setFilteredToOptions(filtered);
                      setShowToSuggestions(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                  placeholder="Ex: Sfax, Monastir..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                  autoComplete="off"
                />
                {showToSuggestions && filteredToOptions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredToOptions.slice(0, 10).map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectLocation('to', option.value)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        <div className="font-medium text-gray-900">{option.value}</div>
                        {option.type === 'delegation' && option.cityName && (
                          <div className="text-xs text-gray-500">{option.cityName}</div>
                        )}
                        {option.type === 'city' && (
                          <div className="text-xs text-blue-600">Ville</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seats */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  Nombre de places
                </label>
                <input
                  name="seats"
                  type="number"
                  min="1"
                  value={searchForm.seats || ""}
                  onChange={handleSearchChange}
                  placeholder="1"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={searchForm.date}
                  onChange={handleSearchChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Rechercher des trajets
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}