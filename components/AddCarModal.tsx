// // "use client";

// // import { useState } from "react";
// // import api from "../api/api";
// // import Image from "next/image";

// // interface AddCarModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (carData: CarFormData) => void;
// // }

// // import { CAR_MODELS } from "./carModels";
// // import { CAR_TYPES } from "./carTypes";

// // interface CarFormData {
// //   model: string;
// //   type: string;
// //   color: string;
// //   serialNumber: string;
// //   seats: number;
// //   engineType: string;
// //   greyCard: string;
// //   year: number;
// //   image: File | null;
// // }

// // export default function AddCarModal({
// //   isOpen,
// //   onClose,
// //   onSubmit,
// // }: AddCarModalProps) {
// //   const [formData, setFormData] = useState<CarFormData>({
// //     model: "1", // default to 1 as string for FormData
// //     type: "",
// //     color: "",
// //     serialNumber: "",
// //     seats: 5,
// //     engineType: "Gasoline",
// //     greyCard: "",
// //     year: new Date().getFullYear(),
// //     image: null,
// //   });

// //   const [imagePreview, setImagePreview] = useState<string>("");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
  
// //     console.log("Car form data:", formData);
  
// //     const data = new FormData();
// //     data.append("model", formData.model);                 // ex: "1"
// //     data.append("type", formData.type);
// //     data.append("color", formData.color);
// //     data.append("serial_number", formData.serialNumber);
// //     data.append("nb_place", String(formData.seats));
// //     data.append("engine_type", formData.engineType);
// //     data.append("grey_card", formData.greyCard);
// //     data.append("year", String(formData.year));
// //     if (formData.image) data.append("image", formData.image);
  
// //     try {
// //       const res = await api.post("/api/cars/", data);     // ne PAS mettre headers ici
// //       console.log("Car created:", res.data);
// //       onSubmit(formData);
// //       handleClose();
// //     } catch (err: any) {
// //       console.error("Error creating car:", err.response?.data || err);
// //       alert(
// //         err.response?.data
// //           ? JSON.stringify(err.response.data)
// //           : "Error creating car. Please try again."
// //       );
// //     }
// //   };
  
// //   const handleClose = () => {
// //     setFormData({
// //       model: "1",
// //       type: "",
// //       color: "",
// //       serialNumber: "",
// //       seats: 5,
// //       engineType: "Gasoline",
// //       greyCard: "",
// //       year: new Date().getFullYear(),
// //       image: null,
// //     });
// //     setImagePreview("");
// //     onClose();
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files && e.target.files[0];
// //     if (file) {
// //       setFormData({ ...formData, image: file });
// //       setImagePreview(URL.createObjectURL(file));
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex justify-between items-center">
// //             <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
// //             <button
// //               onClick={handleClose}
// //               className="text-gray-400 hover:text-gray-600 text-2xl"
// //             >
// //               ×
// //             </button>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-6 space-y-6">
// //           {/* Image Preview */}
// //           {imagePreview && (
// //             <div className="flex justify-center">
// //               <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100">
// //                 <Image
// //                   src={imagePreview}
// //                   alt="Car preview"
// //                   width={256}
// //                   height={144}
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {/* Type */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Type *
// //               </label>
// //               <select
// //                 required
// //                 value={formData.type}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, type: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               >
// //                 <option value="">Select a type</option>
// //                 {CAR_TYPES.map((type) => (
// //                   <option key={type} value={type}>
// //                     {type}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             {/* Color */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Color *
// //               </label>
// //               <select
// //                 required
// //                 value={formData.color}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, color: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               >
// //                 <option value="">Select a color</option>
// //                 <option value="Black">Black</option>
// //                 <option value="White">White</option>
// //                 <option value="Silver">Silver</option>
// //                 <option value="Blue">Blue</option>
// //                 <option value="Red">Red</option>
// //                 <option value="Gray">Gray</option>
// //                 <option value="Green">Green</option>
// //                 <option value="Yellow">Yellow</option>
// //                 <option value="Orange">Orange</option>
// //                 <option value="Brown">Brown</option>
// //               </select>
// //             </div>

// //             {/* Serial number */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Serial number *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.serialNumber}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, serialNumber: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //                 placeholder="e.g., 1234567890"
// //               />
// //             </div>

// //             {/* Nb place */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Nb place *
// //               </label>
// //               <select
// //                 required
// //                 value={formData.seats}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, seats: parseInt(e.target.value) })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               >
// //                 <option value={2}>2 seats</option>
// //                 <option value={4}>4 seats</option>
// //                 <option value={5}>5 seats</option>
// //                 <option value={7}>7 seats</option>
// //                 <option value={8}>8 seats</option>
// //                 <option value={9}>9 seats</option>
// //               </select>
// //             </div>

// //             {/* Engine type */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Engine type *
// //               </label>
// //               <select
// //                 required
// //                 value={formData.engineType}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, engineType: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               >
// //                 <option value="Gasoline">Gasoline</option>
// //                 <option value="Diesel">Diesel</option>
// //                 <option value="Electric">Electric</option>
// //                 <option value="Hybrid">Hybrid</option>
// //                 <option value="LPG">LPG</option>
// //               </select>
// //             </div>

// //             {/* Grey card */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Grey card *
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.greyCard}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, greyCard: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //                 placeholder="e.g., 1234-5678-9012"
// //               />
// //             </div>

// //             {/* Year */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Year *
// //               </label>
// //               <input
// //                 type="number"
// //                 required
// //                 min="1990"
// //                 max={new Date().getFullYear() + 1}
// //                 value={formData.year}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, year: parseInt(e.target.value) })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               />
// //             </div>

// //             {/* Image */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Image
// //               </label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageChange}
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               />
// //             </div>

// //             {/* Model */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Model *
// //               </label>
// //               <select
// //                 required
// //                 value={formData.model}
// //                 onChange={(e) =>
// //                   setFormData({ ...formData, model: e.target.value })
// //                 }
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
// //               >
// //                 <option value="1">Model 1 (default)</option>
// //                 {CAR_MODELS.map((model, idx) => (
// //                   <option key={idx + 1} value={idx + 1}>
// //                     {model}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* Form Actions */}
// //           <div className="flex gap-4 pt-4 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={handleClose}
// //               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
// //             >
// //               Add Car
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import api from "../api/api";
// import Image from "next/image";

// interface AddCarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (carData: any) => void;
// }

// interface Model {
//   id: number;
//   name: string;
//   brand: number;
// }

// interface Brand {
//   id: number;
//   name: string;
// }

// interface VehicleType {
//   id: number;
//   name: string;
// }

// interface Color {
//   id: number;
//   name: string;
//   code: string;
// }

// interface EngineType {
//   id: number;
//   name: string;
// }

// export default function AddCarModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: AddCarModalProps) {
//   const [formData, setFormData] = useState({
//     model: "",
//     vehicle_type: "",
//     color: "",
//     serial_number: "",
//     nb_place: 5,
//     engine_type: "",
//     grey_card: "",
//     year: new Date().getFullYear(),
//     image: null as File | null,
//   });

//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>("");
  
//   // Data from backend
//   const [models, setModels] = useState<Model[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
//   const [colors, setColors] = useState<Color[]>([]);
//   const [engineTypes, setEngineTypes] = useState<EngineType[]>([]);
  
//   const [loadingData, setLoadingData] = useState(true);

//   useEffect(() => {
//     if (isOpen) {
//       fetchAllData();
//     }
//   }, [isOpen]);

//   const fetchAllData = async () => {
//     try {
//       setLoadingData(true);
//       const [modelsRes, brandsRes, vehicleTypesRes, colorsRes, engineTypesRes] = await Promise.all([
//         api.get("/api/models/"),
//         api.get("/api/brands/"),
//         api.get("/api/vehicle-types/"),
//         api.get("/api/colors/"),
//         api.get("/api/engine-types/")
//       ]);

//       const modelsList = modelsRes.data.results || modelsRes.data || [];
//       const brandsList = brandsRes.data.results || brandsRes.data || [];
//       const vehicleTypesList = vehicleTypesRes.data.results || vehicleTypesRes.data || [];
//       const colorsList = colorsRes.data.results || colorsRes.data || [];
//       const engineTypesList = engineTypesRes.data.results || engineTypesRes.data || [];

//       console.log("Models loaded:", modelsList);
//       console.log("Brands loaded:", brandsList);
//       console.log("Vehicle Types loaded:", vehicleTypesList);
//       console.log("Colors loaded:", colorsList);
//       console.log("Engine Types loaded:", engineTypesList);

//       setModels(modelsList);
//       setBrands(brandsList);
//       setVehicleTypes(vehicleTypesList);
//       setColors(colorsList);
//       setEngineTypes(engineTypesList);

//       // Set default values
//       if (modelsList.length > 0) {
//         setFormData(prev => ({ ...prev, model: modelsList[0].id.toString() }));
//       }
//       if (vehicleTypesList.length > 0) {
//         setFormData(prev => ({ ...prev, vehicle_type: vehicleTypesList[0].id.toString() }));
//       }
//       if (colorsList.length > 0) {
//         setFormData(prev => ({ ...prev, color: colorsList[0].id.toString() }));
//       }
//       if (engineTypesList.length > 0) {
//         setFormData(prev => ({ ...prev, engine_type: engineTypesList[0].id.toString() }));
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setError("Failed to load data. Please refresh and try again.");
//     } finally {
//       setLoadingData(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Validation
//     if (!formData.model) {
//       setError("Please select a car model");
//       setLoading(false);
//       return;
//     }
//     if (!formData.vehicle_type) {
//       setError("Please select a vehicle type");
//       setLoading(false);
//       return;
//     }
//     if (!formData.color) {
//       setError("Please select a color");
//       setLoading(false);
//       return;
//     }
//     if (!formData.engine_type) {
//       setError("Please select an engine type");
//       setLoading(false);
//       return;
//     }

//     console.log("Submitting car data:", formData);

//     const data = new FormData();
//     data.append("model", formData.model);
//     data.append("vehicle_type", formData.vehicle_type);
//     data.append("color", formData.color);
//     data.append("engine_type", formData.engine_type);
//     data.append("serial_number", formData.serial_number);
//     data.append("nb_place", String(formData.nb_place));
//     data.append("grey_card", formData.grey_card);
//     data.append("year", String(formData.year));
    
//     if (formData.image) {
//       data.append("image", formData.image);
//     }

//     // Log du FormData pour debug
//     console.log("FormData contents:");
//     for (let [key, value] of data.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const res = await api.post("/api/cars/", data);
      
//       console.log("Car created successfully:", res.data);
//       onSubmit(res.data);
//       handleClose();
//     } catch (err: any) {
//       console.error("Error creating car:", err);
//       console.error("Error response:", err.response?.data);
      
//       if (err.response?.data) {
//         const errors = err.response.data;
//         if (typeof errors === 'object') {
//           const errorMessages = Object.entries(errors)
//             .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
//             .join('\n');
//           setError(errorMessages);
//         } else {
//           setError(String(errors));
//         }
//       } else {
//         setError("An error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({
//       model: models.length > 0 ? models[0].id.toString() : "",
//       vehicle_type: vehicleTypes.length > 0 ? vehicleTypes[0].id.toString() : "",
//       color: colors.length > 0 ? colors[0].id.toString() : "",
//       serial_number: "",
//       nb_place: 5,
//       engine_type: engineTypes.length > 0 ? engineTypes[0].id.toString() : "",
//       grey_card: "",
//       year: new Date().getFullYear(),
//       image: null,
//     });
//     setImagePreview("");
//     setError("");
//     onClose();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setError("Image size must be less than 5MB");
//         return;
//       }
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file));
//       setError("");
//     }
//   };

//   const getBrandName = (brandId: number) => {
//     return brands.find(b => b.id === brandId)?.name || "";
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-gray-600 text-2xl"
//               type="button"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
//             </div>
//           )}

//           {loadingData ? (
//             <div className="text-center py-4 text-gray-500">Loading data...</div>
//           ) : (
//             <>
//               {models.length === 0 && (
//                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800">
//                     ⚠️ No car models available. Please add at least one brand and model in the admin panel.
//                   </p>
//                 </div>
//               )}

//               {vehicleTypes.length === 0 && (
//                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800">
//                     ⚠️ No vehicle types available. Please add vehicle types in the admin panel.
//                   </p>
//                 </div>
//               )}

//               {colors.length === 0 && (
//                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800">
//                     ⚠️ No colors available. Please add colors in the admin panel.
//                   </p>
//                 </div>
//               )}

//               {engineTypes.length === 0 && (
//                 <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//                   <p className="text-sm text-yellow-800">
//                     ⚠️ No engine types available. Please add engine types in the admin panel.
//                   </p>
//                 </div>
//               )}
//             </>
//           )}

//           {imagePreview && (
//             <div className="flex justify-center">
//               <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100 relative">
//                 <Image
//                   src={imagePreview}
//                   alt="Car preview"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Model */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Car Model *
//               </label>
//               <select
//                 required
//                 value={formData.model}
//                 onChange={(e) => setFormData({ ...formData, model: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 disabled={loadingData || models.length === 0}
//               >
//                 <option value="">Select a model</option>
//                 {models.map((model) => (
//                   <option key={model.id} value={model.id}>
//                     {getBrandName(model.brand)} {model.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Vehicle Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type *</label>
//               <select
//                 required
//                 value={formData.vehicle_type}
//                 onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 disabled={loadingData || vehicleTypes.length === 0}
//               >
//                 <option value="">Select a type</option>
//                 {vehicleTypes.map((type) => (
//                   <option key={type.id} value={type.id}>
//                     {type.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Color */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
//               <select
//                 required
//                 value={formData.color}
//                 onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 disabled={loadingData || colors.length === 0}
//               >
//                 <option value="">Select a color</option>
//                 {colors.map((color) => (
//                   <option key={color.id} value={color.id}>
//                     {color.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Serial Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.serial_number}
//                 onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 placeholder="e.g., ABC123XYZ789"
//               />
//             </div>

//             {/* Seats */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats *</label>
//               <select
//                 required
//                 value={formData.nb_place}
//                 onChange={(e) => setFormData({ ...formData, nb_place: parseInt(e.target.value) })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 {[2, 4, 5, 7, 8, 9].map((num) => (
//                   <option key={num} value={num}>{num} seat{num > 1 ? "s" : ""}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Engine Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Engine Type *</label>
//               <select
//                 required
//                 value={formData.engine_type}
//                 onChange={(e) => setFormData({ ...formData, engine_type: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 disabled={loadingData || engineTypes.length === 0}
//               >
//                 <option value="">Select engine type</option>
//                 {engineTypes.map((type) => (
//                   <option key={type.id} value={type.id}>
//                     {type.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Grey Card */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Grey Card *</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.grey_card}
//                 onChange={(e) => setFormData({ ...formData, grey_card: e.target.value })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 placeholder="e.g., GC-1234-5678"
//               />
//             </div>

//             {/* Year */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
//               <input
//                 type="number"
//                 required
//                 min="1990"
//                 max={new Date().getFullYear() + 1}
//                 value={formData.year}
//                 onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               />
//             </div>

//             {/* Image */}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Car Image (Optional, max 5MB)</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={loading}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || loadingData || models.length === 0 || vehicleTypes.length === 0 || colors.length === 0 || engineTypes.length === 0}
//               className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
//             >
//               {loading ? "Adding..." : "Add Car"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../api/api"; // ✅ Importez l'API directement

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (carData: any) => void;
}

interface Model {
  id: number;
  name: string;
  brand: number;
}

interface Brand {
  id: number;
  name: string;
}

interface VehicleType {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
  code: string;
}

interface EngineType {
  id: number;
  name: string;
}

export default function AddCarModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCarModalProps) {
  const [formData, setFormData] = useState({
    model: "",
    vehicle_type: "",
    color: "",
    serial_number: "",
    nb_place: 5,
    engine_type: "",
    grey_card: "",
    year: new Date().getFullYear(),
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  
  // Data from backend
  const [models, setModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [engineTypes, setEngineTypes] = useState<EngineType[]>([]);
  
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (isOpen) {
      console.log("✅ Modal opened, fetching data...");
      fetchAllData();
    }
  }, [isOpen]);

  const fetchAllData = async () => {
    try {
      setLoadingData(true);
      setError(""); // Réinitialiser l'erreur
      
      console.log("🔄 Fetching data from API...");

      const [modelsRes, brandsRes, vehicleTypesRes, colorsRes, engineTypesRes] = await Promise.all([
        api.get("/api/models/"),
        api.get("/api/brands/"),
        api.get("/api/vehicle-types/"),
        api.get("/api/colors/"),
        api.get("/api/engine-types/")
      ]);

      const modelsList = modelsRes.data.results || modelsRes.data || [];
      const brandsList = brandsRes.data.results || brandsRes.data || [];
      const vehicleTypesList = vehicleTypesRes.data.results || vehicleTypesRes.data || [];
      const colorsList = colorsRes.data.results || colorsRes.data || [];
      const engineTypesList = engineTypesRes.data.results || engineTypesRes.data || [];

      console.log("✅ Models loaded:", modelsList);
      console.log("✅ Brands loaded:", brandsList);
      console.log("✅ Vehicle Types loaded:", vehicleTypesList);
      console.log("✅ Colors loaded:", colorsList);
      console.log("✅ Engine Types loaded:", engineTypesList);

      setModels(modelsList);
      setBrands(brandsList);
      setVehicleTypes(vehicleTypesList);
      setColors(colorsList);
      setEngineTypes(engineTypesList);

      // Set default values
      if (modelsList.length > 0) {
        setFormData(prev => ({ ...prev, model: String(modelsList[0].id) }));
      }
      if (vehicleTypesList.length > 0) {
        setFormData(prev => ({ ...prev, vehicle_type: String(vehicleTypesList[0].id) }));
      }
      if (colorsList.length > 0) {
        setFormData(prev => ({ ...prev, color: String(colorsList[0].id) }));
      }
      if (engineTypesList.length > 0) {
        setFormData(prev => ({ ...prev, engine_type: String(engineTypesList[0].id) }));
      }
    } catch (err: any) {
      console.error("❌ Error fetching data:", err);
      console.error("❌ Error details:", err.response?.data);
      console.error("❌ Error status:", err.response?.status);
      
      const errorMessage = err.response?.data?.detail 
        || err.response?.data?.message 
        || err.message 
        || "Failed to load data. Please check your connection and try again.";
      
      setError(errorMessage);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("=== 🚗 SUBMITTING CAR ===");
    console.log("formData:", formData);

    // Validation stricte
    if (!formData.model || formData.model === "") {
      setError("Please select a car model");
      setLoading(false);
      return;
    }
    if (!formData.vehicle_type || formData.vehicle_type === "") {
      setError("Please select a vehicle type");
      setLoading(false);
      return;
    }
    if (!formData.color || formData.color === "") {
      setError("Please select a color");
      setLoading(false);
      return;
    }
    if (!formData.engine_type || formData.engine_type === "") {
      setError("Please select an engine type");
      setLoading(false);
      return;
    }
    if (!formData.serial_number || formData.serial_number.trim() === "") {
      setError("Please enter a serial number");
      setLoading(false);
      return;
    }
    if (!formData.grey_card || formData.grey_card.trim() === "") {
      setError("Please enter a grey card number");
      setLoading(false);
      return;
    }

    const data = new FormData();
    
    data.append("model", String(formData.model));
    data.append("vehicle_type", String(formData.vehicle_type));
    data.append("color", String(formData.color));
    data.append("engine_type", String(formData.engine_type));
    data.append("serial_number", formData.serial_number.trim());
    data.append("nb_place", String(formData.nb_place));
    data.append("grey_card", formData.grey_card.trim());
    data.append("year", String(formData.year));
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    // Log du FormData
    console.log("📤 FormData being sent:");
    for (let [key, value] of data.entries()) {
      console.log(`  ${key}:`, value);
    }

    try {
      const res = await api.post("/api/cars/", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      console.log("✅ Car created successfully:", res.data);
      onSubmit(res.data);
      handleClose();
    } catch (err: any) {
      console.error("❌ Error creating car:", err);
      console.error("❌ Error response:", err.response?.data);
      
      if (err.response?.data) {
        const errors = err.response.data;
        if (typeof errors === 'object') {
          const errorMessages = Object.entries(errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
          setError(errorMessages);
        } else {
          setError(String(errors));
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      model: models.length > 0 ? String(models[0].id) : "",
      vehicle_type: vehicleTypes.length > 0 ? String(vehicleTypes[0].id) : "",
      color: colors.length > 0 ? String(colors[0].id) : "",
      serial_number: "",
      nb_place: 5,
      engine_type: engineTypes.length > 0 ? String(engineTypes[0].id) : "",
      grey_card: "",
      year: new Date().getFullYear(),
      image: null,
    });
    setImagePreview("");
    setError("");
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const getBrandName = (brandId: number) => {
    return brands.find(b => b.id === brandId)?.name || "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              type="button"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
              <button
                onClick={fetchAllData}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Try again
              </button>
            </div>
          )}

          {loadingData ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-2 text-gray-500">Loading data...</p>
            </div>
          ) : models.length === 0 ? (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ No car models available. Please add at least one brand and model in the admin panel at:
              </p>
              <a 
                href="http://localhost:8000/admin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm mt-2 inline-block"
              >
                http://localhost:8000/admin
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {imagePreview && (
                <div className="flex justify-center">
                  <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100 relative">
                    <Image
                      src={imagePreview}
                      alt="Car preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Model */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car Model * <span className="text-xs text-gray-500">(ID: {formData.model || "none"})</span>
                  </label>
                  <select
                    required
                    value={formData.model}
                    onChange={(e) => {
                      console.log("✅ Model selected:", e.target.value);
                      setFormData({ ...formData, model: e.target.value });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">-- Select a model --</option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {getBrandName(model.brand)} {model.name} (ID: {model.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type * <span className="text-xs text-gray-500">(ID: {formData.vehicle_type || "none"})</span>
                  </label>
                  <select
                    required
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">-- Select a type --</option>
                    {vehicleTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color * <span className="text-xs text-gray-500">(ID: {formData.color || "none"})</span>
                  </label>
                  <select
                    required
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">-- Select a color --</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Serial Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.serial_number}
                    onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="e.g., ABC123XYZ789"
                  />
                </div>

                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Seats *</label>
                  <select
                    required
                    value={formData.nb_place}
                    onChange={(e) => setFormData({ ...formData, nb_place: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    {[1,2,3].map((num) => (
                      <option key={num} value={num}>{num} seat{num > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>

                {/* Engine Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Type * <span className="text-xs text-gray-500">(ID: {formData.engine_type || "none"})</span>
                  </label>
                  <select
                    required
                    value={formData.engine_type}
                    onChange={(e) => setFormData({ ...formData, engine_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">-- Select engine type --</option>
                    {engineTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grey Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grey Card *</label>
                  <input
                    type="text"
                    required
                    value={formData.grey_card}
                    onChange={(e) => setFormData({ ...formData, grey_card: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="e.g., GC-1234-5678"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                  <input
                    type="number"
                    required
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Image (Optional, max 5MB)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Car"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}